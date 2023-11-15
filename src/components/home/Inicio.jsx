import React from "react";
import { Link } from "react-router-dom";

const Inicio = () => {
  return (
    <div
      name="inicio"
      className="flex flex-col justify-center items-center w-full h-screen p-4 bg-zinc-200"
    >
      <div className="grid md:grid-cols-2 max-w-[1240px] w-full">
        <div className="flex flex-col justify-center items-center px-2 py-8 md:items-start">
          <h1 className="text-6xl font-bold text-indigo-600 mb-4">¡Bienvenidos a Nuestro Sistema !</h1>
          <p className="text-xl text-gray-700 mb-6">
            Descubre un mundo de aprendizaje con AWAEG.
          </p>
          <Link to="/login">
            <button className="px-8 py-3 text-white bg-indigo-600 rounded-md hover:bg-indigo-700">
              Iniciar Sesión
            </button>
          </Link>
        </div>
  
        <div className="flex justify-center items-center">
          <img className="w-full max-w-sm md:max-w-full" src="/logo-removebg-preview.png" alt="Logo" />
        </div>
      </div>
    </div>
  );
  
};

export default Inicio;
