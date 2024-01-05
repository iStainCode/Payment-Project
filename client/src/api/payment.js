import axios from "./axios";

export const createPaymentRequest = async (products) => {
  try {
    const response = await axios.post("/create-order", products);

    console.log(response.data);

    window.location.href = response.data.response.init_point
  } catch (error) {
    throw error;
  }
};
