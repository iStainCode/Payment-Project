import { useForm } from "react-hook-form";
import {useCategorys} from '../../../context/CategoryContext'
import { useNavigate } from "react-router-dom";

const NewCategory = () => {
  const {register, handleSubmit, formState: { errors },} = useForm()
  const {createCategory } = useCategorys()
  const navigate = useNavigate()
  const onSubmit = handleSubmit(async (data) =>{
    try {
      await createCategory(data)
      navigate('/dashboard/categorys')
    } catch (error) {
      console.log(error);
    }
  })

  return (
    <form
      onSubmit={onSubmit}
      className="max-w-md mx-auto"
      encType="multipart/form-data"
    >
      <div className="mb-4">
        <label htmlFor="category" className="block mb-2">
          categoria
        </label>
        <input
          type="text"
          id="category"
          {...register("category", { required: true })}
          className="w-full border p-2 text-black"
        />
        {errors.category && (
          <span className="text-red-500">Este campo es requerido</span>
        )}
      </div>
      <button type="submit" className="bg-blue-500 text-white px-4 py-2">
        Enviar
      </button>
    </form>
  );
};

export default NewCategory;
