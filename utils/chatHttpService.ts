import axios from "axios";
const BASE_URL = "http://70.34.242.119";

const getUserId = () =>
  new Promise((resolve, reject) => {
    try {
      resolve(localStorage.getItem("userid"));
    } catch (error) {
      reject(error);
    }
  });

const removeLS = () =>
  new Promise((resolve, reject) => {
    try {
      localStorage.removeItem("userid");
      localStorage.removeItem("username");
      resolve(true);
    } catch (error) {
      reject(error);
    }
  });

const setLS = (key, value) =>
  new Promise((resolve, reject) => {
    try {
      localStorage.setItem(key, value);
      resolve(true);
    } catch (error) {
      reject(error);
    }
  });

const login = (userCredential) =>
  axios.post(`${BASE_URL}/api/auth/signin`, userCredential);

const register = (userCredential) =>
  axios.post(`${BASE_URL}/api/auth/signup`, userCredential);

const userSessionCheck = (userId) =>
  axios.post(`${BASE_URL}/api/auth/userSessionCheck`, {
    userId
  });

const getMessages = (userId, toUserId) =>
  axios.post(`${BASE_URL}/api/message/getMessages`, {
    userId,
    toUserId
  });

const getUserInfo = (userId) => axios.get(`${BASE_URL}/api/auth/user-info/${userId}`);

export default {
  getUserId,
  removeLS,
  setLS,
  login,
  register,
  userSessionCheck,
  getMessages,
  getUserInfo
};
