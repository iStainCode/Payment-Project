import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { createProductRequest } from "../../../api/products";
import { useCategorys } from "../../../context/CategoryContext";
import { useNavigate } from "react-router-dom";

const NewProduct = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { getCategorys, categorys } = useCategorys();

  useEffect(() => {
    getCategorys();
  }, []);

  const onSubmit = handleSubmit(async (data) => {
    try {
      const image1 = await fileToBase64(data.image1[0]);
      const image2 = await fileToBase64(data.image2[0]);
      
      const formattedData = {
        name: data.name,
        description: data.description,
        category: data.category,
        price: parseFloat(data.price),
        stock: parseInt(data.stock),
        active: data.active === "true",
        image1,
        image2,
      };
  
      console.log(formattedData);
  
      const response = await createProductRequest(formattedData);
  
      console.log("Producto creado:", response);

      navigate('/dashboard/products')
      
    } catch (error) {
      console.error("Error al crear el producto XD:", error);
    }
  });
  
  const fileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  return (
    <form onSubmit={onSubmit} className="max-w-md mx-auto" encType="multipart/form-data">
      <div className="mb-4">
        <label htmlFor="name" className="block mb-2">
          Nombre
        </label>
        <input
          type="text"
          id="name"
          {...register("name", { required: true })}
          className="w-full border p-2 text-black"
        />
        {errors.name && (
          <span className="text-red-500">Este campo es requerido</span>
        )}
      </div>
      <div className="mb-4">
        <label htmlFor="price" className="block mb-2">
          Precio
        </label>
        <input
          type="number"
          id="price"
          {...register("price", { required: true })}
          className="w-full border p-2 text-black"
        />
        {errors.price && (
          <span className="text-red-500">Este campo es requerido</span>
        )}
      </div>
      <div className="mb-4">
        <label htmlFor="description" className="block mb-2">
          Descripción
        </label>
        <textarea
          id="description"
          {...register("description", { required: true })}
          className="w-full border p-2 text-black"
        />
        {errors.description && (
          <span className="text-red-500">Este campo es requerido</span>
        )}
      </div>
      <div className="mb-4">
        <label htmlFor="stock" className="block mb-2">
          Stock
        </label>
        <input
          type="number"
          id="stock"
          {...register("stock", { required: true })}
          className="w-full border p-2 text-black"
        />
        {errors.stock && (
          <span className="text-red-500">Este campo es requerido</span>
        )}
      </div>
      <div className="mb-4">
        <label htmlFor="category" className="block mb-2">
          Categoría
        </label>
        <select
          id="category"
          {...register("category", { required: true })}
          className="w-full border p-2 text-black"
        >
          <option value="">selecciona la categoria</option>
          {categorys.map((category) => (
            <option key={category._id} value={category.category}>{category.category}</option>
          ))}
        </select>
        {errors.category && (
          <span className="text-red-500">Este campo es requerido</span>
        )}
      </div>
      <div className="mb-4">
        <label htmlFor="image1" className="block mb-2">
          Imagen 1
        </label>
        <input
          type="file"
          id="image1"
          {...register("image1", { required: true })}
          className="w-full border p-2"
        />
        {errors.image1 && (
          <span className="text-red-500">Debes seleccionar una imagen</span>
        )}
      </div>
      <div className="mb-4">
        <label htmlFor="image2" className="block mb-2">
          Imagen 2
        </label>
        <input
          type="file"
          id="image2"
          {...register("image2", { required: true })}
          className="w-full border p-2"
        />
        {errors.image2 && (
          <span className="text-red-500">Debes seleccionar una imagen</span>
        )}
      </div>
      <div className="mb-4">
        <label htmlFor="active" className="block mb-2 ">
          Activo
        </label>
        <select
          id="active"
          {...register("active", { required: true })}
          className="w-full border p-2 text-black"
        >
          <option value="">Selecciona un estado</option>
          <option value={true}>Activo</option>
          <option value={false}>Inactivo</option>
        </select>
        {errors.active && (
          <span className="text-red-500">Este campo es requerido</span>
        )}
      </div>
      <button type="submit" className="bg-blue-500 text-white px-4 py-2">
        Enviar
      </button>
    </form>
  );
};

export default NewProduct;
