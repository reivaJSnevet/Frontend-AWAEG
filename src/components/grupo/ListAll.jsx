import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { IoMdCreate, IoIosTrash } from "react-icons/io";

const ListGrupos = () => {
  const api = useAxiosPrivate();
  const [grupos, setGrupos] = useState([]);
  const [grupoSeleccionado, setGrupoSeleccionado] = useState(null);

  const mostrarEstudiantes = (grupo) => {
    // Actualiza el estado del grupo seleccionado al hacer clic en el botón "Detalle"
    setGrupoSeleccionado(grupo);
  };


  useEffect(() => {
    // Realiza una solicitud GET para obtener todos los grupos
    api
      .get("/grupos")
      .then((response) => {
        // Actualiza el estado con los grupos obtenidos
        setGrupos(response.data);
      })
      .catch((error) => {
        console.error("Error al obtener los grupos:", error);
      });
  }, []); // El [] como segundo argumento asegura que este efecto se ejecute solo una vez al montar el componente

  return (
    <div className="relative h-[60vh] p-4 overflow-y-auto bg-purple-300 rounded-lg shadow-lg">
      <table className="w-full bg-white rounded-lg font-serif font-thin border-collapse overflow-hidden shadow text-left">
        <thead className="text-white bg-purple-600">
          <tr>
            <th className="p-2">Seccion</th>
            <th className="p-2">Ciclo</th>
            <th className="p-2">Grado</th>
            <th className="p-2">Aula</th>
            <th className="p-2">Cantidad de Estudiantes</th>
            <th className="p-2">Turno</th>
            <th className="p-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {grupos.map((grupo) => (
            <tr key={grupo.seccion} className="text-gray-700 border-b hover:bg-purple-100 text-left ">
              <td className="p-[15px]">{grupo.seccion}</td>
              <td className="p-[15px]">{grupo.ciclo}</td>
              <td className="p-[15px]">{grupo.grado}</td>
              <td className="p-[15px]">{grupo.aula}</td>
              <td className="p-[15px]">{grupo.cantAlumno}</td>
              <td className="p-[15px]">
                {grupo.turno === false ? 'Mañana' : 'Tarde'}
              </td>
              <td className="flex items-center p-[15px]">
                <Link
                  to={`actualizar/${grupo.seccion}`}
                  className="mr-4 text-purple-500 hover:text-yellow-500"
                >
                  <IoMdCreate />
                </Link>
                <Link
                  to={`borrar/${grupo.seccion}`}
                  className="mr-4 text-purple-500 hover:text-yellow-500"
                >
                  <IoIosTrash />
                </Link>
                <button
                  onClick={() => mostrarEstudiantes(grupo)}
                  className="text-blue-500 underline cursor-pointer"
                >
                  Detalle
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Mostrar detalles del grupo seleccionado */}
      {grupoSeleccionado && (
        <div className="mt-2">
          <h2 className="font-semibold">Detalles del Grupo</h2>
          <p>
            Funcionario: {grupoSeleccionado.funcionario.nombre}{' '}
            {grupoSeleccionado.funcionario.apellido1}
          </p>
          <h3 className="font-semibold">Estudiantes del Grupo:</h3>
          <ul>
            {grupoSeleccionado.estudiantes.map((estudiante) => (
              <li key={estudiante.id}>
                {estudiante.nombre} {estudiante.apellido1}{' '}
                {estudiante.apellido2}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ListGrupos;