// todoSlice.js
import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  todos: [],
};

const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTodo: (state, action) => {
      // add new task
      const newTodo = {
        id: Date.now(),
        text: action.payload.text,
        completed: false,
      };
      state.todos.push(newTodo);
    },
    toggleTodo: (state, action) => {
      // mark as task completed
      const todo = state.todos.find(todo => todo.id === action.payload.id);
      if (todo) {
        todo.completed = !todo.completed;
      }
    },
    removeTodo: (state, action) => {
      // remove task
      state.todos = state.todos.filter(todo => todo.id !== action.payload.id);
    },
    updateTodo: (state, action) => {
      // update task
      const todo = state.todos.find(todo => todo.id === action.payload.id);
      if (todo) {
        todo.text = action.payload.text;
      }
    },
    resetTodos: state => {
      // empty task list
      state.todos = [];
    },
  },
});

export const {addTodo, toggleTodo, removeTodo, updateTodo, resetTodos} =
  todoSlice.actions;

export default todoSlice.reducer;
