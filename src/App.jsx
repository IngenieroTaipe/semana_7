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
  const completionRate = total === 0 ? 0 : Math.round((completed / total) * 100);

  return (
    <div className="min-h-screen p-4 md:p-8 flex justify-center bg-slate-50 dark:bg-slate-950 transition-colors duration-500 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-50 via-slate-50 to-slate-100 dark:from-slate-900 dark:via-slate-950 dark:to-black">
      
      {/* Elementos decorativos fijos para el fondo */}
      <div className="fixed top-[-10%] right-[-5%] w-96 h-96 bg-purple-500/30 dark:bg-purple-600/20 rounded-full filter blur-[100px] animate-pulse pointer-events-none"></div>
      <div className="fixed bottom-[-10%] left-[-5%] w-96 h-96 bg-blue-500/30 dark:bg-blue-600/20 rounded-full filter blur-[100px] animate-pulse pointer-events-none" style={{ animationDelay: '2s' }}></div>

      <div className="w-full max-w-7xl relative z-10">
        <Header />
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
          
          {/* COLUMNA IZQUIERDA: Estadísticas en Bento Box */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            
            {/* Gráfico de Progreso */}
            <div className="glass-panel p-8 text-center flex-1 flex flex-col items-center justify-center">
              <h3 className="text-slate-500 dark:text-slate-400 text-sm font-semibold uppercase tracking-wider mb-4">Progreso General</h3>
              <div className="relative w-48 h-48 mx-auto flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                  {/* Círculo de fondo */}
                  <path
                    className="text-slate-200 dark:text-slate-800"
                    strokeWidth="3"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  {/* Círculo de progreso */}
                  <path
                    className="text-blue-500 dark:text-blue-400 transition-all duration-1000 ease-out"
                    strokeWidth="3"
                    strokeDasharray={`${completionRate}, 100`}
                    strokeLinecap="round"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-5xl font-extrabold text-slate-800 dark:text-slate-100">{completionRate}%</span>
                </div>
              </div>
            </div>

            {/* Tarjetas pequeñas de stats */}
            <div className="grid grid-cols-2 gap-6">
              <div className="glass-panel p-6 text-center">
                <h3 className="text-slate-500 dark:text-slate-400 text-xs font-semibold uppercase tracking-wider">Total</h3>
                <p className="text-4xl font-bold text-slate-800 dark:text-slate-100 mt-2">{total}</p>
              </div>
              <div className="glass-panel p-6 text-center">
                <h3 className="text-slate-500 dark:text-slate-400 text-xs font-semibold uppercase tracking-wider">Completas</h3>
                <p className="text-4xl font-bold text-emerald-500 dark:text-emerald-400 mt-2">{completed}</p>
              </div>
            </div>
          </div>

          {/* COLUMNA DERECHA: Gestor de tareas */}
          <div className="lg:col-span-8 glass-panel p-6 md:p-10 flex flex-col">
            <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-6">Gestor de Tareas</h2>
            <TaskForm onAdd={handleAdd} />
            <div className="flex-1">
              <TaskList state={state} dispatch={dispatch} ACTIONS={ACTIONS} />
            </div>
          </div>

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
