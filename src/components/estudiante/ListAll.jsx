import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import api from '../../services/api.config.js';

const ListEstudiantes = () => {
  const [estudiantes, setEstudiantes] = useState([]);

  useEffect(() => {
    // Realiza una solicitud GET para obtener todos los estudiantes
    api.get('/estudiantes')
      .then((response) => {
        // Actualiza el estado con los estudiantes obtenidos
        setEstudiantes(response.data);
      })
      .catch((error) => {
        console.error('Error al obtener los estudiantes:', error);
      });
  }, []); // El [] como segundo argumento asegura que este efecto se ejecute solo una vez al montar el componente

  return (
    <div>
    <table className="list-roles-table">
      <thead>
        <tr className="list-roles-tr">
          <th className="roles-th">ID</th>
          <th className="roles-th">Nombre</th>
          <th className="roles-th">Primer Apellido</th>
          <th className="roles-th">Segundo Apellido</th>
          <th className="roles-th">Fecha de Nacimiento</th>
          <th className="roles-th">Edad</th>
          <th className="roles-th">Género</th>
          <th className="roles-th">Acciones</th>
        </tr>
      </thead>
      <tbody>
        {estudiantes.map((estudiante) => (
          <tr key={estudiante.id} className="list-roles-tr">
            <td className="list-roles-td">{estudiante.id}</td>
            <td className="list-roles-td">{estudiante.nombre}</td>
            <td className="list-roles-td">{estudiante.apellido1}</td>
            <td className="list-roles-td">{estudiante.apellido2}</td>
            <td className="list-roles-td">{estudiante.fechaNacimiento}</td>
            <td className="list-roles-td">{estudiante.edad}</td>
            <td className="list-roles-td">{estudiante.sexo === false ? "Hombre" : "Mujer"}</td>
            <td className="list-roles-td">
              <Link to={`../actualizar/${estudiante.id}`}>Actualizar</Link>
              &nbsp;|&nbsp;
              <Link to={`../borrar/${estudiante.id}`}>Borrar</Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
  );
}

export default ListEstudiantes;