import { useState } from "react";
import Navbar from "../../components/perfil/Navbar.jsx";
import Prematricula from "../../components/perfil/Prematricula.jsx";
import { Outlet } from "react-router-dom";

function Perfil() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <div
      className=""
      style={{ backgroundImage: "url(/layered-waves-3.png)", backgroundSize: "cover", backgroundRepeat: "no-repeat", backgroundPosition: "center", minHeight: "100vh", minWidth: "100vw", overflow: "hidden", position: "relative"}}
    >
      <div className="grid grid-cols-1 grid-rows-1 gap-4 p-4 md:grid-rows-1 md:grid-cols-12">
        {/* Parte superior del grid (Barra de navegación y Ventana modal) */}
        <div className="md:col-span-12 md:row-span-1">
          <Navbar />
          <button
          type="button"
            className="px-4 py-2 mt-4 text-xs font-bold text-black bg-yellow-500 rounded hover:bg-yellow-700"
            onClick={toggleModal}
          >
            Prematricular
          </button>
          {isModalOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
              <div className="p-8 bg-white rounded shadow-lg modal-container">
                <Prematricula />
                <div className="flex justify-end ">
                  <button
                    className="px-4 py-2 mt-4 text-xs font-bold text-black bg-yellow-500 rounded hover:bg-yellow-700"
                    onClick={toggleModal}
                  >
                    Cerrar
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Parte inferior del grid (Título y Contenido) */}
        <div className="p-4 mx-auto text-white bg-purple-600 rounded-lg shadow-lg md:col-span-12 md:row-span-1">
          <h2 className="mb-4 text-2xl ">Perfil de Estudiante</h2>
          {/* Outlet para las rutas hijas */}
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Perfil;
