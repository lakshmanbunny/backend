import axios from 'axios';

const API_URL = '/auth';

const login = async (data) => {
  return await axios.post(`${API_URL}/login`, data);
};

const register = async (data) => {
  return await axios.post(`${API_URL}/register`, data);
};

export default { login, register };
