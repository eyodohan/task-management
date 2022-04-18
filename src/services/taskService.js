import http from './httpService';
import config from '../config.json';
import { toast } from 'react-toastify';

const { apiUrl } = config;
const apiEndpoint = apiUrl + '/task';

function getApiUrl(url) {
  return apiEndpoint + '/' + url;
}

const getAllTasks = async () => {
  http.setJwt();
  const { data } = await http.get(apiEndpoint);
  return data.payload;
};

const getMyTasks = async () => {
  http.setJwt();
  const { data } = await http.get(getApiUrl('my-tasks'));
  return data.payload;
};

const getPendingTasks = async () => {
  http.setJwt();
  const { data } = await http.get(getApiUrl('pendings'));
  return data.payload;
};

const getTask = async (taskId) => {
  http.setJwt();
  const { data } = await http.get(getApiUrl(taskId));
  return data.payload;
};

const createTask = async (task) => {
  http.setJwt();
  try {
    toast.success('Task başarı ile oluşturuldu');
    return http.post(apiEndpoint, task);
  } catch (error) {
    toast.error('Beklenmeyen bir hata oluştu.');
  }
};

const updateTask = async (task) => {
  http.setJwt();
  try {
    const body = { ...task };
    delete body.id;
    toast.success('Task başarı ile güncellendi.');
    return http.put(getApiUrl(task.id), body);
  } catch (error) {
    toast.error('Beklenmeyen bir hata oluştu.');
  }
};

const deleteTask = async (taskId) => {
  http.setJwt();
  try {
    const { data } = await http.delete(getApiUrl(taskId));
    toast.success('Task başarı ile silindi.');
    return data.payload.id;
  } catch (error) {
    if (error.response.status === 403)
      toast.error('Bu işlem için yetkili değilsiniz.');
    else toast.error('Beklenmeyen bir hata oluştu.');
  }
};

const completeTask = async (taskId) => {
  http.setJwt();
  try {
    const { data } = await http.get(`${apiEndpoint}/complete/ ${taskId}`);
    toast.success('Task başarı ile tamamlandı.');
    return data.payload;
  } catch (error) {
    if (error.response.status === 400)
      toast.error('Task daha önce tamamlanmış veya reddedilmiş.');
    if (error.response.status === 403)
      toast.error('Bu işlem için yetkili değilsiniz.');
  }
};

const rejectTask = async (taskId) => {
  http.setJwt();
  try {
    const { data } = await http.get(`${apiEndpoint}/reject/${taskId}`);
    toast('Task reddedildi.');
    return data.payload;
  } catch (error) {
    if (error.response.status === 400)
      toast.error('Task daha önce reddedilmiş veya tamamlanmış.');
    if (error.response.status === 403)
      toast.error('Bu işlem için yetkili değilsiniz.');
  }
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
