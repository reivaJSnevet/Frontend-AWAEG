import { useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../services/api.config.js';

const DeleteHorarioById = () => {
  const { id } = useParams();
  const [horarioId, setHorarioId] = useState(id);

  
  const handleInputChange = (event) => {
    setHorarioId(event.target.value);
  }

  const handleDelete = (event) => {
    event.preventDefault();

    // Realiza una solicitud DELETE para eliminar el horario por ID
    api.delete(`/horarios/${horarioId}`)
      .then(() => {
        // Maneja el éxito, por ejemplo, mostrando un mensaje de éxito
        alert('horario eliminado con éxito.');
        // Limpia el campo de entrada después de eliminar el horario
        setHorarioId('');
        // Recarga la página
        window.location.reload();
      })
      .catch((error) => {
        console.error('Error al eliminar el horario por ID:', error);
        // Puedes manejar errores aquí, por ejemplo, mostrando un mensaje de error
      });
  }

  return (
    <div>
      <h2>Eliminar horario por ID</h2>
      <form onSubmit={handleDelete}>
        <div>
          <label>ID del horario a Eliminar:</label>
          <input
            type="text"
            value={horarioId}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <button type="submit">Eliminar horario</button>
        </div>
      </form>
    </div>
  );
}

export default DeleteHorarioById;