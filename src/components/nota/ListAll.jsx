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
    <div className="h-[60vh] p-4 overflow-y-auto bg-purple-300 rounded-lg shadow-lg">
      <table className="w-full bg-white rounded-lg font-serif font-thin border-collapse overflow-hidden shadow text-left">
        <thead className="text-white bg-purple-600">
          <tr>
            <th className="p-2">Id</th>
            <th className="p-2">Calificacion</th>
            <th className="p-2">Periodo</th>
            <th className="p-2">Fecha de Subida</th>
            <th className="p-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {notas.map((nota) => (
            <tr key={nota.id} className="text-gray-700 border-b hover:bg-purple-100 text-left">
              <td className="p-[15px]">{nota.id}</td>
              <td className="p-[15px]">{nota.calificacion}</td>
              <td className="p-[15px]">{nota.periodo}</td>
              <td className="p-[15px]">{nota.fechaSubida}</td>
              <td className="flex items-center p-[15px]">
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
