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
  
  // Track IDs of questions already asked in this session to avoid immediate repeats
  const [seenQuestionIds, setSeenQuestionIds] = useState<number[]>([]);

  // Initialize questions
  const startQuiz = (userData: UserProfile) => {
    setUser(userData);
    
    // First run: exclude nothing, but initialize the seen list
    const initialQuestions = getRandomQuestions(QUESTION_POOL, 5, []);
    
    setQuestions(initialQuestions);
    setSeenQuestionIds(initialQuestions.map(q => q.id));
    setAppState(AppState.QUIZ);
    setScore(0);
  };

  const handleFinish = (finalScore: number) => {
    setScore(finalScore);
    setAppState(AppState.RESULTS);
  };

  const handleRetry = () => {
    // Retry: Pass the list of already seen IDs to exclude them
    const randomQuestions = getRandomQuestions(QUESTION_POOL, 5, seenQuestionIds);
    
    // If the randomQuestions returned overlap (because pool reset), we reset our seen list
    // Otherwise, we append the new ones to the history
    const newIds = randomQuestions.map(q => q.id);
    
    // Check if we did a hard reset (detected if new questions exist in seen list)
    const hasOverlap = newIds.some(id => seenQuestionIds.includes(id));
    
    if (hasOverlap) {
        // Pool was exhausted and reset, start fresh history
        setSeenQuestionIds(newIds);
    } else {
        // Append new questions to history
        setSeenQuestionIds(prev => [...prev, ...newIds]);
    }

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