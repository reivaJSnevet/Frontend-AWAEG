import { useState } from 'react';
import api from '../../services/api.config.js';

const AddNota = () => {
  const [calificacion, setCalificacion] = useState('');
  const [periodo, setPeriodo] = useState(0);
  const [fechaSubida, setFechaSubida] = useState('');

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === 'calificacion') {
      setCalificacion(value);
    } else if (name === 'periodo') {
      setPeriodo(value);
    } else if (name === 'fechaSubida') {
      setFechaSubida(value);
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Verificar que los campos estén completos
    if (!calificacion || !periodo || !fechaSubida) {
      alert('Por favor, complete todos los campos.');
      return;
    }

    try {
      // Realizar la solicitud POST a través de la instancia de Axios
      await api.post('/Notas', {
        calificacion,
        periodo,
        fechaSubida
      });

      // Limpiar el formulario después de enviar los datos
      setCalificacion('');
      setPeriodo('');
      setFechaSubida('');

      alert('Nota agregada exitosamente.');
    } catch (error) {
      console.error('Error al agregar el Nota:', error);
      alert('Hubo un error al agregar el Nota. Por favor, inténtelo de nuevo.');
    }
  }

  return (
    <div>
      <h2>Agregar Nota</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>calificacion:</label>
          <input
            type="text"
            name="calificacion"
            value={calificacion}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Periodo:</label>
          <input
            type="text"
            name="periodo"
            value={periodo}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Fecha de Subida:</label>
          <input
            type="text"
            name="fechaSubida"
            value={fechaSubida}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <button type="submit">Agregar Nota</button>
        </div>
      </form>
    </div>
  );
}

export default AddNota;