import { Question, UserProfile } from './types';
import { GOOGLE_SHEETS_WEBHOOK_URL } from './constants';

/**
 * Función auxiliar para mezclar arrays (Fisher-Yates)
 */
const shuffleArray = <T>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

/**
 * Obtiene preguntas aleatorias priorizando las que NO están en excludeIds.
 * Si se acaban las nuevas, rellena con las antiguas.
 */
export const getRandomQuestions = (
  allQuestions: Question[], 
  count: number, 
  excludeIds: number[] = []
): Question[] => {
  // 1. Separar preguntas nuevas (no vistas) de las usadas
  const freshQuestions = allQuestions.filter(q => !excludeIds.includes(q.id));
  const usedQuestions = allQuestions.filter(q => excludeIds.includes(q.id));

  // 2. Mezclar ambas listas
  const shuffledFresh = shuffleArray(freshQuestions);
  
  // 3. Caso ideal: Tenemos suficientes preguntas nuevas
  if (shuffledFresh.length >= count) {
    return shuffledFresh.slice(0, count);
  }

  // 4. Caso borde: No alcanzan las nuevas. 
  // Tomamos TODAS las nuevas disponibles y rellenamos el resto con usadas (mezcladas)
  const neededFromUsed = count - shuffledFresh.length;
  const shuffledUsed = shuffleArray(usedQuestions);
  
  // Combinamos: Nuevas primero + Relleno de usadas
  return [...shuffledFresh, ...shuffledUsed.slice(0, neededFromUsed)];
};

export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Sends quiz results to a Google Sheet via a Web App URL.
 */
export const sendResultsToGoogleSheets = async (
  user: UserProfile, 
  score: number, 
  total: number
): Promise<void> => {
  if (!GOOGLE_SHEETS_WEBHOOK_URL) {
    console.warn("Google Sheets URL not configured in constants.ts");
    return;
  }

  // Fallback for locale string if environment is restricted
  let dateStr = new Date().toISOString();
  try {
    dateStr = new Date().toLocaleString('es-ES', { 
      timeZoneName: 'short', 
      dateStyle: 'full', 
      timeStyle: 'medium' 
    });
  } catch (e) {
    // Keep ISO string if locale fails
  }

  // Prepare data as URL parameters (application/x-www-form-urlencoded)
  const formData = new URLSearchParams();
  formData.append('date', dateStr);
  formData.append('firstName', user.firstName || '');
  formData.append('lastName', user.lastName || '');
  formData.append('email', user.email || '');
  formData.append('score', String(score));
  formData.append('total', String(total));

  try {
    await fetch(GOOGLE_SHEETS_WEBHOOK_URL, {
      method: 'POST',
      mode: 'no-cors', // Essential for Google Apps Script to accept the request from another domain
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: formData.toString()
    });
    console.log('Data sent to Google Sheets via Form Post');
  } catch (error) {
    console.error('Error sending data to Google Sheets:', error);
  }
};