import { useState } from "react";
import api from "../../services/api.config";

const GetUsuarioById = () => {
  const [usuarioId, setUsuarioId] = useState('');
  const [usuarioinfo, setUsuarioInfo] = useState(null);

  const handleInputChange = (event) => {
    setUsuarioId(event.target.value);
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    // Realiza una solicitud GET para obtener el usuario por ID
    api.get(`/usuarios/${usuarioId}`)
      .then((response) => {
        // Actualiza el estado con la información del usuario
        setUsuarioInfo(response.data);
      })
      .catch((error) => {
        console.error('Error al obtener el usuario por ID:', error);
        // Puedes manejar errores aquí, por ejemplo, mostrar un mensaje de error
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
