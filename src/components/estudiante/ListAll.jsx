import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { IoMdCreate, IoIosTrash } from "react-icons/io";

const ListEstudiantes = () => {
  const api = useAxiosPrivate();
  const [estudiantes, setEstudiantes] = useState([]);

  useEffect(() => {
    // Realiza una solicitud GET para obtener todos los estudiantes
    api
      .get("/estudiantes")
      .then((response) => {
        // Actualiza el estado con los estudiantes obtenidos
        setEstudiantes(response.data);
      })
      .catch((error) => {
        console.error("Error al obtener los estudiantes:", error);
      });
  }, []); // El [] como segundo argumento asegura que este efecto se ejecute solo una vez al montar el componente

  return (
    <div className="h-[60vh] p-8 overflow-y-auto bg-purple-500 rounded-lg shadow-lg">
      <table className="w-full bg-white rounded-lg">
        <thead className="text-white bg-purple-700">
          <tr>
            <th className="px-2">ID</th>
            <th className="py-2">Nombre</th>
            <th className="py-2">Primer Apellido</th>
            <th className="py-2">Segundo Apellido</th>
            <th className="py-2">Fecha de Nacimiento</th>
            <th className="py-2">Edad</th>
            <th className="py-2">Género</th>
            <th className="py-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {estudiantes.map((estudiante) => (
            <tr key={estudiante.id} className="text-gray-700 border-b">
              <td className="px-4 py-2">{estudiante.id}</td>
              <td className="px-4 py-2">{estudiante.nombre}</td>
              <td className="px-4 py-2">{estudiante.apellido1}</td>
              <td className="px-4 py-2">{estudiante.apellido2}</td>
              <td className="px-4 py-2">{estudiante.fechaNacimiento}</td>
              <td className="px-4 py-2">{estudiante.edad}</td>
              <td className="px-4 py-2">
                {estudiante.sexo === false ? "Mujer" : "Hombre"}
              </td>
              <td className="flex items-center px-4 py-2">
                <Link
                  to={`actualizar/${estudiante.id}`}
                  className="mr-4 text-purple-500 hover:text-yellow-500"
                >
                  <IoMdCreate />
                </Link>
                <Link
                  to={`borrar/${estudiante.id}`}
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

    //   <div>
    //   <table className="list-roles-table">
    //     <thead>
    //       <tr className="list-roles-tr">
    //         <th className="roles-th">ID</th>
    //         <th className="roles-th">Nombre</th>
    //         <th className="roles-th">Primer Apellido</th>
    //         <th className="roles-th">Segundo Apellido</th>
    //         <th className="roles-th">Fecha de Nacimiento</th>
    //         <th className="roles-th">Edad</th>
    //         <th className="roles-th">Género</th>
    //         <th className="roles-th">Acciones</th>
    //       </tr>
    //     </thead>
    //     <tbody>
    //       {estudiantes.map((estudiante) => (
    //         <tr key={estudiante.id} className="list-roles-tr">
    //           <td className="list-roles-td">{estudiante.id}</td>
    //           <td className="list-roles-td">{estudiante.nombre}</td>
    //           <td className="list-roles-td">{estudiante.apellido1}</td>
    //           <td className="list-roles-td">{estudiante.apellido2}</td>
    //           <td className="list-roles-td">{estudiante.fechaNacimiento}</td>
    //           <td className="list-roles-td">{estudiante.edad}</td>
    //           <td className="list-roles-td">{estudiante.sexo === false ? "Hombre" : "Mujer"}</td>
    //           <td className="list-roles-td">
    //             <Link to={`../actualizar/${estudiante.id}`}>Actualizar</Link>
    //             &nbsp;|&nbsp;
    //             <Link to={`../borrar/${estudiante.id}`}>Borrar</Link>
    //           </td>
    //         </tr>
    //       ))}
    //     </tbody>
    //   </table>
    // </div>
  );
};

export default ListEstudiantes;
