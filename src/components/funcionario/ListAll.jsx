import { useState, useEffect } from "react";
import { IoMdCreate, IoIosTrash } from "react-icons/io";
import { Link } from "react-router-dom";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

const ListFuncionarios = () => {
  const api = useAxiosPrivate();
  const [funcionarios, setFuncionarios] = useState([]);

  useEffect(() => {
    // Realiza una solicitud GET para obtener todos los funcionarios
    api
      .get("/funcionarios")
      .then((response) => {
        // Actualiza el estado con los funcionarios obtenidos
        setFuncionarios(response.data);
      })
      .catch((error) => {
        console.error("Error al obtener los funcionarios:", error);
      });
  }, []);

  return (
    <div className="h-[60vh] p-8 overflow-y-auto bg-purple-500 rounded-lg shadow-lg">
      <table className="w-full bg-white rounded-lg">
        <thead className="text-white bg-purple-700">
          <tr>
            <th className="px-2">ID</th>
            <th className="py-2">Nombre</th>
            <th className="py-2">Primer Apellido</th>
            <th className="py-2">Segundo Apellido</th>
            <th className="py-2">Fecha ded Nacimiento</th>
            <th className="py-2">Edad</th>
            <th className="py-2">Género</th>
            <th className="py-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {funcionarios.map((funcionario) => (
            <tr key={funcionario.id} className="text-gray-700 border-b">
              <td className="px-4 py-2">{funcionario.id}</td>
              <td className="px-4 py-2">{funcionario.nombre}</td>
              <td className="px-4 py-2">{funcionario.apellido1}</td>
              <td className="px-4 py-2">{funcionario.apellido2}</td>
              <td className="px-4 py-2">{funcionario.fechaNacimiento}</td>
              <td className="px-4 py-2">{funcionario.edad}</td>
              <td className="px-4 py-2">
                {funcionario.sexo === false ? "Mujer" : "Hombre"}
              </td>
              <td className="flex items-center px-4 py-2">
                <Link
                  to={`actualizar/${funcionario.id}`}
                  className="mr-4 text-purple-500 hover:text-yellow-500"
                >
                  <IoMdCreate />
                </Link>
                <Link
                  to={`borrar/${funcionario.id}`}
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
    //       {funcionarios.map((funcionario) => (
    //         <tr key={funcionario.id} className="list-roles-tr">
    //           <td className="list-roles-td">{funcionario.id}</td>
    //           <td className="list-roles-td">{funcionario.nombre}</td>
    //           <td className="list-roles-td">{funcionario.apellido1}</td>
    //           <td className="list-roles-td">{funcionario.apellido2}</td>
    //           <td className="list-roles-td">{funcionario.fechaNacimiento}</td>
    //           <td className="list-roles-td">{funcionario.edad}</td>
    //           <td className="list-roles-td">{funcionario.sexo === false ? "Hombre" : "Mujer"}</td>
    //           <td className="list-roles-td">
    //             <Link to={`../actualizar/${funcionario.id}`}>Actualizar</Link>
    //             &nbsp;|&nbsp;
    //             <Link to={`../borrar/${funcionario.id}`}>Borrar</Link>
    //           </td>
    //         </tr>
    //       ))}
    //     </tbody>
    //   </table>
    // </div>
  );
};

export default ListFuncionarios;
