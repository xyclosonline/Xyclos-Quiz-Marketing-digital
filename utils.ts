import { Question, UserProfile } from './types';
import { GOOGLE_SHEETS_WEBHOOK_URL } from './constants';

/**
 * Shuffles an array of questions and returns a subset.
 * Uses the Fisher-Yates shuffle algorithm.
 */
export const getRandomQuestions = (allQuestions: Question[], count: number): Question[] => {
  // Create a copy to avoid mutating the original array
  const shuffled = [...allQuestions];
  
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  
  return shuffled.slice(0, count);
};

export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Sends quiz results to a Google Sheet via a Web App URL.
 * Uses URLSearchParams (application/x-www-form-urlencoded) which is handled 
 * much better by Google Apps Script than JSON payloads in 'no-cors' mode.
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

  const timestamp = new Date().toLocaleString('es-ES', { 
    timeZoneName: 'short', 
    dateStyle: 'full', 
    timeStyle: 'medium' 
  });

  // Convert data to URL Encoded Form Data
  const formData = new URLSearchParams();
  formData.append('date', timestamp);
  formData.append('firstName', user.firstName);
  formData.append('lastName', user.lastName);
  formData.append('email', user.email);
  formData.append('score', score.toString());
  formData.append('total', total.toString());

  try {
    await fetch(GOOGLE_SHEETS_WEBHOOK_URL, {
      method: 'POST',
      mode: 'no-cors', 
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded', 
      },
      body: formData.toString()
    });
    console.log('Data sent to Google Sheets');
  } catch (error) {
    console.error('Error sending data to Google Sheets:', error);
  }
};