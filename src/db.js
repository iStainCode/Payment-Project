import mongoose from 'mongoose';
import { PASSWORD_BD } from './config.js';

//conecta con la bd de froma asincronica 
export const connectDB = async () => {
  try {
    await mongoose.connect('mongodb://0.0.0.0:27017')
    console.log('conectado')
  } catch (error) {
    console.log(error)
  }
};