import axios from "./axios";

export const getUsersRequest = async () => 
axios.get("/users");

export const getUserRequest = async (id) => 
axios.get(`/users/${id}`);

export const createUserRequest = async (userData) => {
  try {
    const response = await axios.post("/users", userData);

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateUserRequest = async (id,user) =>
  axios.put(`/users/${id}`, user);

export const deleteUserRequest = async (id) => 
axios.delete(`/users/${id}`);
