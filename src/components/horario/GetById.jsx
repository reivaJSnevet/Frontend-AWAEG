import { useState } from 'react';
import api from '../../services/api.config.js';

const GetHorarioById = () => {
  const [horarioId, setHorarioId] = useState(''); // Estado para almacenar el ID ingresado
  const [horarioeInfo, sethorarioeInfo] = useState(null); // Estado para almacenar la información del horario

  const handleInputChange = (event) => {
    setHorarioId(event.target.value);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    
    // Realiza una solicitud GET para obtener el horario por ID
    api.get(`/horarios/${horarioId}`)
      .then((response) => {
        // Actualiza el estado con la información del horario
        sethorarioeInfo(response.data);
      })
      .catch((error) => {
        console.error('Error al obtener el horario por ID:', error);
        // Puedes manejar errores aquí, por ejemplo, mostrar un mensaje de error
      });
  }

  return (
    <div>
      <h2>Obtener horario por ID</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>ID del horario:</label>
          <input
            type="text"
            value={horarioId}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <button type="submit">Obtener horario</button>
        </div>
      </form>
      {horarioeInfo && (
        <div>
          <h3>Información del horario</h3>
          <p>tipo de Horario: {horarioeInfo.provisional === false ? 'No' : 'Si'}</p>
          <p>Estado de Horario: {horarioeInfo.habilitado === false ? 'Deshabilitado' : 'Habilitado'}</p>
        </div>
      )}
    </div>
  );
}

export default GetHorarioById;