import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import authService from '../services/authService';

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (email, { dispatch }) => {
    const user = await authService.login(email);
    dispatch(userLoggedIn(user));
  }
);

const slice = createSlice({
  name: 'auth',
  initialState: {
    isLoggedIn: false,
    userData: {},
  },
  reducers: {
    userLoggedIn: (auth, action) => {
      auth.userData = action.payload;
      auth.isLoggedIn = true;
      localStorage.setItem('auth', JSON.stringify(action.payload));
    },
  },
  extraReducers: {
    [loginUser.pending]: (auth) => {
      auth.loading = true;
    },
    [loginUser.fulfilled]: (auth, { payload }) => {
      auth.loading = false;
      auth.list = payload;
    },
    [loginUser.rejected]: (auth) => {
      auth.loading = false;
    },
  },
});

export const { userLoggedIn } = slice.actions;
export default slice.reducer;
