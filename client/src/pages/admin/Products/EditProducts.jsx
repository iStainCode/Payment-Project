import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { useCategorys } from "../../../context/CategoryContext";
import { useNavigate, useParams } from "react-router-dom";
import { useProducts } from "../../../context/ProductContext";
const EditProducts = ({}) => {
  const params = useParams();

  const navigate = useNavigate()
  
  const { getProduct, updateProduct } = useProducts();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const { getCategorys, categorys } = useCategorys();

  useEffect(() => {
    getCategorys();
    async function loadProduct() {
      if (params.id) {
        console.log("-----");
        const productInfo = await getProduct(params.id);
        console.log(productInfo);
        setValue("name", productInfo.name);
        setValue("price", parseFloat(productInfo.price.$numberDecimal));
        setValue("description", productInfo.description);
        setValue("stock", productInfo.stock);
        setValue("category", productInfo.category);
        setValue("active", productInfo.active);
      }
    }
    loadProduct();
  }, []);

  const onSubmit = handleSubmit(async (data) => {
    try {
      const formattedData = {
        name: data.name,
        description: data.description,
        category: data.category,
        price: parseFloat(data.price),
        stock: parseInt(data.stock),
        active: data.active === "true",
      };

      console.log(formattedData);

      const response = await updateProduct(params.id, formattedData);

      console.log("Producto creado:", response);
    } catch (error) {
      console.error("Error al crear el producto XD:", error);
    }
  });

  return (
    <form
      onSubmit={onSubmit}
      className="max-w-md mx-auto"
      encType="multipart/form-data"
    >
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
            <option key={category._id} value={category.category}>
              {category.category}
            </option>
          ))}
        </select>
        {errors.category && (
          <span className="text-red-500">Este campo es requerido</span>
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

export default EditProducts;
