import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import useAxiosPrivate from '../../hooks/useAxiosPrivate';

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
    api.get('/grupos')
      .then((response) => {
        // Actualiza el estado con los grupos obtenidos
        setGrupos(response.data);
      })
      .catch((error) => {
        console.error('Error al obtener los grupos:', error);
      });
  }, []); // El [] como segundo argumento asegura que este efecto se ejecute solo una vez al montar el componente

  return (
    <div>
      <table className="list-roles-table">
        <thead>
          <tr className="list-roles-tr">
            <th className="roles-th">Seccion</th>
            <th className="roles-th">Ciclo</th>
            <th className="roles-th">Grado</th>
            <th className="roles-th">Aula</th>
            <th className="roles-th">Numero de Estudiantes</th>
            <th className="roles-th">Turno</th>
            <th className="roles-th">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {grupos.map((grupo) => (
            <tr key={grupo.seccion} className="list-roles-tr">
              <td className="list-roles-td">{grupo.seccion}</td>
              <td className="list-roles-td">{grupo.ciclo}</td>
              <td className="list-roles-td">{grupo.grado}</td>
              <td className="list-roles-td">{grupo.aula}</td>
              <td className="list-roles-td">{grupo.cantAlumno}</td>
              <td className="list-roles-td">{grupo.turno === false ? "mañana" : "tarde"}</td>
              <td className="list-roles-td">
                <Link to={`actualizar/${grupo.seccion}`}>Actualizar</Link>
                &nbsp;|&nbsp;
                <Link to={`borrar/${grupo.seccion}`}>Borrar</Link>
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
}

export default ListGrupos;