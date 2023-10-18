import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import useAxiosPrivate from '../../hooks/useAxiosPrivate';

const ListGrupos = () => {
    const api = useAxiosPrivate();
  const [grupos, setGrupos] = useState([]);

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
                <Link to={`../actualizar/${grupo.seccion}`}>Actualizar</Link>
                &nbsp;|&nbsp;
                <Link to={`../borrar/${grupo.seccion}`}>Borrar</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ListGrupos;