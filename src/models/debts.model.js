import mongoose from "mongoose";

const debtsSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
    },
    amount: {
      type: Number,
      required: true,
    },
    reason: {
      type: String,
      //contedifo por default
      default: "no dijo nd",
    },
    date: {
      type: Date,
      //contenido por defaul fecha de hoy
      default: Date.now,
    },
    user:{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    }
  },
  {
    //activar guardar las fechas de creacion y de actualizacion de los datos
    timestamps: true,
  }
);

export default mongoose.model("debts", debtsSchema);
