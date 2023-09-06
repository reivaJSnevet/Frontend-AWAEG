import { useState } from "react";
import api from "../../services/api.config";

const AddUsuario = () => {
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [contraseña, setContraseña] = useState('');
  const [roleId, setRoleId] = useState(0);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === 'nombre') {
      setNombre(value);
    } else if (name === 'correo') {
      setCorreo(value);
    } else if (name === 'contraseña') {
      setContraseña(value);
    } else if (name === 'roleId') {
      setRoleId(Number(value)); // Convierte el valor a número
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Verificar campos vacíos
    if (!nombre || !correo || !contraseña || roleId === 0) {
      alert('Por favor, rellene todos los campos');
      return;
    }

    try {
      // Realizar POST mediante axios
      await api.post('/usuarios', {
        nombre,
        correo,
        contraseña,
        roleId
      });

      // Limpiar campos
      setNombre('');
      setCorreo('');
      setContraseña('');
      setRoleId(0);

      alert('Usuario creado con éxito');
    } catch (error) {
      console.error('Error al crear el usuario:', error);
      alert('Hubo un error al crear el usuario. Por favor, inténtelo de nuevo.');
    }
  }

  return (
    <div>
      <h2>Agregar Usuario</h2>
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
          <label>Correo:</label>
          <input
            type="text"
            name="correo"
            value={correo}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Contraseña:</label>
          <input
            type="text"
            name="contraseña"
            value={contraseña}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Rol:</label>
          <input
            type="number"
            name="roleId"
            value={roleId}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <button type="submit">Agregar Usuario</button>
        </div>
      </form>
    </div>
  );
}

export default AddUsuario;
