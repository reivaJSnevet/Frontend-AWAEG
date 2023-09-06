import React, { useState, useEffect } from "react";
import api from "../../services/api.config";

const AddUsuario = () => {
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [contraseña, setContraseña] = useState('');
  const [roleId, setRoleId] = useState('');
  const [roles, setRoles] = useState([]); // Aquí almacenaremos la lista de roles
  const [showPassword, setShowPassword] = useState(false); // Estado para mostrar/ocultar la contraseña

  const [errorMessages, setErrorMessages] = useState({});

  // Función para cargar los roles desde la API
  const loadRoles = async () => {
    try {
      const response = await api.get('/roles');
      setRoles(response.data); // Supongamos que la respuesta contiene una lista de roles
    } catch (error) {
      console.error('Error al cargar los roles:', error);
    }
  };

  useEffect(() => {
    loadRoles(); // Cargar los roles al montar el componente
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === 'nombre') {
      setNombre(value);
    } else if (name === 'correo') {
      setCorreo(value);
    } else if (name === 'contraseña') {
      setContraseña(value);
    } else if (name === 'roleId') {
      setRoleId(value);
    }
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  }

  const validateForm = () => {
    const errors = {};
    
    if (!nombre) {
      errors.nombre = 'El nombre es obligatorio';
    }
    
    if (!correo) {
      errors.correo = 'El correo es obligatorio';
    } else if (!/^\S+@\S+\.\S+$/.test(correo)) {
      errors.correo = 'El correo electrónico no es válido';
    }
    
    if (!contraseña) {
      errors.contraseña = 'La contraseña es obligatoria';
    } else if (contraseña.length < 8) {
      errors.contraseña = 'La contraseña debe tener al menos 8 caracteres';
    }
    
    if (!roleId) {
      errors.roleId = 'Seleccione un rol válido';
    }
    
    setErrorMessages(errors);
    return Object.keys(errors).length === 0;
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validateForm()) {
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
      setRoleId('');

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
          {errorMessages.nombre && <p>{errorMessages.nombre}</p>}
        </div>
        <div>
          <label>Correo:</label>
          <input
            type="text"
            name="correo"
            value={correo}
            onChange={handleInputChange}
          />
          {errorMessages.correo && <p>{errorMessages.correo}</p>}
        </div>
        <div>
          <label>Contraseña:</label>
          <input
            type={showPassword ? "text" : "password"} // Cambia el tipo de campo según showPassword
            name="contraseña"
            value={contraseña}
            onChange={handleInputChange}
          />
          {errorMessages.contraseña && <p>{errorMessages.contraseña}</p>}
        </div>
        <div>
          <label>Rol:</label>
          <select
            name="roleId"
            value={roleId}
            onChange={handleInputChange}
          >
            <option value="">Seleccione un rol</option>
            {roles.map((role) => (
              <option key={role.id} value={role.id}>
                {role.nombre}
              </option>
            ))}
          </select>
          {errorMessages.roleId && <p>{errorMessages.roleId}</p>}
        </div>
        <div>
          <input
            type="checkbox"
            id="showPasswordCheckbox"
            onChange={togglePasswordVisibility}
            checked={showPassword}
          />
          <label htmlFor="showPasswordCheckbox">Mostrar Contraseña</label>
        </div>
        <div>
          <button type="submit">Agregar Usuario</button>
        </div>
      </form>
    </div>
  );
}

export default AddUsuario;
