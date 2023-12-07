import { createContext, useContext, useState } from "react";
import {
  createCategoryRequest,
  getCategorysRequest,
  deleteCategoryRequest,
  updateCategoryRequest,
} from "../api/categorys";

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
    } catch (error) {
      console.log(error);
    }
  };

  const updateCategory = async (id, category) => {
    try {
      await updateCategoryRequest(id, category);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteCategory = async (id) => {
    try {
      const res = await deleteCategoryRequest(id);
      window.location.reload();
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
        updateCategory,
        deleteCategory,
      }}
    >
      {children}
    </CategoryContext.Provider>
  );
}
