import axios from "./axios";

export const getProductsRequest = async () => axios.get("/products");

export const getProductRequest = async (id) => axios.get(`/products/${id}`);

export const createProductRequest = async (productData) => {
  try {
    const response = await axios.post("/products", productData);

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateProductRequest = async (product) =>
  axios.put(`/products/${product._id}`, product);


export const deleteProductRequest = async (id) => axios.delete(`/products/${id}`);
