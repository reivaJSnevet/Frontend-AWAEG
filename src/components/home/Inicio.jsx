import React from "react";
import { Link } from "react-router-dom";

const Inicio = () => {
  return (
    <div
      name="inicio"
      className="w-full h-screen bg-zinc-200 flex flex-col justify-between p-4"
    >
      <div className="grid md:grid-cols-2 max-w-[1240px] m-auto">
        <div className="flex flex-col justify-center md:items-start w-full px-2 py-8">
          <p className="text-2xl">Escuela Guayabal</p>
          <h1 className="py-3 text-5xl font-bold">Bienvenido</h1>
          <p className="text-2xl">AWAEG</p>
          <Link to="/login">
            <button
              className="text-black border-none bg-indigo-600 mr-4 px-8 py-3 border-indigo-600 
                 hover:text-white rounded-md"
            >
              Iniciar Seción
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
