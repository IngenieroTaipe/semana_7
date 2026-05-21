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
        placeholder="Añadir nueva tarea..."
        className="flex-1 px-4 py-2 bg-white/50 dark:bg-black/50 border border-slate-300 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 backdrop-blur-sm transition-all"
      />
      <button 
        type="submit"
        className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow-md transition-colors"
      >
        Añadir
      </button>
    </form>
  );
};
