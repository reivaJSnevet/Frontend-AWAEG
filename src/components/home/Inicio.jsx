import React from "react";
import { Link } from "react-router-dom";

const Inicio = () => {
  return (
    <div
      name="inicio"
      className="flex flex-col justify-between w-full h-screen p-4 bg-zinc-200"
    >
      <div className="grid md:grid-cols-2 max-w-[1240px] m-auto">
        <div className="flex flex-col justify-center w-full px-2 py-8 md:items-start">
          <p className="text-2xl">Escuela Guayabal</p>
          <h1 className="py-3 text-5xl font-bold">Bienvenido</h1>
          <p className="text-2xl">AWAEG</p>
          <Link to="/login">
            <button
              className="px-8 py-3 mr-4 text-black bg-indigo-600 border-indigo-600 border-none rounded-md hover:text-white"
            >
              Iniciar Sesión
            </button>
          </Link>
        </div>

        <div>
          <img className="w-full" src="/logo-removebg-preview.png" alt="/" />
        </div>
      </div>
    </div>
  );
};

export default Inicio;
