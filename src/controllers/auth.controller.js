import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { createAccessToken } from "../libs/jwt.js";
import jwt from "jsonwebtoken";
import { TOKEN_SECRET } from "../config.js";
// controlador de register
export const register = async (req, res) => {
  const { email, password, username } = req.body;

  try {
    //busca el correo en la base de datos
    const searchUser = await User.findOne({ email });
    //si ya esta en uso retorna un error 400
    if (searchUser) return res.status(400).json(["el correo ya esta en uso"]);
    //encripta el password 10 veces
    const passwordHash = await bcrypt.hash(password, 10);
    //crea un usuario y con el password encriptado
    const newUser = new User({
      username,
      email,
      password: passwordHash,
    });
    //guarda el usuario
    const userSaved = await newUser.save();
    //crea el token pasandole el cual se va a "encriptar" osea el id
    const token = await createAccessToken({ id: userSaved._id });

    //guarda y responde el token en una cookie
    res.cookie("token", token);
    //responde un json del usuario guardado
    res.json({
      id: userSaved._id,
      email: userSaved.email,
      username: userSaved.username,
    });
  } catch (error) {
    // si sale mal retorna un error 500
    res.status(500).json({
      message: error.message,
    });
  }
};
//controlador de login
export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    //busca busca el usuario usando el email
    const userFound = await User.findOne({ email });
    //si no encuentra devuelve un error 400 y un json
    if (!userFound)
      return res.status(400).json({ message: "ususario no encontrado" });

    //compara los passwords
    const isMatch = await bcrypt.compare(password, userFound.password);
    //si no hay similitud revuelve un error 400 y un json
    if (!isMatch)
      return res.status(400).json({ message: "contraseña incorrecta" });

    //crea el token usando el id del usuario encontrado
    const token = await createAccessToken({ id: userFound._id });

    //guarda el token en una cookie
    res.cookie("token", token);
    //devuelve un json
    res.json({
      id: userFound._id,
      email: userFound.email,
      username: userFound.username,
    });
  } catch (error) {
    //devuelve un error 500
    res.status(500).json({
      message: error.message,
    });
  }
};
//controlador de logout
export const logout = (req, res) => {
  //establece la cookie del token como basio y le da la fecha de caducidad de hoy
  res.cookie("token", "", {
    expires: new Date(0),
  });
  //retorna un estatus 200(OK)
  return res.sendStatus(200);
};
//controlador de profile
export const profile = async (req, res) => {
  const userFound = await User.findById(req.user.id);

  if (!userFound) return res.status(400).json({ message: "user not found  " });
  return res.json({
    id: userFound._id,
    username: userFound.username,
    email: userFound.email,
  });
  res.send("profile");
};

export const verifyToken = async (req, res) => {
  const { token } = req.cookies;

  if (!token) return res.status(401).json({ message: "no autorizado" });

  jwt.verify(token, TOKEN_SECRET, async (err, user) => {
    if (err) return res.status(401).json({ message: "no autorizado" });

    const userFound = await User.findById(user.id);

    if (!userFound) res.status(401).json({ message: "no autorizado" });

    return res.json({
      id: userFound._id,
      username: userFound.username,
      email: userFound.email,
    });
  });
};
