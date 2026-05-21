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
          className="p-2 rounded-lg bg-white/50 dark:bg-black/50 border border-slate-300 dark:border-slate-700 backdrop-blur-sm"
        >
          <option value="all">Todas</option>
          <option value="active">Activas</option>
          <option value="completed">Completadas</option>
        </select>

        {/* Controles de Ordenamiento */}
        <select 
          value={sort} 
          onChange={(e) => dispatch({ type: ACTIONS.SET_SORT, payload: e.target.value })}
          className="p-2 rounded-lg bg-white/50 dark:bg-black/50 border border-slate-300 dark:border-slate-700 backdrop-blur-sm"
        >
          <option value="date_desc">Más Recientes</option>
          <option value="date_asc">Más Antiguas</option>
          <option value="name">Alfabético</option>
        </select>
      </div>

      <ul>
        {processedTasks.length === 0 ? (
          <p className="text-center text-slate-500 py-4">No hay tareas que mostrar.</p>
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
