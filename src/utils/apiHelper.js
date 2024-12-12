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
