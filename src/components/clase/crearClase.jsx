import { useState } from 'react';
import api from '../../services/api.config.js';

const CrearClase = () => {
  const [dia, setDia] = useState('');
  const [horaInicio, setHoraInicio] = useState('');
  const [horaSalida, setHoraSalida] = useState('');
  const [leccion, setLeccion] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/clases', {
        dia,
        horaInicio,
        horaSalida,
        leccion,
      });
      alert('Clase creada con éxito.');
    } catch (error) {
      alert('Error al crear la clase.');
    }
  };

  return (
    <div>
      <h2>Crear Clase</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Día:</label>
          <input type="text" value={dia} onChange={(e) => setDia(e.target.value)} />
        </div>
        <div>
          <label>Hora de Inicio:</label>
          <input type="time" value={horaInicio} onChange={(e) => setHoraInicio(e.target.value)} />
        </div>
        <div>
          <label>Hora de Salida:</label>
          <input type="time" value={horaSalida} onChange={(e) => setHoraSalida(e.target.value)} />
        </div>
        <div>
          <label>Lección:</label>
          <input type="text" value={leccion} onChange={(e) => setLeccion(e.target.value)} />
        </div>
        <button type="submit">Crear</button>
      </form>
    </div>
  );
};

export default CrearClase;
