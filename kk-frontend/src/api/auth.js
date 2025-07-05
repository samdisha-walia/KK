import axios from "axios";

const API_URL = "http://127.0.0.1:8000/api/";

export const register = async (username, email, password) => {
  return axios.post(`${API_URL}register/`, { username, email, password });
};


export const login = async (username, password) => {
  return axios.post(`${API_URL}login/`, { username, password });
};
