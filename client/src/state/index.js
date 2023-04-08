import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  admin: null,
  token: null,
  id: null,
  task: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setTasks: (state, action) => {
      state.admin = action.payload.admin;
      state.token = action.payload.token;
      state.id = action.payload.id;
      state.task = action.payload.task;
    },
    setLogin: (state, action) => {
      state.admin = action.payload.admin;
      state.token = action.payload.token;
      state.id = action.payload.id;
      state.task = action.payload.task;
    },
    setLogout: (state) => {
      state.admin = null;
      state.token = null;
      state.id = null;
      state.task = null;
    },
  },
});

export const { setLogin, setLogout, setTasks } = authSlice.actions;
export default authSlice.reducer;
