import { memo } from 'react';

export const TaskItem = memo(({ task, onToggle, onRemove }) => {
  return (
    <li className="flex items-center justify-between p-4 mb-2 glass-panel hover:bg-white/40 dark:hover:bg-black/40 transition-all">
      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggle(task.id)}
          className="w-5 h-5 accent-blue-500 rounded cursor-pointer"
        />
        <span className={`${task.completed ? 'line-through text-slate-400 dark:text-slate-500' : 'text-slate-700 dark:text-slate-200'} transition-all`}>
          {task.text}
        </span>
      </div>
      <button
        onClick={() => onRemove(task.id)}
        className="text-slate-400 hover:text-red-500 dark:text-slate-500 dark:hover:text-red-400 transition-colors p-2 rounded-full hover:bg-red-50 dark:hover:bg-red-900/20"
        title="Eliminar tarea"
        aria-label="Eliminar Tarea"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        </svg>
      </button>
    </li>
  );
});

TaskItem.displayName = 'TaskItem'; // Útil para React DevTools Profiler
