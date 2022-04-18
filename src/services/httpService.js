import axios from 'axios';

function setJwt() {
  axios.defaults.headers.common['Authorization'] =
    'Bearer ' + JSON.parse(localStorage.getItem('auth')).jwtToken;
}

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
  setJwt,
};
