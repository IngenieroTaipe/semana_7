import { useMemo, useCallback } from 'react';
import { TaskItem } from './TaskItem';

export const TaskList = ({ state, dispatch, ACTIONS }) => {
  const { tasks, filter, sort } = state;

  // useCallback: Memoizar handlers para evitar re-render de hijos (React.memo)
  const handleToggle = useCallback((id) => {
    dispatch({ type: ACTIONS.TOGGLE_TASK, payload: id });
  }, [dispatch, ACTIONS]);

  const handleRemove = useCallback((id) => {
    dispatch({ type: ACTIONS.REMOVE_TASK, payload: id });
  }, [dispatch, ACTIONS]);

  // useMemo: Optimizar lista filtrada y ordenada, previene cálculos pesados en cada render
  const processedTasks = useMemo(() => {
    let result = [...tasks];

    // Filtrar
    if (filter === 'active') result = result.filter(t => !t.completed);
    if (filter === 'completed') result = result.filter(t => t.completed);

    // Ordenar
    if (sort === 'date_asc') result.sort((a, b) => a.id - b.id);
    if (sort === 'date_desc') result.sort((a, b) => b.id - a.id);
    if (sort === 'name') result.sort((a, b) => a.text.localeCompare(b.text));

    return result;
  }, [tasks, filter, sort]);

  return (
    <div className="mt-6">
      <div className="flex gap-4 mb-4 text-sm">
        {/* Controles de Filtro */}
        <select 
          value={filter} 
          onChange={(e) => dispatch({ type: ACTIONS.SET_FILTER, payload: e.target.value })}
          className="p-2.5 rounded-xl bg-white/70 dark:bg-slate-800/70 border border-slate-300/50 dark:border-slate-700/50 text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-500/50 backdrop-blur-md shadow-sm transition-all cursor-pointer"
        >
          <option value="all">Todas</option>
          <option value="active">Activas</option>
          <option value="completed">Completadas</option>
        </select>

        {/* Controles de Ordenamiento */}
        <select 
          value={sort} 
          onChange={(e) => dispatch({ type: ACTIONS.SET_SORT, payload: e.target.value })}
          className="p-2.5 rounded-xl bg-white/70 dark:bg-slate-800/70 border border-slate-300/50 dark:border-slate-700/50 text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/50 backdrop-blur-md shadow-sm transition-all cursor-pointer"
        >
          <option value="date_desc">Más Recientes</option>
          <option value="date_asc">Más Antiguas</option>
          <option value="name">Alfabético</option>
        </select>
      </div>

      <ul className="space-y-3">
        {processedTasks.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-slate-400 dark:text-slate-500">
            <svg className="w-16 h-16 mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
            </svg>
            <p className="text-lg">No hay tareas que mostrar.</p>
          </div>
        ) : (
          processedTasks.map(task => (
            <TaskItem 
              key={task.id} 
              task={task} 
              onToggle={handleToggle} 
              onRemove={handleRemove} 
            />
          ))
        )}
      </ul>
    </div>
  );
};
