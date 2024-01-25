import axios from "./axios";

export const getCategorysRequest = async () => 
axios.get("/categorys");

export const createCategoryRequest = async (category) =>
  axios.post("/categorys", category);

export const updateCategoryRequest = async (category) =>
  axios.put(`/categorys/${category._id}`, category);

export const deleteCategoryRequest = async (id) =>
  axios.delete(`/categorys/${id}`);
