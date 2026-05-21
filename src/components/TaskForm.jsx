import { useState, useRef, useEffect, useCallback } from 'react';

export const TaskForm = ({ onAdd }) => {
  const [text, setText] = useState('');
  // useRef: Acceso a nodo DOM (auto-focus) sin re-render
  const inputRef = useRef(null);

  useEffect(() => {
    // Auto-focus on mount
    inputRef.current?.focus();
  }, []);

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    if (text.trim()) {
      onAdd(text);
      setText('');
      // Vuelve a enfocar después de agregar
      inputRef.current?.focus();
    }
  }, [text, onAdd]);

  return (
    <form onSubmit={handleSubmit} className="mb-6 flex gap-2">
      <input
        ref={inputRef}
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Escribe una nueva tarea..."
        className="flex-1 px-4 py-3 bg-white/60 dark:bg-slate-800/60 border border-slate-300/50 dark:border-slate-700/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 backdrop-blur-md shadow-inner transition-all"
      />
      <button 
        type="submit"
        className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-blue-500/30 transform hover:-translate-y-0.5 transition-all active:translate-y-0"
      >
        Añadir
      </button>
    </form>
  );
};
