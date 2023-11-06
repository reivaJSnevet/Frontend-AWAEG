import { useState } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

const GetUsuarioById = () => {
  const api = useAxiosPrivate();
  const [formData, setFormData] = useState({
    usuarioId: '',
    usuarioInfo: null,
    errorMessage: ''
  });

  const handleInputChange = (event) => {
    const inputValue = event.target.value;

    // Verifica si el valor ingresado es un número
    if (/^\d+$/.test(inputValue) || inputValue === '') {
      setFormData({
        ...formData,
        usuarioId: inputValue,
        errorMessage: '' // Limpia el mensaje de error si es válido
      });
    } else {
      setFormData({
        ...formData,
        errorMessage: 'Ingrese solo números'
      });
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    // Realiza una solicitud GET para obtener el usuario por ID
    api.get(`/usuarios/${formData.usuarioId}`)
      .then((response) => {
        // Actualiza el estado con la información del usuario
        setFormData({
          ...formData,
          usuarioInfo: response.data,
          errorMessage: '' // Limpia el mensaje de error si se encuentra el usuario
        });
      })
      .catch((error) => {
        console.error('Error al obtener el usuario por ID:', error);
        // Puedes manejar errores aquí, por ejemplo, mostrar un mensaje de error
        setFormData({
          ...formData,
          usuarioInfo: null, // Limpia la información del usuario si no se encuentra
          errorMessage: 'No se encontró un usuario con esa ID.'
        });
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
            value={formData.usuarioId}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <button type="submit">Obtener Usuario</button>
        </div>
      </form>
      {formData.errorMessage && <p style={{ color: 'red' }}>{formData.errorMessage}</p>}
      {formData.usuarioInfo && (
        <div>
          <h3>Información del Usuario</h3>
          <p>Nombre: {formData.usuarioInfo.nombre}</p>
          <p>Correo: {formData.usuarioInfo.correo}</p>
          <p>Rol: {formData.usuarioInfo.role.nombre}</p>
        </div>
      )}
    </div>
  );
}

export default GetUsuarioById;
