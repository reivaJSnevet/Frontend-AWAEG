import { useState, useEffect } from 'react';
import api from '../../services/api.config.js';

const ListRoles = () => {
  const [roles, setRoles] = useState([]);

  useEffect(() => {
    // Realiza una solicitud GET para obtener todos los roles
    api.get('/roles')
      .then((response) => {
        // Actualiza el estado con los roles obtenidos
        setRoles(response.data);
      })
      .catch((error) => {
        console.error('Error al obtener los roles:', error);
      });
  }, []); // El [] como segundo argumento asegura que este efecto se ejecute solo una vez al montar el componente

  return (
    <div>
      <h2>Lista de Roles</h2>
      <ul>
        {roles.map((rol) => (
          <li key={rol.id}>
            <strong>{rol.nombre}</strong> - Nivel de Privilegio: {rol.nivelPrivilegio} - {rol.descripcion}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ListRoles;
