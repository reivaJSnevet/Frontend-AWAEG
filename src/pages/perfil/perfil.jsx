import React, { useState } from 'react';
import Navbar from "../../components/perfil/Navbar.jsx";
import Prematricula from "../../components/perfil/Prematricula.jsx";
import { Outlet } from "react-router-dom";

function Perfil() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <div className="grid grid-cols-1 grid-rows-1 gap-4 p-4 md:grid-rows-1 md:grid-cols-12">
      {/* Parte superior del grid (Barra de navegación y Ventana modal) */}
      <div className="md:col-span-12 md:row-span-1">
        <Navbar />
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="p-8 bg-white rounded shadow-lg modal-container">
              <h2 className="mb-4 text-2xl">Prematrícula</h2>
              {/* Contenido de la ventana modal */}
              <Prematricula />
              {/* Botón para cerrar la ventana modal */}
              <button
                className="px-4 py-2 mt-4 text-xs font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
                onClick={toggleModal}
              >
                Cerrar
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Parte inferior del grid (Título y Contenido) */}
      <div className=" md:col-span-12 md:row-span-1">
        <h2 className="mb-4 text-2xl">Perfil de Estudiante</h2>
        {/* Outlet para las rutas hijas */}
        <Outlet />
      </div>
    </div>
  );
}

export default Perfil;
