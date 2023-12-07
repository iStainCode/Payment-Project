import React from "react";
import { useEffect } from "react";
import { useCategorys } from "../context/CategoryContext";

const FilterSelect = ({ onChange }) => {
  const handleFilterChange = (e) => {
    onChange(e.target.value); // Llama a la función onChange con el valor seleccionado
  };

  const { getCategorys, categorys } = useCategorys();

  useEffect(() => {
    getCategorys();
  }, []);
  return (
    <div className="mt-4">
      <select
        onChange={handleFilterChange}
        className="block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-black"
      >
        <option value="All">Todos</option>
        {categorys.map((category) => (
          <option key={category._id} value={category.category}>
            {category.category}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FilterSelect;
