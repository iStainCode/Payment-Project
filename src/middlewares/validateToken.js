import jwt from "jsonwebtoken"
import { TOKEN_SECRET } from "../config.js"

//es una funcion que es antes de las rutas para validar si tienen un token si lo tienen ejecuta la funcion next()
export const authRequired = (req,res,next) =>{
  
  //recupera el token de la cookie
  const {token} = req.cookies
  
  //si no encuentra algun token devuelve un error 401
  if (!token) return res.status(401).json({message:"no hay un token "})

  //verifica si el token que encontro es nuestro

  jwt.verify(token, TOKEN_SECRET, (err, user) =>{
    //si sale un error el token no es nuestro y devuelve un error 401
    if (err) return res.status(401).json({
      message:"token invalido"
    })
    // si el token es nuestro guarda el ususario y ejecuta la funcion next()
    req.user = user
    next()
  })
}