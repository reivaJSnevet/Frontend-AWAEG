import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useAxiosPrivate from "../../hooks/useAxiosPrivate.jsx";
import { convertirAFormato12Horas } from "../../services/conversores.js";
import { IoMdCreate, IoIosTrash } from "react-icons/io";

const ListAll = () => {
  const api = useAxiosPrivate();
  const [clases, setClases] = useState([]);

  useEffect(() => {
    const fetchClases = async () => {
      try {
        const response = await api.get("/clases");
        setClases(response.data);
      } catch (error) {
        console.error("Error fetching clases:", error);
      }
    };

    fetchClases();
  }, []);

  return (
    <div className="h-[60vh] p-8 overflow-y-auto bg-purple-500 rounded-lg shadow-lg">
      <table className="w-full bg-white rounded-lg">
        <thead className="text-white bg-purple-700">
          <tr>
            <th className="px-2">Id-Clase</th>
            <th className="py-2">Profesor</th>
            <th className="py-2">Materia</th>
            <th className="py-2">Día</th>
            <th className="py-2">Lección</th>
            <th className="py-2">Hora de Inicio</th>
            <th className="py-2">Hora de Salida</th>
            <th className="py-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {clases.map((clase) => (
            <tr key={clase.id} className="text-gray-700 border-b">
              <td className="px-4 py-2">{clase.id}</td>
              <td className="list-roles-td">
                {clase.funcionario.nombre +
                  " " +
                  clase.funcionario.apellido1 +
                  " " +
                  clase.funcionario.apellido2}
              </td>
              <td className="list-roles-td">{clase.materia.nombre}</td>
              <td className="list-roles-td">{clase.dia}</td>
              <td className="list-roles-td">{clase.leccion}</td>
              <td className="list-roles-td">
                {convertirAFormato12Horas(clase.horaInicio)}
              </td>
              <td className="list-roles-td">
                {convertirAFormato12Horas(clase.horaSalida)}
              </td>
              <td className="flex items-center px-4 py-2">
                <Link
                  to={`actualizar/${clase.id}`}
                  className="mr-4 text-purple-500 hover:text-yellow-500"
                >
                  <IoMdCreate />
                </Link>
                <Link
                  to={`borrar/${clase.id}`}
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

    // <div>
    //   <table className="list-roles-table">
    //     <thead>
    //       <tr className="list-roles-tr">
    //         <th className="roles-th">ID-Clase</th>
    //         <th className="roles-th">Profesor</th>
    //         <th className="roles-th">Materia</th>
    //         <th className="roles-th">Día</th>
    //         <th className="roles-th">Lección</th>
    //         <th className="roles-th">Hora de Inicio</th>
    //         <th className="roles-th">Hora de Salida</th>
    //         <th className="roles-th">Acciones</th>
    //       </tr>
    //     </thead>
    //     <tbody>
    //       {clases.map((clase) => (
    //         <tr key={clase.id} className="list-roles-tr">
    //           <td className="list-roles-td">{clase.id}</td>
    //           <td className="list-roles-td">{clase.funcionario.nombre + " " + clase.funcionario.apellido1 + " " + clase.funcionario.apellido2}</td>
    //           <td className="list-roles-td">{clase.materia.nombre}</td>
    //           <td className="list-roles-td">{clase.dia}</td>
    //           <td className="list-roles-td">{clase.leccion}</td>
    //           <td className="list-roles-td">{convertirAFormato12Horas(clase.horaInicio)}</td>
    //           <td className="list-roles-td">{convertirAFormato12Horas(clase.horaSalida)}</td>
    //           <td className="list-roles-td">
    //             <Link to={`../actualizar/${clase.id}`}>Actualizar</Link>
    //             &nbsp;|&nbsp;
    //             <Link to={`../borrar/${clase.id}`}>Borrar</Link>
    //           </td>
    //         </tr>
    //       ))}
    //     </tbody>
    //   </table>
    // </div>
  );
};

export default ListAll;
