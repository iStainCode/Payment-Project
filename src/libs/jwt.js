import jwt from "jsonwebtoken"
import { TOKEN_SECRET } from "../config.js";

//la funcion espera un payload(un objeto)
export function createAccessToken(payload){
  //retorna una promesa 
  //resolve = si sale bien
  //reject = si no salio bien
  return new Promise((resolve,reject) =>{
    //usa jwt y se conecta
    jwt.sign(
      //recupera el payload
      payload,
      //recupera la clave con el cual se encripta
      TOKEN_SECRET,
      {
      //tiempo de expiracion
      expiresIn: "1d"
      },
      //recupera el err(error) y el token
      (err, token)=>{
      //si sale mal devuelve el error
      if (err) reject(err)
      //si sale bien devuelve el token
      resolve(token)
      }
    )
  })
}

