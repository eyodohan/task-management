import * as actions from "./actionTypes";

export const loginUser = (userData) => ({
  type: actions.LOGIN_USER,
  payload: {
    userData,
  },
});
