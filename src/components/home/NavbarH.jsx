import React, { useState } from "react";
import { GrMenu, GrClose } from "react-icons/gr";
import { Link } from "react-router-dom";

const NavbarH = () => {
  const [nav, setNav] = useState(false);
  const handleClick = () => {
    setNav(!nav);
  };

  return (
    <div className="w-screen h-[80px] z-10 bg-purple-400 fixed drop-shadow-lg">
      <div className="px-2 flex justify-between items-center w-full h-full">
        <div className="flex items-center">
          <h1 className="text-3xl font-bold mr-4 sm:text-4xl">AWAEG</h1>
          <ul className="hidden md:flex">
            <li className="p-4 duration-500">
              <Link to="/inicio">Inicio</Link>
            </li>
            <li className="p-4 duration-500">
              <Link to="/sobre">Sobre Nosotros</Link>
            </li>
            <li className="p-4 duration-500">
              <Link to="/informacion">Información</Link>
            </li>
            <li className="p-4 duration-500">
              <Link to="/ubicacion">Ubicación</Link>
            </li>
          </ul>
        </div>

        <div className="hidden md:flex pr-4">
          <Link to="/login">
            <button
              className="text-black border-none bg-transparent mr-4 px-8 py-3 border-indigo-600 
                hover:bg-indigo-600 hover:text-white rounded-md"
            >
              Iniciar Seción
            </button>
          </Link>
        </div>

        <div className="md:hidden mr-4" onClick={handleClick}>
          {nav ? <GrClose className="w-5" /> : <GrMenu className="w-5" />}
        </div>
      </div>

      <ul className={!nav ? "hidden" : "absolute bg-purple-400 w-full px-8"}>
        <li className="p-4 duration-500">
          <Link to="inicio">Inicio</Link>
        </li>
        <li className="p-4 duration-500">
          <Link to="sobre">Sobre Nosotros</Link>
        </li>
        <li className="p-4 duration-500">
          <Link to="informacion">Información</Link>
        </li>
        <li className="p-4 duration-500">
          <Link to="ubicacion">Ubicación</Link>
        </li>
        <div className="flex flex-col my-4">
          <Link to="/login">
            <button
              className="text-black border-none bg-indigo-500  px-8 py-3
             border-indigo-600 
                hover:bg-indigo-600  hover:text-white rounded-md"
            >
              Iniciar Seción
            </button>
          </Link>
        </div>
      </ul>
    </div>
  );
};

export default NavbarH;
