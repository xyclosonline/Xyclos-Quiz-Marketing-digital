export interface UserProfile {
  firstName: string;
  lastName: string;
  email: string;
}

export interface Question {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
  feedback: string; // Explanation shown when wrong
}

export enum AppState {
  WELCOME = 'WELCOME',
  QUIZ = 'QUIZ',
  RESULTS = 'RESULTS',
}
