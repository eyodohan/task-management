import http from "./httpService";
import config from "../config.json";

const { apiUrl } = config;
const apiEndpoint = apiUrl + "/auth";
const tokenKey = "auth";

function getApiUrl(url) {
  return apiEndpoint + url;
}

async function login(email) {
  const { data } = await http.post(getApiUrl("/login"), { email });
  const user = JSON.stringify(data.payload);
  console.log(user);
  localStorage.setItem(tokenKey, user);
  return JSON.parse(user);
}

async function getAllUsers() {
  const { data } = await http.get(getApiUrl("/all-users"));
  return data.payload;
}

export default {
  login,
  getAllUsers,
};
