import React, { useState } from 'react';
import { UserProfile } from '../types';
import { isValidEmail } from '../utils';
import { User, Mail, ArrowRight } from 'lucide-react';

interface WelcomeScreenProps {
  onStart: (user: UserProfile) => void;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onStart }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!firstName.trim() || !lastName.trim() || !email.trim()) {
      setError('Por favor completa todos los campos.');
      return;
    }
    if (!isValidEmail(email)) {
      setError('Por favor ingresa un correo electrónico válido.');
      return;
    }
    setError('');
    onStart({ firstName, lastName, email });
  };

  return (
    <div className="w-full max-w-md bg-slate-900 rounded-2xl shadow-xl overflow-hidden animate-fade-in-up">
      <div className="bg-indigo-600 p-8 text-center">
        <div className="flex justify-center mb-6">
            {/* CORRECCIÓN: Usamos el enlace de exportación directa de Google Drive */}
            <img 
                src="https://static.wixstatic.com/media/533537_39efd35aa8f04e9ea189c01342efd3a9~mv2.png" 
                alt="Logo Xyclos"
                className="h-24 w-auto object-contain mx-auto" 
            />
        </div>
        <h1 className="text-2xl font-bold text-white mb-2">Evaluación Estratégica</h1>
        <p className="text-indigo-100 text-sm">Marketing Digital y Embudos de Venta</p>
      </div>

      <div className="p-8">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-white mb-1">Nombre</label>
            <div className="relative">
              <User className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-slate-800 border border-slate-700 text-white rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all placeholder-slate-500"
                placeholder="Tu nombre"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-white mb-1">Apellido</label>
            <div className="relative">
              <User className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-slate-800 border border-slate-700 text-white rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all placeholder-slate-500"
                placeholder="Tu apellido"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-white mb-1">Correo Electrónico</label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-slate-800 border border-slate-700 text-white rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all placeholder-slate-500"
                placeholder="ejemplo@correo.com"
              />
            </div>
          </div>

          {error && (
            <div className="bg-red-900/30 text-red-300 text-sm p-3 rounded-lg border border-red-800 flex items-center">
               <span className="mr-2">⚠️</span> {error}
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2 group mt-6"
          >
            Comenzar Quiz
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </form>
        <p className="text-xs text-slate-400 text-center mt-6">
          Se activará un cuestionario de 5 preguntas aleatorias.
        </p>
      </div>
    </div>
  );
};