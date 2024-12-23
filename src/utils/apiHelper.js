import axios from "axios";

const BASE_URL = "https://aiu-community.onrender.com/api/v1";

export const fetchData = async (endpoint, params = {}) => {
  try {
    const response = await axios.get(`${BASE_URL}/${endpoint}`, { params });
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export const postData = async (endpoint, data, headers = {}) => {
  try {
    const response = await axios.post(`${BASE_URL}/${endpoint}`, data, { headers });
    return response.data;
  } catch (error) {
    console.error("Error posting data:", error);
    throw error;
  }
};

export const fetchQuestions = async () => {
  const response = await axios.get(`${BASE_URL}/questions/`);
  return response.data;
};

export const postQuestion = async (question) => {
  const response = await axios.post(`${BASE_URL}/questions/`, { question_text: question });
  return response.data;
};

export const fetchAnswers = async (questionId) => {
  const response = await axios.get(`${BASE_URL}/questions/${questionId}/answers/`);
  return response.data;
};

export const postAnswer = async (questionId, answer) => {
  const response = await axios.post(`${BASE_URL}/questions/${questionId}/answers/`, { answer_text: answer });
  return response.data;
};

export const setAuthToken = (token) => {
  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common['Authorization'];
  }
};

export const login = async (username, password) => {
  try {
    const response = await api.post('/login/', { username, password });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const register = async (username, email, password) => {
  try {
    const response = await api.post('/register/', { username, email, password });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const logout = async () => {
  try {
    await api.post('/logout/');
  } catch (error) {
    throw error;
  }
};

export default api;

