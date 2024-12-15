import axios from "axios";
const apiUrl = process.env.VITE_API_URL || "";

export const loginUser = async (credentials) => {
  try {
    const response = await axios.post(`${apiUrl}/api/users/login`, credentials);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Login failed");
  }
};
