import { useState } from 'react';
import api from '../../services/api.config.js';

const GetNotaById = () => {
  const [notaId, setNotaId] = useState(''); // Estado para almacenar el ID ingresado
  const [notaInfo, setNotaInfo] = useState(null); // Estado para almacenar la información del nota

  const handleInputChange = (event) => {
    setNotaId(event.target.value);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    
    // Realiza una solicitud GET para obtener la nota por ID
    api.get(`/notas/${notaId}`)
      .then((response) => {
        // Actualiza el estado con la información de la nota
        setNotaInfo(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error('Error al obtener la nota por ID:', error);
        // Puedes manejar errores aquí, por ejemplo, mostrar un mensaje de error
      });
  }

  return (
    <div>
      <h2>Obtener nota por ID</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>ID del nota:</label>
          <input
            type="text"
            value={notaId}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <button type="submit">Obtener nota</button>
        </div>
      </form>
      {notaInfo && (
        <div>
          <h3>Información del nota</h3>
          <p>Calificacion: {notaInfo.calificacion}</p>
          <p>Periodo: {notaInfo.periodo}</p>
          <p>Fecha de Subida: {notaInfo.fechaSubida}</p>
        </div>
      )}
    </div>
  );
}

export default GetNotaById;