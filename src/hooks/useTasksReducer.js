import { useReducer, useEffect } from 'react';

const ACTIONS = {
  ADD_TASK: 'ADD_TASK',
  REMOVE_TASK: 'REMOVE_TASK',
  TOGGLE_TASK: 'TOGGLE_TASK',
  SET_FILTER: 'SET_FILTER',
  SET_SORT: 'SET_SORT',
  LOAD_TASKS: 'LOAD_TASKS'
};

const tasksReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.LOAD_TASKS:
      return { ...state, tasks: action.payload };
    case ACTIONS.ADD_TASK:
      return { 
        ...state, 
        tasks: [...state.tasks, { id: Date.now(), text: action.payload, completed: false }] 
      };
    case ACTIONS.REMOVE_TASK:
      return {
        ...state,
        tasks: state.tasks.filter(t => t.id !== action.payload)
      };
    case ACTIONS.TOGGLE_TASK:
      return {
        ...state,
        tasks: state.tasks.map(t => 
          t.id === action.payload ? { ...t, completed: !t.completed } : t
        )
      };
    case ACTIONS.SET_FILTER:
      return { ...state, filter: action.payload }; 
    case ACTIONS.SET_SORT:
      return { ...state, sort: action.payload }; 
    default:
      return state;
  }
};

const initialState = {
  tasks: [],
  filter: 'all',
  sort: 'date_desc'
};

export const useTasksReducer = () => {
  const [state, dispatch] = useReducer(tasksReducer, initialState);

  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem('dashboard_tasks')) || [];
    dispatch({ type: ACTIONS.LOAD_TASKS, payload: savedTasks });
  }, []);

  useEffect(() => {
    localStorage.setItem('dashboard_tasks', JSON.stringify(state.tasks));
  }, [state.tasks]);

  return { state, dispatch, ACTIONS };
};
