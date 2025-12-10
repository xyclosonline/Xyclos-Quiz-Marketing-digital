import React, { useEffect, useState } from 'react';
import { UserProfile } from '../types';
import { RefreshCw, BookOpen, CloudUpload, Check, Share2 } from 'lucide-react';
import { sendResultsToGoogleSheets } from '../utils';
import { GOOGLE_SHEETS_WEBHOOK_URL } from '../constants';

interface ResultScreenProps {
  score: number;
  total: number;
  user: UserProfile;
  onRetry: () => void;
}

export const ResultScreen: React.FC<ResultScreenProps> = ({ score, total, user, onRetry }) => {
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved'>('idle');

  const percentage = Math.round((score / total) * 100);
  
  let feedbackMessage = '';
  let feedbackColor = '';
  
  if (percentage === 100) {
    feedbackMessage = '¡Excelente! Eres un experto en marketing digital.';
    feedbackColor = 'text-green-600';
  } else if (percentage >= 80) {
    feedbackMessage = '¡Muy bien! Tienes los conceptos claros.';
    feedbackColor = 'text-indigo-600';
  } else if (percentage >= 60) {
    feedbackMessage = 'Buen intento, pero repasa algunos conceptos del embudo.';
    feedbackColor = 'text-yellow-600';
  } else {
    feedbackMessage = 'Te recomendamos leer nuevamente el informe estratégico.';
    feedbackColor = 'text-red-600';
  }

  useEffect(() => {
    let isMounted = true;
    const saveData = async () => {
      if (GOOGLE_SHEETS_WEBHOOK_URL) {
        if (isMounted) setSaveStatus('saving');
        await sendResultsToGoogleSheets(user, score, total);
        if (isMounted) setSaveStatus('saved');
      }
    };
    saveData();
    return () => { isMounted = false; };
  }, [user, score, total]);

  const handleShare = async () => {
    const text = `He obtenido ${score}/${total} en el Quiz Estratégico de Marketing Digital.`;
    // FIX: Cast navigator to any to avoid TypeScript 'property does not exist' build error
    const nav = navigator as any;
    
    if (nav.share) {
      try {
        await nav.share({
          title: 'Quiz de Marketing Digital',
          text: text,
          url: window.location.href,
        });
      } catch (error) {
        console.log('Error sharing', error);
      }
    } else {
      navigator.clipboard.writeText(`${text} ${window.location.href}`);
      alert('Resultado copiado al portapapeles');
    }
  };

  // Calculate SVG circle properties for progress ring
  // Using fixed dimensions 160x160 for viewBox calculations
  const radius = 60;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden animate-fade-in-up text-center">
      <div className="p-8 pb-0">
        <h2 className="text-2xl font-bold text-slate-800">Resultados</h2>
        <p className="text-slate-500 mt-1">
          {user.firstName} {user.lastName}
        </p>
      </div>

      <div className="flex justify-center my-8 relative">
        <div className="relative w-40 h-40 flex-shrink-0">
           {/* Background Circle */}
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 160 160">
            <circle
              cx="80"
              cy="80"
              r={radius}
              stroke="currentColor"
              strokeWidth="12"
              fill="transparent"
              className="text-slate-100"
            />
            {/* Progress Circle */}
            <circle
              cx="80"
              cy="80"
              r={radius}
              stroke="currentColor"
              strokeWidth="12"
              fill="transparent"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              className={`${percentage >= 60 ? 'text-indigo-600' : 'text-orange-500'} transition-all duration-1000 ease-out`}
              strokeLinecap="round"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-4xl font-bold text-slate-800">{score}/{total}</span>
            <span className="text-xs text-slate-400 uppercase font-semibold">Aciertos</span>
          </div>
        </div>
      </div>

      <div className="px-8 mb-8">
        <p className={`font-medium text-lg ${feedbackColor} mb-2`}>
            {feedbackMessage}
        </p>
        <p className="text-sm text-slate-500">
            Hemos enviado una copia de tus resultados a <span className="font-mono text-slate-700">{user.email}</span>
        </p>
      </div>

      <div className="bg-slate-50 p-6 border-t border-slate-100 grid gap-3">
        <button
          onClick={handleShare}
          className="w-full bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 font-semibold py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
        >
          <Share2 className="w-5 h-5" />
          Compartir Resultado
        </button>

        <button
          onClick={onRetry}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
        >
          <RefreshCw className="w-5 h-5" />
          Intentar con nuevas preguntas
        </button>
        
        <div className="flex flex-col gap-2 mt-2">
            <div className="text-xs text-slate-400 flex items-center justify-center gap-2">
                <BookOpen className="w-4 h-4" />
                Basado en el Informe Estratégico de Marketing Digital
            </div>
            
            {GOOGLE_SHEETS_WEBHOOK_URL && (
              <div className="text-xs flex items-center justify-center gap-1.5 transition-colors duration-500">
                  {saveStatus === 'saving' && (
                    <>
                      <CloudUpload className="w-3 h-3 animate-bounce text-slate-400" />
                      <span className="text-slate-400">Guardando registro...</span>
                    </>
                  )}
                  {saveStatus === 'saved' && (
                    <>
                      <Check className="w-3 h-3 text-green-500" />
                      <span className="text-green-600 font-medium">Registro guardado correctamente</span>
                    </>
                  )}
              </div>
            )}
        </div>
      </div>
    </div>
  );
};