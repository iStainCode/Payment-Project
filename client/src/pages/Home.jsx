import React from "react";
import { useState, useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import CardProduct from "../components/CardProduct";
import { useProducts } from "../context/ProductContext";
import { Link } from "react-router-dom";
import FilterSelect from "../components/FilterSelect";
import { createPaymentRequest } from "../api/payment";

function Home() {
  const [show, setShow] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref);

  const { getProducts, products } = useProducts();

  const [cart, setCart] = useState([]);

  const handleAddToCart = (product) => {
    const { name, price } = product;
    const newCartItem = { name, price };
    setCart((prevCart) => {
      return [...prevCart, newCartItem];
    });
  };

  useEffect(() => {
    console.log(cart);
  }, [cart]);

  const handleFilterChange = (selectedCategory) => {
    setFilters({
      ...filters,
      category: selectedCategory,
    });
  };

  const [filters, setFilters] = useState({
    category: "All",
  });

  const filterProducts = (products) => {
    if (filters.category === "All") {
      return products; // Devuelve todos los productos si la categoría es 'All'
    } else {
      return products.filter(
        (product) => product.category === filters.category
      );
    }
  };

  useEffect(() => {
    getProducts();
  }, []);
  const filteredProducts = filterProducts(products);

  async function comprar (){
    try {
      console.log(cart)
      const res = await createPaymentRequest(cart)
      console.log(res)
    } catch (error) {
      console.log(
        error
      )
    }
  }
  return (
    <>
      <div
        className="bg-gray-100 pb-12 overflow-y-hidden"
        style={{ minHeight: 700 }}
      >
        {/* Code block starts */}
        <dh-component>
          <nav className="w-full border-b">
            <div className="py-5 md:py-0 container mx-auto px-6 flex items-center justify-between">
              <div aria-label="Home.logo" role="img">
                <img
                  width="100"
                  src="../robot.png"
                  alt="logo"
                />
              </div>
              <div>
                <button
                  onClick={() => setShow(!show)}
                  className={`${
                    show ? "hidden" : ""
                  } sm:block md:hidden text-gray-500 hover:text-gray-700 focus:text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500`}
                >
                  <svg
                    aria-haspopup="true"
                    aria-label="open Main Menu"
                    xmlns="http://www.w3.org/2000/svg"
                    className="md:hidden icon icon-tabler icon-tabler-menu"
                    width={24}
                    height={24}
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="#2c3e50"
                    fill="none"
                    strokeLinecap="round"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" />
                    <line x1={4} y1={8} x2={20} y2={8} />
                    <line x1={4} y1={16} x2={20} y2={16} />
                  </svg>
                </button>
                <div
                  id="menu"
                  className={` ${show ? "" : "hidden"} md:block lg:block `}
                >
                  <button
                    onClick={() => setShow(!show)}
                    className={`block md:hidden lg:hidden text-gray-500 hover:text-gray-700 focus:text-gray-700 fixed focus:outline-none focus:ring-2 focus:ring-gray-500 z-30 top-0 mt-6`}
                  >
                    <svg
                      aria-label="close main menu"
                      xmlns="http://www.w3.org/2000/svg"
                      width={24}
                      height={24}
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="#2c3e50"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path stroke="none" d="M0 0h24v24H0z" />
                      <line x1={18} y1={6} x2={6} y2={18} />
                      <line x1={6} y1={6} x2={18} y2={18} />
                    </svg>
                  </button>
                  
                </div>
              </div>
              <button className="focus:outline-none lg:text-lg lg:font-bold focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 hidden md:block bg-transparent transition duration-150 ease-in-out hover:bg-gray-200 rounded border border-indigo-700 text-indigo-700 px-4 sm:px-8 py-1 sm:py-3 text-sm">
                  🛒
              </button>
              
              <Link
                to="/login"
                className="focus:outline-none lg:text-lg lg:font-bold focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 hidden md:block bg-transparent transition duration-150 ease-in-out hover:bg-gray-200 rounded border border-indigo-700 text-indigo-700 px-4 sm:px-8 py-1 sm:py-3 text-sm"
              >
                Ingresar
              </Link>
            </div>
          </nav>
        </dh-component>
        {/* Code block ends */}
      
        <button className="focus:outline-none lg:text-lg lg:font-bold focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 hidden md:block bg-transparent transition duration-150 ease-in-out hover:bg-gray-200 rounded border border-indigo-700 text-indigo-700 px-4 sm:px-8 py-1 sm:py-3 text-sm" onClick={comprar}>
        Pagar
        </button>
      <FilterSelect onChange={handleFilterChange} />
      <section
        id="Projects"
        className="w-fit mx-auto grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 justify-items-center justify-center gap-y-20 gap-x-14 mt-10 mb-5"
      >
        {console.log(products)}
        {filteredProducts.map((product) => (
          <CardProduct
            key={product._id}
            name={product.name.slice(0, 20) + "..."}
            price={parseFloat(product.price.$numberDecimal)}
            image1={product.image1}
            image2={product.image2}
            onAddToCart={() => handleAddToCart(product)}
          />
        ))}
      </section>
      <section className="fixed bg-black p-6  mx-36">
                {cart.map((product) => (
                  <span>{product.name}</span>
                ))}
              </section>
      </div>
    </>
    
  );
}

export default Home;
