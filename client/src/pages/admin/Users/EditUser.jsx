  import { useForm } from "react-hook-form";
  import { useEffect } from "react";
  import { useNavigate, useParams } from "react-router-dom";
  import { useUser } from "../../../context/UserContext";

  const EditUsers = ({}) => {
    const params = useParams();   

    const navigate = useNavigate()
    
    const { getUser, updateUser } = useUser();

    const {
      register,
      handleSubmit,
      setValue,
      formState: { errors },
    } = useForm();

    useEffect(() => {
      async function loadUser() {
        if (params.id) {
          console.log("-----");
          const userInfo = await getUser(params.id);
          console.log(userInfo);
          setValue("username", userInfo.username);
          setValue("email", userInfo.email);
        }
      }
      loadUser();
    }, []);

    const onSubmit = handleSubmit(async (data) => {
      try {
        const formattedData = {
          username: data.username,
          email: data.email,
          password: data.password,
        };

        console.log(formattedData);

        const response = await updateUser(params.id, formattedData);

        console.log("Usuario creado:", response);
        navigate('/dashboard/users')
        
      } catch (error) {
        console.error("Error al crear el Usuario", error);
      }
    });

    return (
      <form
        onSubmit={onSubmit}
        className="max-w-md mx-auto"
        encType="multipart/form-data"
      >
        <div className="mb-4">
          <label htmlFor="username" className="block mb-2">
            Username
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
            email
          </label>
          <input
            type="text"
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
        <button type="submit" className="bg-blue-500 text-white px-4 py-2">
          Enviar
        </button>
      </form>
    );
  };

  export default EditUsers;