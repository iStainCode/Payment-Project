import mongoose from 'mongoose';
import { PASSWORD_BD } from './config.js';

//conecta con la bd de froma asincronica 
export const connectDB = async () => {
  try {
    await mongoose.connect(`mongodb+srv://stain:${PASSWORD_BD}@paymentlist.opdub8b.mongodb.net/?retryWrites=true&w=majority`)
    console.log('conectado')
  } catch (error) {
    console.log(error)
  }
};