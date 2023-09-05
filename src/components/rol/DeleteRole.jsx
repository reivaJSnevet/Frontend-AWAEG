import { useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../services/api.config.js';

const DeleteRoleById = () => {
  const { id } = useParams();
  const [roleId, setRoleId] = useState(id);

  const handleInputChange = (event) => {
    setRoleId(event.target.value);
  }

  const handleDelete = (event) => {
    event.preventDefault();

    api.delete(`/roles/${roleId}`)
      .then(() => {
        alert('Rol eliminado con éxito.');
        setRoleId('');
      })
      .catch((error) => {
        console.error('Error al eliminar el rol por ID:', error);
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
