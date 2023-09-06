import { useState } from 'react';
import api from '../../services/api.config.js';

const DeleteNotaById = () => {
  const [notaId, setNotaId] = useState('');

  const handleInputChange = (event) => {
    setNotaId(event.target.value);
  }

  const handleDelete = (event) => {
    event.preventDefault();

    // Realiza una solicitud DELETE para eliminar el Nota por ID
    api.delete(`/notas/${notaId}`)
      .then(() => {
        // Maneja el éxito, por ejemplo, mostrando un mensaje de éxito
        alert('Nota eliminado con éxito.');
        // Limpia el campo de entrada después de eliminar el Nota
        setNotaId('');
        // Recarga la página
        window.location.reload();
      })
      .catch((error) => {
        console.error('Error al eliminar el Nota por ID:', error);
        // Puedes manejar errores aquí, por ejemplo, mostrando un mensaje de error
      });
  }

  return (
    <div>
      <h2>Eliminar Nota por ID</h2>
      <form onSubmit={handleDelete}>
        <div>
          <label>ID de la Nota a Eliminar:</label>
          <input
            type="text"
            value={notaId}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <button type="submit">Eliminar Nota</button>
        </div>
      </form>
    </div>
  );
}

export default DeleteNotaById;