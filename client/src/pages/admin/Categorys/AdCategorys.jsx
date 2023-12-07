import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, MenuItem, MenuButton } from "@szhsin/react-menu";
import "@szhsin/react-menu/dist/index.css";
import "@szhsin/react-menu/dist/transitions/slide.css";
import { useCategorys } from "../../../context/CategoryContext";

const AdCategorys = () => {
  const { getCategorys, categorys } = useCategorys();

  useEffect(() => {
    getCategorys();
  }, []);
  return (
    <div>
      <div className="flex items-center justify-between mb-10">
        <h1 className="text-4xl text-white">Categorias</h1>
      </div>
      <Link to="/dashboard/newCategory">
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
        <div className="hidden md:grid grid-cols-1 md:grid-cols-3 gap-4 mb-10 p-4">
          <h5>ID</h5>
          <h5>categoria</h5>
          <h5>acciones</h5>
        </div>
        {console.log(categorys)}
        {Array.isArray(categorys) && categorys.map((category) => (
          <div
            className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center mb-4 bg-secondary-900 p-4 rounded-xl"
            key={category._id}
          >
            <div>
              <h5 className="md:hidden text-white font-bold mb-2">ID</h5>
              <span>{category._id.slice(0, 6) + "..."}</span>
            </div>
            <div>
              <h5 className="md:hidden text-white font-bold mb-2">Categoria</h5>
              <span>{category.category}</span>
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

export default AdCategorys;
