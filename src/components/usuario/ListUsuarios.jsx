import { useEffect, useState } from "react";
import { IoMdCreate, IoIosTrash } from "react-icons/io";
import { Link } from "react-router-dom";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

const ListUsuarios = () => {
  const api = useAxiosPrivate();
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    // Realiza una solicitud GET para obtener todos los usuarios
    api.get("/usuarios")
      .then((response) => {
        // Actualiza el estado con los usuarios obtenidos
        setUsuarios(response.data);
      })
      .catch((error) => {
        console.error("Error al obtener los usuarios:", error);
      });
  }, []); // El [] como segundo argumento asegura que este efecto se ejecute solo una vez al montar el componente

  return (
    <div className="max-h-screen p-8 overflow-y-auto bg-purple-500 rounded-lg shadow-lg">
      <table className="w-full bg-white rounded-lg">
        <thead className="text-white bg-purple-700">
          <tr>
            <th className="py-2">Nombre</th>
            <th className="py-2">Correo</th>
            <th className="py-2">Rol</th>
            <th className="py-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map((usuario) => (
            <tr key={usuario.id} className="text-gray-700 border-b">
              <td className="px-4 py-2">{usuario.nombre}</td>
              <td className="px-4 py-2">{usuario.correo}</td>
              <td className="px-4 py-2">{usuario.role.nombre}</td>
              <td className="flex items-center px-4 py-2">
                <Link
                  to={`actualizar/${usuario.id}`}
                  className="mr-4 text-purple-500 hover:text-yellow-500"
                >
                  <IoMdCreate />
                </Link>
                <Link to={`borrar/${usuario.id}`} className="text-purple-500 hover:text-yellow-500">
                  <IoIosTrash />
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListUsuarios;
