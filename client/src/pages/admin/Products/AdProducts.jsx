import { useEffect } from "react";
import { Link } from "react-router-dom";
import { RiArrowLeftSLine, RiArrowRightSLine } from "react-icons/ri";
import { Menu, MenuItem, MenuButton } from "@szhsin/react-menu";
import "@szhsin/react-menu/dist/index.css";
import "@szhsin/react-menu/dist/transitions/slide.css";
import { useProducts } from "../../../context/ProductContext";

const AdProducts = () => {
  const { getProducts, products } = useProducts();

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div>
      <div className="flex items-center justify-between mb-10">
        <h1 className="text-4xl text-white">Productos</h1>
        <div className="flex items-center gap-2 text-3xl">
          <RiArrowLeftSLine className="hover:cursor-pointer hover:text-white transition-colors" />
          <RiArrowRightSLine className="hover:cursor-pointer hover:text-white transition-colors" />
        </div>
      </div>
      <Link to="/dashboard/NewProduct">
        <button
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
      </Link>
      <div></div>
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
        {console.log(products)}
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
                  <button className="rounded-lg transition-colors text-gray-300 hover:bg-secondary-900 flex items-center gap-x-4 p-2 flex-1">
                    editar
                  </button>
                </MenuItem>

                <MenuItem className="p-0 hover:bg-transparent">
                  <button className="rounded-lg transition-colors text-gray-300 hover:bg-secondary-900 flex items-center gap-x-4 p-2 flex-1">
                    eliminar
                  </button>
                </MenuItem>
              </Menu>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdProducts;
