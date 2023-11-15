import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { IoMdCreate, IoIosTrash } from "react-icons/io";

const ListHorarios = () => {
  const api = useAxiosPrivate();
  const [horarios, setHorarios] = useState([]);

  useEffect(() => {
    api
      .get("/horarios")
      .then((response) => {
        setHorarios(response.data);
      })
      .catch((error) => {
        console.error("Error fetching horarios:", error);
      });
  }, []);

  return (
    <div className="h-[60vh] p-4 overflow-y-auto bg-purple-300 rounded-lg shadow-lg">
      <table className="w-full bg-white rounded-lg font-serif font-thin border-collapse overflow-hidden shadow text-left">
        <thead className="text-white bg-purple-600">
          <tr>
            <th className="p-2">ID</th>
            <th className="p-2">Horario Provisional</th>
            <th className="p-2">Estado del horario</th>
            <th className="p-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {horarios.map((horario) => (
            <tr key={horario.id} className="text-gray-700 border-b hover:bg-purple-100 text-left">
              <td className="p-[15px]">{horario.id}</td>
              <td className="list-roles-td">
                {horario.provisional === false ? "No" : "Sí"}
              </td>
              <td className="list-roles-td">
                {horario.habilitado === false ? "Deshabilitado" : "Habilitado"}
              </td>

              <td className="flex items-center p-[15px]">
                <Link
                  to={`actualizar/${horario.id}`}
                  className="mr-4 text-purple-500 hover:text-yellow-500"
                >
                  <IoMdCreate />
                </Link>
                <Link
                  to={`borrar/${horario.id}`}
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
    //         <th className="roles-th">ID</th>
    //         <th className="roles-th">Horario Provisional</th>
    //         <th className="roles-th">Estado del Horarios</th>
    //         <th className="roles-th">Acciones</th>
    //       </tr>
    //     </thead>
    //     <tbody>
    //       {horarios.map((horario) => (
    //         <tr key={horario.id} className="list-roles-tr">
    //           <td className="list-roles-td">{horario.id}</td>
    //           <td className="list-roles-td">{horario.provisional === false ? 'No' : 'Sí'}</td>
    //           <td className="list-roles-td">{horario.habilitado === false ? 'Deshabilitado' : 'Habilitado'}</td>
    //           <td className="list-roles-td">
    //             <Link to={`../actualizar/${horario.id}`}>Actualizar</Link>
    //             &nbsp;|&nbsp;
    //             <Link to={`../borrar/${horario.id}`}>Borrar</Link>
    //           </td>
    //         </tr>
    //       ))}
    //     </tbody>
    //   </table>
    // </div>
  );
};

export default ListHorarios;
