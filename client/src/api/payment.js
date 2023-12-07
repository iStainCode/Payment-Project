import axios from "./axios";

export const createPaymentRequest = async (payment) => {
  try {
    const res = await axios.post('/create-order', payment)
    console.log(res)
  } catch (error) {
    throw error
  }
}