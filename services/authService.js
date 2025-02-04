?
import axios from 'axios';

const API_URL = '/auth'; // Adjust base URL as needed

const login = async (data) => {
  const response = await axios.post(`${API_URL}/login`, data);
  return response;
  const { generateToken, hashPassword, comparePassword } = require('../config/auth');
  const User = require('../models/User');
  
  exports.registerUser = async (userData) => {
    const { name, email, password } = userData;
    const hashedPassword = await hashPassword(password);
    const user = new User({ name, email, password: hashedPassword });
    await user.save();
    const token = generateToken(user);
    return token;
  };
  
  exports.loginUser = async (userData) => {
    const { email, password } = userData;
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error('Invalid credentials');
    }
    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) {
      throw new Error('Invalid credentials');
    }
    const token = generateToken(user);
    return token;
  };
  };

const register = async (data) => {
  const response = await axios.post(`${API_URL}/register`, data);
  return response;
};

export default { login, register };
