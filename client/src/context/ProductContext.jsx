import { createContext, useContext, useState } from "react";
import {
  createProductRequest,
  deleteProductRequest,
  getProductsRequest,
  updateProductRequest,
  getProductRequest
} from "../api/products";
import Swal from 'sweetalert2'

const ProductContext = createContext();

export const useProducts = () => {
  const context = useContext(ProductContext);

  if (!context) {
    throw new Error("useProduct deve de estar dentro de un provider");
  }

  return context;
};

export function ProductProvider({ children }) {
  const [products, setProducts] = useState([]);

  const getProducts = async () => {
    try {
      const res = await getProductsRequest();
      setProducts(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const createProduct = async (product) => {
    try {
      const res = await createProductRequest(product);
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

  const updateProduct = async (id, product) => {
    try {
      await updateProductRequest(id, product);
      Swal.fire({
        position: "bottom-end",
        icon: "success",
        title: "Datos Actualizados con exito",
        showConfirmButton: false,
        timer: 1000
      });
    } catch (error) {
      console.log(error);
    }
  };

  const deleteProduct = async (id) => {
    try {
      const res = await deleteProductRequest(id);
      if (res.status === 204)
        setProducts(products.filter(product => product._id !== id));
      window.location.reload()
    } catch (error) {
      console.log(error);
    }
  };

  const getProduct = async (id) =>{
    try {
      const res = await getProductRequest(id)
      return res.data
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <ProductContext.Provider
      value={{
        products,
        createProduct,
        getProducts,
        deleteProduct,
        updateProduct,
        getProduct,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}
