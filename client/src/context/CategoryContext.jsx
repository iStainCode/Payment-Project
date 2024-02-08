import { createContext, useContext, useState } from "react";
import {
  createCategoryRequest,
  deleteCategoryRequest,
  getCategorysRequest, 
  updateCategoryRequest,
} from "../api/categorys";
import Swal from 'sweetalert2'

const CategoryContext = createContext();

export const useCategorys = () => {
  const context = useContext(CategoryContext);

  if (!context) {
    throw new Error("useCategory deve de estar dentro de un provider");
  }

  return context;
};

export function CategoryProvider({ children }) {
  const [categorys, setCategorys] = useState([]);

  const getCategorys = async () => {
    try {
      const res = await getCategorysRequest();
      setCategorys(res.data);
      console.log(res.data);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  const createCategory = async (category) => {
    try {
      const res = await createCategoryRequest(category);
      console.log(res.data);
      Swal.fire({
        position: "bottom-end",
        icon: "success",
        title: "Registro exitoso",
        showConfirmButton: false,
        timer: 1000
      });
    } catch (error) {
      console.log(error);
    }
  };

  const deleteCategory = async (id) => {
    try {
      const res = await deleteCategoryRequest(id);
      if (res.status === 204)
      setCategorys(categorys.filter(category => category._id !== id));
    window.location.reload()
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <CategoryContext.Provider
      value={{
        categorys,
        createCategory,
        getCategorys,
        deleteCategory,
      }}
    >
      {children}
    </CategoryContext.Provider>
  );
}
