
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  form: { type: 'login' },
  location: { currentPath: '/' },
  menu: { active: 'dashboard' },
};

const helperSlice = createSlice({
  name: 'helper',
  initialState,
  reducers: {
    setFormType: (state, action) => {
      state.form.type = action.payload;
    },
    setCurrentPath: (state, action) => {
      state.location.currentPath = action.payload;
    },
    setActiveMenu: (state, action) => {
      state.menu.active = action.payload;
    },
    resetCurrentPath: (state) => {
      state.location.currentPath = '/';
    },
  },
});

export const {
  setFormType,
  setCurrentPath,
  setActiveMenu,
  resetCurrentPath,
} = helperSlice.actions;

export const selectFormType = (state) => state.helper.form.type;
export const selectCurrentPath = (state) => state.helper.location.currentPath;
export const selectActiveMenu = (state) => state.helper.menu.active;

export default helperSlice.reducer;
