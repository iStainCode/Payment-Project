import React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useUser } from "../../../context/UserContext";

const NewUser = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { createUser } = useUser();

  const onSubmit = handleSubmit(async (data) => {
    try {
      const response = await createUser(data);

      console.log("Usuario creado:", response);

      navigate('/dashboard/users');

    } catch (error) {
      console.error("Error al crear el usuario:", error);
    }
  });

  return (
    <form onSubmit={onSubmit} className="max-w-md mx-auto">
      {}
      <div className="mb-4">
        <label htmlFor="username" className="block mb-2">
          Usuario
        </label>
        <input
          type="text"
          id="username"
          {...register("username", { required: true })}
          className="w-full border p-2 text-black"
        />
        {errors.username && (
          <span className="text-red-500">Este campo es requerido</span>
        )}
      </div>
      <div className="mb-4">
        <label htmlFor="email" className="block mb-2">
          Email
        </label>
        <input
          type="email"
          id="email"
          {...register("email", { required: true })}
          className="w-full border p-2 text-black"
        />
        {errors.email && (
          <span className="text-red-500">Este campo es requerido</span>
        )}
      </div>
      <div className="mb-4">
        <label htmlFor="password" className="block mb-2">
          Password
        </label>
        <input
          type="password"
          id="password"
          {...register("password", { required: true })}
          className="w-full border p-2 text-black"
        />
        {errors.password && (
          <span className="text-red-500">Este campo es requerido</span>
        )}
      </div>
      {/* Otros campos del formulario para el usuario */}
      {/* ... */}
      <button type="submit" className="bg-blue-500 text-white px-4 py-2">
        Enviar
      </button>
    </form>
  );
};

export default NewUser;
