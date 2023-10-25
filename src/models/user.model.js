import mongoose from "mongoose";

//esquema(plantilla) de un usuario
const userSchema = new mongoose.Schema({
  //necesita un username
  username:{
    //tipo
    type: String,
    //requerido
    required:true,
    //quitar los espacios
    trim: true
  },
  //necesita un email
  email:{
    //tipo
    type:String,
    //requerido
    required:true,
    //unico (no se puede tener dos cuentas con el mismo correo)
    unique: true
  },
  //necesita un password
  password:{
    //tipo
    type:String,
    //requerido
    required:true
  }
},{
  timestamps:true
});

export default mongoose.model('User',userSchema)