import { useState } from 'react';
import api from '../../services/api.config.js';

const DeleteEstudianteBYId = () => {
  const [estudianteId, setEstudianteId] = useState('');

  const handleInputChange = (event) => {
    setEstudianteId(event.target.value);
  }

  const handleDelete = (event) => {
    event.preventDefault();

    // Realiza una solicitud DELETE para eliminar un Estudiante por ID
    api.delete(`/estudiantes/${estudianteId}`)
      .then(() => {
        // Maneja el éxito, por ejemplo, mostrando un mensaje de éxito
        alert('Estudiante eliminado con éxito.');
        // Limpia el campo de entrada después de eliminar el Estudiante
        setEstudianteId('');
        // Recarga la página
        window.location.reload();
      })
      .catch((error) => {
        console.error('Error al eliminar el Estudiante por ID:', error);
        // Puedes manejar errores aquí, por ejemplo, mostrando un mensaje de error
      });
  }

  return (
    <div>
      <h2>Eliminar Estudiante por ID</h2>
      <form onSubmit={handleDelete}>
        <div>
          <label>ID del Estudiante a Eliminar:</label>
          <input
            type="text"
            value={estudianteId}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <button type="submit">Eliminar Estudiante</button>
        </div>
      </form>
    </div>
  );
}

export default DeleteEstudianteBYId;