import Debts from "../models/debts.model.js";
//controlador de getDebts
export const getDebts = async (req, res) => {
  //recupera los datos
  const debts = await Debts.find({
    user:req.user.id
  });
  //retorna los datos en formato json
  res.json(debts);
};
//controlador de createDebts
export const createDebt = async (req, res) => {
  const { name, lastname, amount, reason, date } = req.body;
  //crea un usuario usando el objeto Debts como esquema
  const newDebts = new Debts({
    name,
    lastname,
    amount,
    reason,
    date,
    user: req.user.id
  });
  //guarda el ususario creado y guarda el resultado en la const saveDebts
  const saveDebts = await newDebts.save();
  //retorna el ususario guardado en la bd en formato json
  res.json(saveDebts);
};

//controlador de getDebt
export const getDebt = async (req, res) => {
  //guarda la deuda buscada por un id
  const debts = await Debts.findById(req.params.id);
  //si no cuentra nd retorna deuda no encontrada
  if (!debts) return res.status(404).json({ message: "deuda no encontrada" });
  //devuelve las deudas en formato json
  res.json(debts);
};

//controlador de deleteDebt
export const deleteDebt = async (req, res) => {
  //elimina la deuda por medio de un id 
  const debt = await Debts.findByIdAndDelete(req.params.id);
  //si no encuentra nd retorna deuda no encontrada
  if (!debt) return res.status(404).json({ message: "deuda no encontrada" });
  //retorna la deuda en formato json
  res.json(debt);
};

//controlador de updateDebt
export const updateDebt = async (req, res) => {
  //actualiza la deuda seleccionando el id y los nuevos valores obtenidos del body
  const debt = await Debts.findByIdAndUpdate(req.params.id, req.body, {
    //para que muestre la deuda actualizada
    new: true,
  });
  //si no encuentra nd retorna deuda no encontrada
  if (!debt) return res.status(404).json({ message: "deuda no encontrada" });
  //retorna la deuda actualizada en formato json
  res.json(debt);
};
