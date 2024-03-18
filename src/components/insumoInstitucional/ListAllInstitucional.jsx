import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { IoMdCreate, IoIosTrash } from "react-icons/io";

function ListAllInstitucional() {
  const api = useAxiosPrivate();
  const [insumoInstitucional, setInsumoInstitucional] = useState([]);

  useEffect(() => {
    const fetchInsumoInstitucional = async () => {
      try {
        const response = await api.get(`insumoInst`);
        setInsumoInstitucional(response.data);
      } catch (error) {
        console.error(
          "Error trayendo los insumos institucionales:",
          error.response?.data || error.message
        );
      }
    };
    fetchInsumoInstitucional();
  }, []);

  return (
    <div className="h-[50vh] p-4 md:p-8 bg-purple-300 rounded-lg shadow-lg ">
      <table className="w-full bg-white rounded-lg font-serif font-thin border-collapse overflow-hidden shadow text-left">
        <thead className="text-white bg-purple-600">
          <tr>
            <th className="p-2">ID</th>
            <th className="p-2">Nombre</th>
            <th className="p-2">Disponible</th>
            <th className="p-2">Cantidad</th>
            <th className="p-2 hidden md:table-cell">Descripción</th>
            <th className="p-2">Categoría</th>
            <th className="p-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {insumoInstitucional.map((insumo) => (
            <tr
              key={insumo.id}
              className="text-gray-700 border-b hover:bg-purple-100 text-left "
            >
              <td className="p-[15px]">{insumo.id}</td>
              <td className="p-[15px]">{insumo.nombreInsumoInst}</td>
              <td className="p-[15px]">
                {insumo.disponible ? "Disponible" : "No Disponible"}
              </td>
              <td className="p-[15px]">{insumo.cantidad}</td>
              <td className="p-[15px]">{insumo.descripcion}</td>
              <td className="p-[15px]">{insumo.cateInsumo.nombreCateInsumo}</td>
              <td className="flex items-center p-[15px]">
                <Link
                  to={`actualizar/${insumo.id}`}
                  className="mr-4 text-purple-500 hover:text-yellow-500"
                >
                  <IoMdCreate />
                </Link>
                <Link
                  to={`borrar/${insumo.id}`}
                  className="text-purple-500 hover:text-yellow-500"
                >
                  <IoIosTrash />
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ListAllInstitucional;
