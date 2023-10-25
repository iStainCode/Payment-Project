import mongoose from 'mongoose';

//conecta con la bd de froma asincronica 
export const connectDB = async () => {
  try {
    await mongoose.connect('mongodb://0.0.0.0/paymentListDB')
    console.log('conectado')
  } catch (error) {
    console.log(error)
  }
};