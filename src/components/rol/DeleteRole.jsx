import { useState } from 'react';
import api from '../../services/api.config.js';

const DeleteRoleById = () => {
  const [roleId, setRoleId] = useState('');

  const handleInputChange = (event) => {
    setRoleId(event.target.value);
  }

  const handleDelete = (event) => {
    event.preventDefault();

    // Realiza una solicitud DELETE para eliminar el rol por ID
    api.delete(`/roles/${roleId}`)
      .then(() => {
        // Maneja el éxito, por ejemplo, mostrando un mensaje de éxito
        alert('Rol eliminado con éxito.');
        // Limpia el campo de entrada después de eliminar el rol
        setRoleId('');
        // Recarga la página
        window.location.reload();
      })
      .catch((error) => {
        console.error('Error al eliminar el rol por ID:', error);
        // Puedes manejar errores aquí, por ejemplo, mostrando un mensaje de error
      });
  }

  return (
    <div>
      <h2>Eliminar Rol por ID</h2>
      <form onSubmit={handleDelete}>
        <div>
          <label>ID del Rol a Eliminar:</label>
          <input
            type="text"
            value={roleId}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <button type="submit">Eliminar Rol</button>
        </div>
      </form>
    </div>
  );
}

export default DeleteRoleById;
