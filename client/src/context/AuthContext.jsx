import { createContext, useContext, useState, useEffect } from "react";
import { loginRequest, registerRequest, verifyTokenRequest } from "../api/auth";
import Cookies from "js-cookie";

//crea un contexto (donde se va a guardar el usuario)
export const AuthContext = createContext();

//crea el validador del contexto
export const useAuth = () => {
  //guarda lo que devuelve el contexto con los datos
  const context = useContext(AuthContext);
  if (!context) {
    //si esta vacio genera un error
    throw new Error("el useAuth deveria de estar dentro de un provider");
  }
  //si todo sale bien retorna la valiable context
  return context;
};

//crea y exporta la funcion AuthProvider que espera un elemento hijo
export const AuthProvider = ({ children }) => {
  //crea el usuario con valor por default 'null'
  const [user, setUser] = useState(null);
  //crea el autenticador con valor por default 'false'
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  //crea un estado donde se guardan los errores
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(true);
  //crea la funciona que manda los datos al back
  const singUp = async (user) => {
    try {
      //envia los datos al back
      const res = await registerRequest(user);
      //guarda los datos en el objeto user
      setUser(res.data);
      //cambia el estado a true
      setIsAuthenticated(true);
    } catch (error) {
      setErrors(error.response.data);
    }
  };

  const singIn = async (user) => {
    try {
      const res = await loginRequest(user);
      setIsAuthenticated(true);
      setUser(res.data);
    } catch (error) {
      if (Array.isArray(error.response.data)) {
        return setErrors(error.response.data);
      }
      setErrors([error.response.data.message]);
    }
  };

  useEffect(() => {
    if (errors.length > 0) {
      const timer = setTimeout(() => {
        setErrors([]);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [errors]);

  useEffect(() => {
    async function checkLogin() {
      const cookies = Cookies.get();

      if (!cookies.token) {
        setIsAuthenticated(false);
        setLoading(false);
        return setUser(null);
      }
      try {
        const res = await verifyTokenRequest(cookies.token);
        if (!res.data) {
          setIsAuthenticated(false);
          setLoading(false);
          return;
        }
        setIsAuthenticated(true);
        setUser(res.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setIsAuthenticated(false);
        setUser(null);
        setLoading(false);
      }
    }
    checkLogin();
  }, []);

  //retirna el contexto con los valores se Sing, el usario, y si esta autencicado
  return (
    <AuthContext.Provider
      value={{ singUp, singIn, loading, user, isAuthenticated, errors }}
    >
      {/* dntro del contexto van a ir mas elementos y todos ellos son children osea hijos */}
      {children}
    </AuthContext.Provider>
  );
};
