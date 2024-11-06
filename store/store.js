// store/store.js
import { configureStore } from '@reduxjs/toolkit';
import todoReducer from './todoSlice';
import completedTasksReducer from './completedTasksSlice';

const store = configureStore({
  reducer: {
    todos: todoReducer, 
    completedTasks: completedTasksReducer,
  },
});

export default store;
