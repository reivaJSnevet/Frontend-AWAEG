import React, { useState } from 'react';
import api from '../../services/api.config.js';

const AddRol = () => {
  const [nombre, setNombre] = useState('');
  const [nivelPrivilegio, setNivelPrivilegio] = useState(0);
  const [descripcion, setDescripcion] = useState('');

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === 'nombre') {
      setNombre(value);
    } else if (name === 'nivelPrivilegio') {
      setNivelPrivilegio(value);
    } else if (name === 'descripcion') {
      setDescripcion(value);
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Verificar que los campos estén completos
    if (!nombre || !nivelPrivilegio || !descripcion) {
      alert('Por favor, complete todos los campos.');
      return;
    }

    try {
      // Realizar la solicitud POST a través de la instancia de Axios
      await api.post('/roles', {
        nombre,
        nivelPrivilegio,
        descripcion
      });

      // Limpiar el formulario después de enviar los datos
      setNombre('');
      setNivelPrivilegio(0);
      setDescripcion('');

      alert('Rol agregado exitosamente.');
    } catch (error) {
      console.error('Error al agregar el rol:', error);
      alert('Hubo un error al agregar el rol. Por favor, inténtelo de nuevo.');
    }
  }

  return (
    <div>
      <h2>Agregar Rol</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nombre:</label>
          <input
            type="text"
            name="nombre"
            value={nombre}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Nivel de Privilegio:</label>
          <input
            type="number"
            name="nivelPrivilegio"
            value={nivelPrivilegio}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Descripción:</label>
          <input
            type="text"
            name="descripcion"
            value={descripcion}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <button type="submit">Agregar Rol</button>
        </div>
      </form>
    </div>
  );
}

export default AddRol;


