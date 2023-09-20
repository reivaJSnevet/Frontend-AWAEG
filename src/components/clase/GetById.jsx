import { useState } from 'react';
import api from '../../services/api.config.js';

const GetById = () => {
  const [id, setId] = useState('');
  const [clase, setClase] = useState(null);

  const fetchClase = async () => {
    try {
      const response = await api.get(`/clases/${id}`);
      setClase(response.data);
    } catch (error) {
      alert('Error al obtener la clase.');
      setClase(null);
    }
  };

  return (
    <div>
      <h2>Buscar Clase por ID</h2>
      <div>
        <label>ID:</label>
        <input type="text" value={id} onChange={(e) => setId(e.target.value)} />
        <button onClick={fetchClase}>Buscar</button>
      </div>
      {clase && (
        <div>
          <p><strong>Día:</strong> {clase.dia}</p>
          <p><strong>Hora de Inicio:</strong> {clase.horaInicio}</p>
          <p><strong>Hora de Salida:</strong> {clase.horaSalida}</p>
          <p><strong>Lección:</strong> {clase.leccion}</p>
        </div>
      )}
    </div>
  );
};

export default GetById;
