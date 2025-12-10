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
 * METHOD: 'text/plain' payload with 'no-cors'.
 * This trick bypasses the CORS Preflight (OPTIONS request) which Google Scripts
 * does not support, allowing the POST to go through successfully.
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

  // Prepare data as a standard JSON object
  const dataPayload = {
    date: timestamp,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    score: score,
    total: total
  };

  try {
    await fetch(GOOGLE_SHEETS_WEBHOOK_URL, {
      method: 'POST',
      mode: 'no-cors', // Essential for Google Apps Script
      headers: {
        // "text/plain" is the secret to avoid CORS Preflight checks
        'Content-Type': 'text/plain', 
      },
      // We send a JSON string, but the browser treats it as plain text
      body: JSON.stringify(dataPayload)
    });
    console.log('Data sent to Google Sheets');
  } catch (error) {
    console.error('Error sending data to Google Sheets:', error);
  }
};