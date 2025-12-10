import React, { useState } from 'react';
import { Question } from '../types';
import { CheckCircle, XCircle, ArrowRight, AlertCircle } from 'lucide-react';

interface QuizScreenProps {
  questions: Question[];
  onFinish: (score: number) => void;
}

export const QuizScreen: React.FC<QuizScreenProps> = ({ questions, onFinish }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);

  const currentQuestion = questions[currentIndex];

  const handleOptionClick = (index: number) => {
    if (isAnswered) return;
    setSelectedOption(index);
    setIsAnswered(true);

    if (index === currentQuestion.correctIndex) {
      setScore(prev => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      onFinish(score + (selectedOption === currentQuestion.correctIndex ? 0 : 0)); // Score already updated
    }
  };

  // Helper to determine option styles
  const getOptionClass = (index: number) => {
    const baseClass = "relative w-full text-left p-4 rounded-xl border-2 transition-all duration-200 flex items-center justify-between group";
    
    if (!isAnswered) {
      return `${baseClass} border-slate-200 hover:border-indigo-300 hover:bg-indigo-50 cursor-pointer`;
    }

    if (index === currentQuestion.correctIndex) {
      return `${baseClass} border-green-500 bg-green-50 text-green-800`;
    }

    if (index === selectedOption && index !== currentQuestion.correctIndex) {
      return `${baseClass} border-red-500 bg-red-50 text-red-800`;
    }

    return `${baseClass} border-slate-200 text-slate-400 opacity-60`;
  };

  return (
    <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl overflow-hidden min-h-[500px] flex flex-col">
      {/* Header */}
      <div className="bg-slate-50 border-b border-slate-100 p-6 flex justify-between items-center">
        <div className="text-sm font-semibold text-slate-500 uppercase tracking-wider">
          Pregunta {currentIndex + 1} de {questions.length}
        </div>
        <div className="flex gap-1">
          {questions.map((_, idx) => (
            <div 
              key={idx}
              className={`h-2 w-8 rounded-full transition-all ${
                idx === currentIndex ? 'bg-indigo-600' : 
                idx < currentIndex ? 'bg-indigo-200' : 'bg-slate-200'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Question Body */}
      <div className="p-8 flex-grow flex flex-col">
        <h2 className="text-xl md:text-2xl font-bold text-slate-800 mb-8 leading-snug">
          {currentQuestion.question}
        </h2>

        <div className="space-y-3 flex-grow">
          {currentQuestion.options.map((option, idx) => (
            <button
              key={idx}
              onClick={() => handleOptionClick(idx)}
              className={getOptionClass(idx)}
              disabled={isAnswered}
            >
              <span className="font-medium">{option}</span>
              {isAnswered && idx === currentQuestion.correctIndex && (
                <CheckCircle className="w-6 h-6 text-green-600" />
              )}
              {isAnswered && idx === selectedOption && idx !== currentQuestion.correctIndex && (
                <XCircle className="w-6 h-6 text-red-600" />
              )}
            </button>
          ))}
        </div>

        {/* Feedback Section */}
        {isAnswered && selectedOption !== currentQuestion.correctIndex && (
          <div className="mt-6 p-4 bg-orange-50 border border-orange-200 rounded-lg animate-fade-in">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-orange-800 text-sm mb-1">Respuesta Incorrecta</p>
                <p className="text-orange-700 text-sm leading-relaxed">
                  {currentQuestion.feedback}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer / Next Button */}
      <div className="p-6 border-t border-slate-100 bg-slate-50 flex justify-end">
        <button
          onClick={handleNext}
          disabled={!isAnswered}
          className={`flex items-center gap-2 px-8 py-3 rounded-lg font-semibold transition-all duration-300 ${
            isAnswered 
              ? 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-md translate-y-0 opacity-100' 
              : 'bg-slate-200 text-slate-400 cursor-not-allowed translate-y-2 opacity-0'
          }`}
        >
          {currentIndex === questions.length - 1 ? 'Ver Resultados' : 'Siguiente'}
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};
