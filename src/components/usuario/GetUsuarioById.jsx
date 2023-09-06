import React, { useState } from "react";
import api from "../../services/api.config";

const GetUsuarioById = () => {
  const [usuarioId, setUsuarioId] = useState('');
  const [usuarioinfo, setUsuarioInfo] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  const handleInputChange = (event) => {
    const inputValue = event.target.value;

    // Verifica si el valor ingresado es un número
    if (/^\d+$/.test(inputValue) || inputValue === '') {
      setUsuarioId(inputValue);
      setErrorMessage(''); // Limpia el mensaje de error si es válido
    } else {
      setErrorMessage('Ingrese solo números');
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    // Realiza una solicitud GET para obtener el usuario por ID
    api.get(`/usuarios/${usuarioId}`)
      .then((response) => {
        // Actualiza el estado con la información del usuario
        setUsuarioInfo(response.data);
        setErrorMessage(''); // Limpia el mensaje de error si se encuentra el usuario
      })
      .catch((error) => {
        console.error('Error al obtener el usuario por ID:', error);
        // Puedes manejar errores aquí, por ejemplo, mostrar un mensaje de error
        setUsuarioInfo(null); // Limpia la información del usuario si no se encuentra
        setErrorMessage('No se encontró un usuario con esa ID.');
      });
  }

  return (
    <div>
      <h2>Obtener Usuario por ID</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>ID del Usuario:</label>
          <input
            type="text"
            value={usuarioId}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <button type="submit">Obtener Usuario</button>
        </div>
      </form>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      {usuarioinfo && (
        <div>
          <h3>Información del Usuario</h3>
          <p>Nombre: {usuarioinfo.nombre}</p>
          <p>Correo: {usuarioinfo.correo}</p>
          <p>Rol: {usuarioinfo.role.nombre}</p> 
        </div>
      )}
    </div>
  );
}

export default GetUsuarioById;
