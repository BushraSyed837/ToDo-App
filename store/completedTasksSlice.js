
import { createSlice } from '@reduxjs/toolkit';

const completedTasksSlice = createSlice({
  name: 'completedTasks',
  initialState: [], 
  reducers: {
    
    addCompletedTask: (state, action) => {
      state.push(action.payload);
    },
    
    removeCompletedTask: (state, action) => {
      return state.filter(task => task.id !== action.payload.id);
    },
  },
});

export const { addCompletedTask, removeCompletedTask } = completedTasksSlice.actions;
export default completedTasksSlice.reducer;
