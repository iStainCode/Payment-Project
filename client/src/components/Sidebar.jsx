import React, { useState } from "react";
import { Link } from "react-router-dom";
// Icons
import {
  RiBarChart2Line,
  RiEarthLine,
  RiCustomerService2Line,
  RiCalendarTodoLine,
  RiLogoutCircleRLine,
  RiArrowRightSLine,
  RiMenu3Line,
  RiCloseLine,
  RiBox3Fill
} from "react-icons/ri";
import { TbCategoryFilled } from "react-icons/tb";

const Sidebar = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [showSubmenu, setShowSubmenu] = useState(false);
  return (
    <>
      <div
        className={`xl:h-[100vh] overflow-y-scroll fixed xl:static w-[80%] md:w-[40%] lg:w-[30%] xl:w-auto h-full top-0 bg-secondary-100 p-4 flex flex-col justify-between z-50 ${
          showMenu ? "left-0" : "-left-full"
        } transition-all`}
      >
        <div>
          <h1 className="text-center text-2xl font-bold text-white mb-10">
            Admin<span className="text-primary text-4xl">.</span>
          </h1>
          <ul>
            <li>
              <Link
                to="/dashboard"
                className="flex items-center gap-4 py-2 px-4 rounded-lg hover:bg-secondary-900 transition-colors"
              >
                <RiBarChart2Line className="text-primary" /> Panel principal
              </Link>
            </li>
            <li>
              <Link
                to="/dashboard/products"
                className="flex items-center gap-4 py-2 px-4 rounded-lg hover:bg-secondary-900 transition-colors"
              >
                <RiBox3Fill className="text-primary" /> Productos
              </Link>
            </li>
            <li>
              <Link
                to="/dashboard/categorys"
                className="flex items-center gap-4 py-2 px-4 rounded-lg hover:bg-secondary-900 transition-colors"
              >
                <TbCategoryFilled className="text-primary"/> Categorias
              </Link>
            </li>
            <li>
              <Link
                to="/dashboard/Users"
                className="flex items-center gap-4 py-2 px-4 rounded-lg hover:bg-secondary-900 transition-colors"
              >
                <RiCustomerService2Line className="text-primary" /> Usuarios
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <button
        onClick={() => setShowMenu(!showMenu)}
        className="xl:hidden fixed bottom-4 right-4 bg-primary text-black p-3 rounded-full z-50"
      >
        {showMenu ? <RiCloseLine /> : <RiMenu3Line />}
      </button>
    </>
  );
};

export default Sidebar;
