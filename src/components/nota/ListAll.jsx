import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { IoMdCreate, IoIosTrash } from "react-icons/io";

const ListNotas = () => {
  const api = useAxiosPrivate();
  const [notas, setNotas] = useState([]);

  useEffect(() => {
    api
      .get("/notas")
      .then((response) => {
        setNotas(response.data);
      })
      .catch((error) => {
        console.error("Error fetching roles:", error);
      });
  }, []);

  return (
    <div className="h-[60vh] p-8 overflow-y-auto bg-purple-500 rounded-lg shadow-lg">
      <table className="w-full bg-white rounded-lg">
        <thead className="text-white bg-purple-700">
          <tr>
            <th className="px-2">Id</th>
            <th className="py-2">Calificacion</th>
            <th className="py-2">Periodo</th>
            <th className="py-2">Fecha de Subida</th>
            <th className="py-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {notas.map((nota) => (
            <tr key={nota.id} className="text-gray-700 border-b">
              <td className="list-roles-td">{nota.id}</td>
              <td className="list-roles-td">{nota.calificacion}</td>
              <td className="list-roles-td">{nota.periodo}</td>
              <td className="list-roles-td">{nota.fechaSubida}</td>
              <td className="flex items-center px-4 py-2">
                <Link
                  to={`actualizar/${nota.id}`}
                  className="mr-4 text-purple-500 hover:text-yellow-500"
                >
                  <IoMdCreate />
                </Link>
                <Link
                  to={`borrar/${nota.id}`}
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
};

export default ListNotas;
