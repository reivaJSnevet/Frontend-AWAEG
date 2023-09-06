import React, { useState } from "react";
import api from "../../services/api.config";

const DeleteUsuarioById = () => {
  const [usuarioId, setUsuarioId] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

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

  const handleDelete = (event) => {
    event.preventDefault();

    // Muestra un cuadro de confirmación antes de eliminar al usuario
    const confirmDelete = window.confirm('¿Estás seguro de eliminar este usuario?');

    if (confirmDelete) {
      // Realiza una solicitud DELETE para eliminar el usuario por ID
      api.delete(`/usuarios/${usuarioId}`)
        .then(() => {
          // Maneja el éxito, por ejemplo, mostrando un mensaje de éxito
          setSuccessMessage('Usuario eliminado con éxito.');
          // Limpia el campo de entrada después de eliminar al usuario
          setUsuarioId('');
          // Recarga la página
          window.location.reload();
        })
        .catch((error) => {
          if (error.response && error.response.status === 404) {
            // El usuario no fue encontrado
            setErrorMessage('Usuario no encontrado.');
          } else {
            console.error('Error al eliminar el Usuario por ID:', error);
            // Puedes manejar otros errores aquí
            setErrorMessage('Error al eliminar el usuario.');
          }
        });
    }
  }

  return (
    <div>
      <h2>Eliminar Usuario por ID</h2>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
      <form onSubmit={handleDelete}>
        <div>
          <label>ID del Usuario a Eliminar:</label>
          <input
            type="text"
            value={usuarioId}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <button type="submit">Eliminar Usuario</button>
        </div>
      </form>
    </div>
  );
}

export default DeleteUsuarioById;
