import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "../services/authService";

export const loginUser = createAsyncThunk(
  //action type string
  "auth/loginUser",
  // callback function
  async (email, { dispatch }) => {
    console.log(email);
    const user = await authService.login(email);
    dispatch(userLoggedIn(user));
  }
);

const slice = createSlice({
  name: "auth",
  initialState: {
    isLoggedIn: false,
    userData: {},
  },
  reducers: {
    userLoggedIn: (auth, action) => {
      auth.userData = action.payload;
      auth.isLoggedIn = true;
      localStorage.setItem("auth", JSON.stringify(action.payload));
    },
    userLoggedOut: (state, action) => {
      state.userData = {};
      state.isLoggedIn = false;
    },
  },
  extraReducers: {
    [loginUser.pending]: (auth) => {
      auth.loading = true;
    },
    [loginUser.fulfilled]: (auth, { payload }) => {
      auth.loading = false;
      auth.list = payload;
      console.log(payload);
    },
    [loginUser.rejected]: (auth) => {
      auth.loading = false;
    },
  },
});

export const { userLoggedIn, userLoggedOut } = slice.actions;
export default slice.reducer;
// export const user = auth.userData
