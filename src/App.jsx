import { useCallback } from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import { useTasksReducer } from './hooks/useTasksReducer';
import { Header } from './components/Header';
import { TaskForm } from './components/TaskForm';
import { TaskList } from './components/TaskList';
import './index.css';

function Dashboard() {
  const { state, dispatch, ACTIONS } = useTasksReducer();

  const handleAdd = useCallback((text) => {
    dispatch({ type: ACTIONS.ADD_TASK, payload: text });
  }, [dispatch, ACTIONS]);

  // Calculamos las estadísticas
  const total = state.tasks.length;
  const completed = state.tasks.filter(t => t.completed).length;

  return (
    <div className="min-h-screen p-4 md:p-8 flex justify-center bg-slate-50 dark:bg-slate-900 transition-colors duration-300 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-100 via-slate-50 to-slate-100 dark:from-slate-800 dark:via-slate-900 dark:to-black">
      <div className="w-full max-w-3xl glass-panel p-6 md:p-10 relative overflow-hidden">
        {/* Decorative background elements for Glassmorphism */}
        <div className="absolute top-[-50px] right-[-50px] w-48 h-48 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 dark:opacity-10 animate-blob"></div>
        <div className="absolute bottom-[-50px] left-[-50px] w-48 h-48 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 dark:opacity-10 animate-blob animation-delay-2000"></div>

        <div className="relative z-10">
          <Header />
          
          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="glass-panel p-4 text-center">
              <h3 className="text-slate-500 dark:text-slate-400 text-sm font-semibold uppercase tracking-wider">Total Tareas</h3>
              <p className="text-3xl font-bold text-slate-800 dark:text-slate-100 mt-1">{total}</p>
            </div>
            <div className="glass-panel p-4 text-center">
              <h3 className="text-slate-500 dark:text-slate-400 text-sm font-semibold uppercase tracking-wider">Completadas</h3>
              <p className="text-3xl font-bold text-blue-600 dark:text-blue-400 mt-1">{completed}</p>
            </div>
          </div>

          <TaskForm onAdd={handleAdd} />
          <TaskList state={state} dispatch={dispatch} ACTIONS={ACTIONS} />
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <Dashboard />
    </ThemeProvider>
  );
}

export default App;
