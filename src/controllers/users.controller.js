import userModel from "../models/user.model.js";

export const getUsers = async (req, res) => {
  const users = await userModel.find();
  res.json(users);
};

export const createUser = async (req, res) => {
  try {
    const {
      username,
      email,
      password
    } = req.body;

    const newUser = new userModel({
      username,
      email,
      password
    });

    const saveUser = await newUser.save();

    res.json(saveUser);
  } catch (error) {
    res.status(500).json({ message: "Error al crear el usuario", error });
  }
};

export const getUser = async (req, res) => {
  const user = await userModel.findById(req.params.id);

  if (!user)
    return res.status(404).json({ message: "Usuario no encontrado" });

  res.json(user);
};

export const deleteUser = async (req, res) => {
  const user = await userModel.findByIdAndDelete(req.params.id);

  if (!user)
    return res.status(404).json({ message: "Usuario no encontrado" });

  res.json(user);
};

export const updateUser = async (req, res) => {
  try {
    const { username, email, password} = req.body;

    // Encuentra el producto existente por su ID
    const user = await userModel.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    // Actualiza los campos del producto
    user.username = username;
    user.email = email;
    user.password = password;

    // Guarda el producto actualizado en la base de datos
    const updatedUser = await user.save();

    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar el usuario", error });
  }
};