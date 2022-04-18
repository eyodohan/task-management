import http from './httpService';
import config from '../config.json';
import { toast } from 'react-toastify';

const { apiUrl } = config;
const apiEndpoint = apiUrl + '/auth';
const tokenKey = 'auth';

function getApiUrl(url) {
  return apiEndpoint + url;
}

async function login(email) {
  try {
    const { data } = await http.post(getApiUrl('/login'), { email });
    const user = JSON.stringify(data.payload);

    toast.success('Task başarı ile giriş yapıldı.');
    localStorage.setItem(tokenKey, user);
    return JSON.parse(user);
  } catch (error) {
    if (error.response.status === 404)
      toast.error('Sisteme girmeye yetkili değilsiniz.');
    else toast.error('Beklenmeyen bir hata oluştu.');
  }

  const { data } = await http.post(getApiUrl('/login'), { email });
  const user = JSON.stringify(data.payload);
  console.log(user);
  localStorage.setItem(tokenKey, user);
  return JSON.parse(user);
}

async function getAllUsers() {
  const { data } = await http.get(getApiUrl('/all-users'));
  return data.payload;
}

export default {
  login,
  getAllUsers,
};
