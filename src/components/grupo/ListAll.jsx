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
    <div className="h-[60vh] p-8 overflow-y-auto bg-purple-500 rounded-lg shadow-lg">
      <table className="w-full bg-white rounded-lg">
        <thead className="text-white bg-purple-700">
          <tr>
            <th className="px-2">Seccion</th>
            <th className="py-2">Ciclo</th>
            <th className="py-2">Grado</th>
            <th className="py-2">Aula</th>
            <th className="py-2">Cantidad de Estudiantes</th>
            <th className="py-2">Turno</th>
            <th className="py-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {grupos.map((grupo) => (
            <tr key={grupo.seccion} className="text-gray-700 border-b">
              <td className="px-4 py-2">{grupo.seccion}</td>
              <td className="px-4 py-2">{grupo.ciclo}</td>
              <td className="px-4 py-2">{grupo.grado}</td>
              <td className="px-4 py-2">{grupo.aula}</td>
              <td className="px-4 py-2">{grupo.cantAlumno}</td>
              <td className="px-4 py-2">
                {grupo.turno === false ? "Mañana" : "Tarde"}
              </td>
              <td className="flex items-center px-4 py-2">
                <Link
                  to={`actualizar/${grupo.seccion}`}
                  className="mr-4 text-purple-500 hover:text-yellow-500"
                >
                  <IoMdCreate />
                </Link>
                <Link
                  to={`borrar/${grupo.seccion}`}
                  className="text-purple-500 hover:text-yellow-500"
                >
                  <IoIosTrash />
                </Link>
                <button onClick={() => mostrarEstudiantes(grupo)} className='px-2'>Detalle</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Mostrar detalles del grupo seleccionado */}
      {grupoSeleccionado && (
        <div className='mt-2'>
          <h2 className='font-semibold'>Detalles del Grupo</h2>
          <p>Funcionario: {grupoSeleccionado.funcionario.nombre} {grupoSeleccionado.funcionario.apellido1}</p>
          <h3 className='font-semibold'>Estudiantes del Grupo:</h3>
          <ul>
            {grupoSeleccionado.estudiantes.map((estudiante) => (
              <li key={estudiante.id}>
                {estudiante.nombre} {estudiante.apellido1} {estudiante.apellido2}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ListGrupos;
