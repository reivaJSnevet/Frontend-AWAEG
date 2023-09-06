import { useState } from 'react';
import api from '../../services/api.config.js';

const AddHorario = () => {
  const [provisional, setprovisional] = useState('');
  const [habilitado, setHabilitado] = useState('');
  

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === 'provisional') {
        setprovisional(value);
    } else if (name === 'habilitado') {
        setHabilitado(value);
    } 
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Verificar que los campos estén completos
    if (!provisional || !habilitado) {
      alert('Por favor, complete todos los campos.');
      return;
    }

    try {
      // Realizar la solicitud POST a través de la instancia de Axios
      await api.post('/horarios', {
        provisional,
        habilitado
        
      });

      // Limpiar el formulario después de enviar los datos
      setprovisional('');
      setHabilitado('');
    

      alert('horario agregado exitosamente.');
    } catch (error) {
      console.error('Error al agregar el horario:', error);
      alert('Hubo un error al agregar el horario. Por favor, inténtelo de nuevo.');
    }
  }

  return (
    <div>
      <h2>Agregar horario</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Provisional:</label>
          <input
            type=""
            name="provisional"
            value={provisional}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Estado de Horario:</label>
          <input
            type="text"
            name="habilitado"
            value={habilitado}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <button type="submit">Agregar horario</button>
        </div>
      </form>
    </div>
  );
}

export default AddHorario;

