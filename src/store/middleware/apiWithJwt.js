import axios from "axios";
import * as actions from "../api";
import config from "../../config.json";
import { loginUser, userLoggedIn } from "../auth";

const { apiUrl } = config;
const tokenKey = "auth";
const apiWithJwt =
  ({ dispatch }) =>
  (next) =>
  async (action) => {
    if (action.type !== actions.apiCallBegan.type) return next(action);

    const { url, data, method, onStart, onSuccess, onError } = action.payload;
    if (onStart) dispatch({ type: onStart });
    next(action);
    try {
      setJwt();
      const response = await axios.request({
        baseURL: apiUrl,
        url,
        method,
        data,
      });
      dispatch(actions.apiCallSuccess(response.data.payload));
      const user = JSON.stringify(response.data.payload);
      console.log(user);
      localStorage.setItem(tokenKey, user);
      console.log(response);
      if (onSuccess)
        dispatch({ type: onSuccess, payload: response.data.payload });
    } catch (error) {
      dispatch(actions.apiCallFailed(error.message));
      if (onError) dispatch({ type: onError, payload: error.message });
    }
  };

export default apiWithJwt;

export function setJwt() {
  axios.defaults.headers.common["Authorization"] =
    "Bearer " + JSON.parse(localStorage.getItem("auth")).jwtToken;
}
