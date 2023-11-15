import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { IoMdCreate, IoIosTrash } from "react-icons/io";

const ListRoles = () => {
  const [roles, setRoles] = useState([]);
  const api = useAxiosPrivate();

  useEffect(() => {
    try {
      const fetchRoles = async () => {
        const response = await api.get("/roles");
        setRoles(response.data);
      };
      fetchRoles();
    } catch (error) {
      //hay que agregar un manejo de errores
      console.log(error);
    }
  }, []);

  return (
    <div className="h-[50vh] p-4 md:p-8 bg-purple-300 rounded-lg shadow-lg ">
      <div className="overflow-x-auto">
        <table className="w-full bg-white rounded-lg font-serif font-thin border-collapse overflow-hidden shadow text-left">
          <thead className="text-white bg-purple-600">
            <tr>
              <th className="p-2">ID</th>
              <th className="p-2">Nombre</th>
              <th className="p-2">Nivel de Privilegio</th>
              <th className="p-2 hidden md:table-cell">Descripción</th>
              <th className="p-2">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {roles.map((rol) => (
              <tr key={rol.id} className="text-gray-700 border-b hover:bg-purple-100 text-left ">
                <td className="p-[15px]">{rol.id}</td>
                <td className="p-[15px]">{rol.nombre}</td>
                <td className="p-[15px]">{rol.nivelPrivilegio}</td>
                <td className="p-[15px] hidden md:table-cell">
                  {rol.descripcion}
                </td>
                <td className="flex items-center p-[15px]">
                  <Link
                    to={`actualizar/${rol.id}`}
                    className="mr-4 text-purple-500 hover:text-yellow-500"
                  >
                    <IoMdCreate />
                  </Link>
                  <Link
                    to={`borrar/${rol.id}`}
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
    </div>
  );
};

export default ListRoles;
