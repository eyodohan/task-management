import http from "./httpService";
import config from "../config.json";

const { apiUrl } = config;
const apiEndpoint = apiUrl + "/task";

function getApiUrl(url) {
  return apiEndpoint + "/" + url;
}

const getAllTasks = async () => {
  http.setJwt();
  const { data } = await http.get(apiEndpoint);
  return data.payload;
};

const getMyTasks = async () => {
  http.setJwt();
  const { data } = await http.get(getApiUrl("my-tasks"));
  return data.payload;
};

const getPendingTasks = async () => {
  http.setJwt();
  const { data } = await http.get(getApiUrl("pendings"));
  return data.payload;
};

const getTask = async (taskId) => {
  http.setJwt();
  const { data } = await http.get(getApiUrl(taskId));
  return data.payload;
};

const createTask = async (task) => {
  http.setJwt();
  return http.post(apiEndpoint, task);
};

const updateTask = async (task) => {
  http.setJwt();
  const body = { ...task };
  delete body.id;
  return http.put(getApiUrl(task.id), body);
};

const deleteTask = async (taskId) => {
  http.setJwt();
  const { data } = await http.delete(getApiUrl(taskId));
  return data.payload;
};

const completeTask = async (taskId) => {
  http.setJwt();
  const { data } = await http.get(`${apiEndpoint}/complete/ ${taskId}`);
  return data.payload;
};

const rejectTask = async (taskId) => {
  http.setJwt();
  const { data } = await http.get(`${apiEndpoint}/reject/${taskId}`);
  return data.payload;
};

export default {
  getAllTasks,
  getMyTasks,
  getPendingTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask,
  completeTask,
  rejectTask,
};
