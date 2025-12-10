import React, { useState } from 'react';
import { UserProfile, AppState, Question } from './types';
import { WelcomeScreen } from './components/WelcomeScreen';
import { QuizScreen } from './components/QuizScreen';
import { ResultScreen } from './components/ResultScreen';
import { getRandomQuestions } from './utils';
import { QUESTION_POOL } from './constants';

const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>(AppState.WELCOME);
  const [user, setUser] = useState<UserProfile | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [score, setScore] = useState(0);

  // Initialize questions
  const startQuiz = (userData: UserProfile) => {
    setUser(userData);
    const randomQuestions = getRandomQuestions(QUESTION_POOL, 5);
    setQuestions(randomQuestions);
    setAppState(AppState.QUIZ);
    setScore(0);
  };

  const handleFinish = (finalScore: number) => {
    setScore(finalScore);
    setAppState(AppState.RESULTS);
  };

  const handleRetry = () => {
    // Re-shuffle new questions on retry
    const randomQuestions = getRandomQuestions(QUESTION_POOL, 5);
    setQuestions(randomQuestions);
    setScore(0);
    setAppState(AppState.QUIZ);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-white to-slate-100 flex items-center justify-center p-4">
      {appState === AppState.WELCOME && (
        <WelcomeScreen onStart={startQuiz} />
      )}

      {appState === AppState.QUIZ && user && (
        <QuizScreen 
          questions={questions} 
          onFinish={handleFinish} 
        />
      )}

      {appState === AppState.RESULTS && user && (
        <ResultScreen 
          score={score} 
          total={questions.length} 
          user={user} 
          onRetry={handleRetry} 
        />
      )}
    </div>
  );
};

export default App;