import React, { useState } from "react";
import { GrMenu, GrClose } from "react-icons/gr";
import { Link } from "react-router-dom";

const NavbarH = () => {
  const [nav, setNav] = useState(false);
  const handleClick = () => {
    setNav(!nav);
  };

  return (
    <div className="w-screen h-[80px] z-10" style={{ backgroundColor: "#1e1b4b", color: "white" }}>
    <div className="flex items-center justify-between w-full h-full px-2">
        <div className="flex items-center">
          <h1 className="mr-4 text-3xl font-bold sm:text-4xl">AWAEG</h1>
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

        <div className="hidden pr-4 md:flex">
  <Link to="/login">
    <button
      className="px-8 py-3 mr-4 text-white bg-transparent border-indigo-600 border-none rounded-md hover:bg-indigo-600 hover:text-white"
    >
      Iniciar Sesión
    </button>
  </Link>
</div>

        <div className="mr-4 md:hidden" onClick={handleClick}>
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
              className="px-8 py-3 text-black bg-indigo-500 border-indigo-600 border-none rounded-md hover:bg-indigo-600 hover:text-white"
            >
              Iniciar Sesión
            </button>
          </Link>
        </div>
      </ul>
    </div>
  );
};

export default NavbarH;
