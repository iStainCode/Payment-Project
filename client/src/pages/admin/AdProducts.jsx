import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { RiArrowLeftSLine, RiArrowRightSLine } from "react-icons/ri";
import { Menu, MenuItem, MenuButton } from "@szhsin/react-menu";
import "@szhsin/react-menu/dist/index.css";
import "@szhsin/react-menu/dist/transitions/slide.css";
import Modal from "react-modal";
import { useForm } from "react-hook-form";
import { useProducts } from "../../context/ProductContext";

const AdProducts = () => {
  const [modalNewIsOpen, setModalNewIsOpen] = useState(false);

  const [modalEditIsOpen, setModalEditIsOpen] = useState(false);

  const [productToEdit, setProductToEdit] = useState({
    name: "",
    price: 0,
    description: "",
    stock: 0,
    active: false,
  });

  const openNewModal = () => {
    setModalNewIsOpen(true);
  };

  const closeNewModal = () => {
    setModalNewIsOpen(false);
  };

  const openEditModal = (product) => {
    setProductToEdit(product);
    setModalEditIsOpen(true);
  };

  const closeEditModal = () => {
    setModalEditIsOpen(false);
  };

  const { register, handleSubmit } = useForm();

  const { createProduct, getProducts, deleteProduct, products } = useProducts();

  useEffect(() => {
    getProducts();
  }, []);

  const onSubmitNew = handleSubmit(async (data) => {
    const transformedData = {
      name: data.name,
      price: parseFloat(data.price),
      description: data.description,
      stock: parseInt(data.stock),
      active: data.active === "true",
    };
    try {
      await createProduct(transformedData);
      window.location.reload();
    } catch (error) {
      console.error("Error al enviar los datos:", error);
    }
  });
  const onSubmitEdit = handleSubmit((data) => {
    console.log(data);
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-10">
        <h1 className="text-4xl text-white">Productos</h1>
        <div className="flex items-center gap-2 text-3xl">
          <RiArrowLeftSLine className="hover:cursor-pointer hover:text-white transition-colors" />
          <RiArrowRightSLine className="hover:cursor-pointer hover:text-white transition-colors" />
        </div>
      </div>
      <div>
        <button
          onClick={openNewModal}
          title="Add New"
          className="group cursor-pointer outline-none hover:rotate-90 duration-300"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="50px"
            height="50px"
            viewBox="0 0 24 24"
            className="stroke-zinc-400 fill-none group-hover:fill-zinc-800 group-active:stroke-zinc-200 group-active:fill-zinc-600 group-active:duration-0 duration-300"
          >
            <path
              d="M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z"
              strokeWidth="1.5"
            ></path>
            <path d="M8 12H16" strokeWidth="1.5"></path>
            <path d="M12 16V8" strokeWidth="1.5"></path>
          </svg>
        </button>
      </div>
      <Modal
        isOpen={modalNewIsOpen}
        onRequestClose={closeNewModal}
        contentLabel="Editar Producto"
        className="modal fixed inset-0 flex items-center justify-center overflow-auto bg-gray-900 bg-opacity-50"
        overlayClassName="overlay fixed inset-0 z-50"
      >
        <div className="modal-content bg-white w-11/12 md:max-w-md mx-auto rounded shadow-lg p-6">
          <h1 className="text-lg font-bold mb-4 text-gray-800">
            Crear producto
          </h1>
          <form className="space-y-4" onSubmit={onSubmitNew}>
            <div className="flex flex-col">
              <label htmlFor="nombre" className="mb-1 font-bold text-gray-700">
                Nombre
              </label>
              <input
                type="text"
                className="border rounded-md py-2 px-3 text-gray-800"
                placeholder="Nombre del producto"
                {...register("name")}
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="precio" className="mb-1 font-bold text-gray-700">
                Precio
              </label>
              <input
                type="number"
                className="border rounded-md py-2 px-3 text-gray-800"
                placeholder="Precio del producto"
                {...register("price")}
              />
            </div>
            <div className="flex flex-col">
              <label
                htmlFor="descripcion"
                className="mb-1 font-bold text-gray-700"
              >
                Descripción
              </label>
              <textarea
                className="border rounded-md py-2 px-3 text-gray-800 h-20 resize-none"
                placeholder="Descripción del producto"
                {...register("description")}
              ></textarea>
            </div>
            <div className="flex flex-col">
              <label htmlFor="stock" className="mb-1 font-bold text-gray-700">
                Stock
              </label>
              <input
                type="number"
                className="border rounded-md py-2 px-3 text-gray-800"
                placeholder="Cantidad en stock"
                {...register("stock")}
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="estado" className="mb-1 font-bold text-gray-700">
                Estado
              </label>
              <select
                className="border rounded-md py-2 px-3 text-gray-800"
                {...register("active")}
              >
                <option value={true}>Activo</option>
                <option value={false}>Desactivado</option>
              </select>
            </div>
            <div className="flex justify-end">
              <button
                onClick={closeNewModal}
                className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Cerrar
              </button>
              <button className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                crear
              </button>
              {/* Agrega aquí el botón para guardar los cambios */}
            </div>
          </form>
        </div>
      </Modal>
      <div className="bg-secondary-100 p-8 rounded-xl">
        <div className="hidden md:grid grid-cols-1 md:grid-cols-7 gap-4 mb-10 p-4">
          <h5>ID</h5>
          <h5>nombre</h5>
          <h5>descripcion</h5>
          <h5>precio</h5>
          <h5>stock</h5>
          <h5>estado</h5>
          <h5>acciones</h5>
        </div>
        {products.map((product) => (
          <div
            className="grid grid-cols-1 md:grid-cols-7 gap-4 items-center mb-4 bg-secondary-900 p-4 rounded-xl"
            key={product._id}
          >
            <div>
              <h5 className="md:hidden text-white font-bold mb-2">ID</h5>
              <span>{product._id.slice(0, 6) + "..."}</span>
            </div>
            <div>
              <h5 className="md:hidden text-white font-bold mb-2">Nombre</h5>
              <span>{product.name}</span>
            </div>
            <div>
              <h5 className="md:hidden text-white font-bold mb-2">
                Descripción
              </h5>
              <span>{product.description.slice(0, 20) + "..."}</span>
            </div>
            <div>
              <h5 className="md:hidden text-white font-bold mb-2">Precio</h5>
              <span>{"S/ " + product.price.$numberDecimal}</span>
            </div>
            <div>
              <h5 className="md:hidden text-white font-bold mb-2">Stock</h5>
              <span>{product.stock}</span>
            </div>
            <div>
              <h5 className="md:hidden text-white font-bold mb-2">Estado</h5>
              <span
                className={
                  product.active
                    ? "py-1 px-2 bg-green-500/10 text-green-500 rounded-lg"
                    : "py-1 px-2 bg-red-500/10 text-red-500 rounded-lg"
                }
              >
                {product.active ? "activo" : "desactivado"}
              </span>
            </div>
            <div>
              <h5 className="md:hidden text-white font-bold mb-2">Acciones</h5>
              <Menu
                menuButton={
                  <MenuButton className="flex items-center gap-x-2 bg-secondary-100 p-2 rounded-lg transition-colors">
                    Acciones
                  </MenuButton>
                }
                align="end"
                arrow
                arrowClassName="bg-secondary-100"
                transition
                menuClassName="bg-secondary-100 p-4"
              >
                <MenuItem className="p-0 hover:bg-transparent">
                  <button
                    onClick={openEditModal}
                    className="rounded-lg transition-colors text-gray-300 hover:bg-secondary-900 flex items-center gap-x-4 p-2 flex-1"
                  >
                    editar
                  </button>
                </MenuItem>

                <MenuItem className="p-0 hover:bg-transparent">
                  <button
                    className="rounded-lg transition-colors text-gray-300 hover:bg-secondary-900 flex items-center gap-x-4 p-2 flex-1"
                    onClick={() => {
                      deleteProduct(product._id);
                    }}
                  >
                    eliminar
                  </button>
                </MenuItem>
              </Menu>
            </div>
          </div>
        ))}

        <Modal
          isOpen={modalEditIsOpen}
          onRequestClose={closeEditModal}
          contentLabel="Editar Producto"
          className="modal fixed inset-0 flex items-center justify-center overflow-auto bg-gray-900 bg-opacity-50"
          overlayClassName="overlay fixed inset-0 z-50"
        >
          <div className="modal-content bg-white w-11/12 md:max-w-md mx-auto rounded shadow-lg p-6">
            <h1 className="text-lg font-bold mb-4 text-gray-800">
              Editar Producto
            </h1>
            <form className="space-y-4" onSubmit={onSubmitEdit}>
              <div className="flex flex-col">
                <label
                  htmlFor="nombre"
                  className="mb-1 font-bold text-gray-700"
                >
                  Nombre
                </label>
                <input
                  type="text"
                  className="border rounded-md py-2 px-3 text-gray-800"
                  placeholder="Nombre del producto"
                  {...register("name")}
                  value={productToEdit.name}
                />
              </div>
              <div className="flex flex-col">
                <label
                  htmlFor="precio"
                  className="mb-1 font-bold text-gray-700"
                >
                  Precio
                </label>
                <input
                  type="number"
                  className="border rounded-md py-2 px-3 text-gray-800"
                  placeholder="Precio del producto"
                  {...register("price")}
                  value={productToEdit.price} 
                  onChange={(e) =>
                    setProductToEdit({
                      ...productToEdit,
                      price: parseFloat(e.target.value), 
                    })
                  }
                />
              </div>
              <div className="flex flex-col">
                <label
                  htmlFor="descripcion"
                  className="mb-1 font-bold text-gray-700"
                >
                  Descripción
                </label>
                <textarea
                  className="border rounded-md py-2 px-3 text-gray-800 h-20 resize-none"
                  placeholder="Descripción del producto"
                  {...register("description")}
                  value={setProductToEdit.description}
                ></textarea>
              </div>
              <div className="flex flex-col">
                <label htmlFor="stock" className="mb-1 font-bold text-gray-700">
                  Stock
                </label>
                <input
                  type="number"
                  className="border rounded-md py-2 px-3 text-gray-800"
                  placeholder="Cantidad en stock"
                  {...register("stock")}
                  value={parseInt(productToEdit.stock)}
                  onChange={(e) =>
                    setProductToEdit({
                      ...productToEdit,
                      stock: parseInt(e.target.value), 
                    })
                  }
                />
              </div>
              <div className="flex flex-col">
                <label
                  htmlFor="estado"
                  className="mb-1 font-bold text-gray-700"
                >
                  Estado
                </label>
                <select
                  className="border rounded-md py-2 px-3 text-gray-800"
                  {...register("active")}
                  value={setProductToEdit.active === "true" ? true : false}
                >
                  <option value="true">activo</option>
                  <option value="false">desactivado</option>
                </select>
              </div>
              <div className="flex justify-end">
                <button
                  onClick={closeEditModal}
                  className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Cerrar
                </button>
                <button className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                  guardar
                </button>
                
              </div>
            </form>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default AdProducts;
