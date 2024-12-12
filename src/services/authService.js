import axios from "axios";
const apiUrl = import.meta.env.VITE_API_URL;

export const loginUser = async (credentials) => {
  try {
    const response = await axios.post(`${apiUrl}/api/users/login`, credentials);
    console.log("login response", response.data);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Login failed");
  }
};
