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
    <div className="p-8 bg-purple-500 rounded-lg shadow-lg">
      <div className="overflow-x-auto">
        <table className="w-full bg-white rounded-lg">
          <thead className="text-white bg-purple-700">
            <tr>
              <th className="py-2">ID</th>
              <th className="py-2">Nombre</th>
              <th className="py-2">Nivel de Privilegio</th>
              <th className="py-2">Descripción</th>
              <th className="py-2">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {roles.map((rol) => (
              <tr key={rol.id} className="text-gray-700 border-b">
                <td className="px-4 py-2">{rol.id}</td>
                <td className="px-4 py-2">{rol.nombre}</td>
                <td className="px-4 py-2">{rol.nivelPrivilegio}</td>
                <td className="px-4 py-2">{rol.descripcion}</td>
                <td className="flex items-center px-4 py-2">
                  <Link to={`actualizar/${rol.id}`} className="mr-4 text-purple-500 hover:text-yellow-500">
                    <IoMdCreate />
                  </Link>
                  <Link to={`borrar/${rol.id}`} className="text-purple-500 hover:text-yellow-500">
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
