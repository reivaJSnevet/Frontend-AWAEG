import { useState } from 'react';
import api from '../../services/api.config.js';

const GetRoleById = () => {
  const [roleId, setRoleId] = useState(''); // Estado para almacenar el ID ingresado
  const [roleInfo, setRoleInfo] = useState(null); // Estado para almacenar la información del rol

  const handleInputChange = (event) => {
    setRoleId(event.target.value);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    
    // Realiza una solicitud GET para obtener el rol por ID
    api.get(`/roles/${roleId}`)
      .then((response) => {
        // Actualiza el estado con la información del rol
        setRoleInfo(response.data);
      })
      .catch((error) => {
        console.error('Error al obtener el rol por ID:', error);
        // Puedes manejar errores aquí, por ejemplo, mostrar un mensaje de error
      });
  }

  return (
    <div>
      <h2>Obtener Rol por ID</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>ID del Rol:</label>
          <input
            type="text"
            value={roleId}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <button type="submit">Obtener Rol</button>
        </div>
      </form>
      {roleInfo && (
        <div>
          <h3>Información del Rol</h3>
          <p>Nombre: {roleInfo.nombre}</p>
          <p>Nivel de Privilegio: {roleInfo.nivelPrivilegio}</p>
          <p>Descripción: {roleInfo.descripcion}</p>
        </div>
      )}
    </div>
  );
}

export default GetRoleById;
