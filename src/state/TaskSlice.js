import { createSlice } from "@reduxjs/toolkit";

const tasksSlice = createSlice({
  name: "tasks",
  initialState: [],
  reducers: {
    addTask(state, action) {
      state.push(action.payload);
    },
    removeTask(state, action) {
      return state.filter((task) => task.id !== action.payload);
    },
    loadTasks(state, action) {
      return action.payload;
    },

    updateTask(state, action) {
      const { id, text } = action.payload;
      const existingTask = state.find((task) => task.id === id);
      if (existingTask) {
        existingTask.text = text;
      }
    },
  },
});

export const { addTask, removeTask, loadTasks } = tasksSlice.actions;

export default tasksSlice.reducer;
