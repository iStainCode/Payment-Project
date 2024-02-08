import React from "react";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";


const loginImg =
  "https://images.unsplash.com/photo-1586380951230-e6703d9f6833?auto=format&fit=crop&q=80&w=1974&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { singIn, isAuthenticated, errors: loginErrors } = useAuth();

  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) navigate("/dashboard/products");
  }, [isAuthenticated]);

  const onSubmit = handleSubmit((data) => {
    singIn(data);
  });

  return (
    <section className="relative flex flex-wrap lg:h-screen lg:items-center">
      <div className="w-full px-4 py-12 sm:px-6 sm:py-16 lg:w-1/2 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-lg text-center">
          <motion.h1
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1.3, opacity: 1 }}
            transition={{ ease: "linear", duration: 0.3, delay: 0.2 }}
            className="text-2xl font-bold sm:text-3xl uppercase"
          >
            acceso
          </motion.h1>

          <motion.p
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ ease: "linear", duration: 0.3, delay: 0.4 }}
            className="mt-4 text-gray-500"
          >
            logueate y obten completo acceso a nuestra aplicación
          </motion.p>
        </div>

        <form
          onSubmit={onSubmit}
          className="mx-auto mb-0 mt-8 max-w-md space-y-4"
        >
          {loginErrors.map((error, i) => (
            <motion.div
              className="bg-red-600 text-white p-2 w-full rounded-lg text-center"
              key={i}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              transition={{ duration: 0.3 }}
            >
              {error}
            </motion.div>
          ))}
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ ease: "linear", duration: 0.3, delay: 0.2 }}
          >
            <label htmlFor="email" className="sr-only">
              Email
            </label>

            <div className="relative">
              <input
                type="email"
                className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm text-black"
                placeholder="Enter email"
                //usar la funcion register y le pasa los paramentro ('nombre',{config})
                {...register("email", { required: true })}
              />
              {errors.email && (
                <p className="text-red-500">el email es requerido</p>
              )}

              <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                  />
                </svg>
              </span>
            </div>
          </motion.div>

          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ ease: "linear", duration: 0.3, delay: 0.2 }}
          >
            <label htmlFor="password" className="sr-only">
              Password
            </label>

            <div className="relative">
              <input
                type="password"
                className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm text-black"
                placeholder="Enter password"
                {...register("password", { required: true })}
              />
              {errors.password && (
                <p className="text-red-500">el password es requerido</p>
              )}

              <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
              </span>
            </div>
          </motion.div>

          <div className="flex items-center justify-between">
            <motion.p
              initial={{ y: 300, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.3 }}
              className="text-sm text-gray-500"
            >
              aun no tienes una cuenta?
              <Link to="/register" className="underline">
                Registrarse
              </Link>
            </motion.p>

            <motion.button
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              initial={{ scale: 0.5, opacity: 0, delay: 0.3, x: 400 }}
              animate={{ scale: 1, opacity: 1, x: 0 }}
              transition={{ ease: "linear", duration: 0.4 }}
              type="submit"
              className="inline-block rounded-lg bg-fuchsia-900 hover:bg-fuchsia-950 duration-200 px-5 py-3 text-sm font-medium text-white uppercase"
            >
              entrar
            </motion.button>
          </div>
        </form>
      </div>

      <div className="relative h-64 w-full sm:h-96 lg:h-full lg:w-1/2">
        <img
          alt="Welcome"
          src={loginImg}
          className="absolute inset-0 h-full w-full object-cover"
        />
      </div>
    </section>
  );
}
