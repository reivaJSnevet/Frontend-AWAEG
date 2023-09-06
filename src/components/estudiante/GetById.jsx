import { useState } from 'react';
import api from '../../services/api.config.js';

const GetEstudianteById = () => {
  const [estudianteId, setestudianteId] = useState(''); // Estado para almacenar el ID ingresado
  const [estudianteInfo, setEstudianteInfo] = useState(null); // Estado para almacenar la información del Estudiante
  const handleInputChange = (event) => {
    setestudianteId(event.target.value);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    
    // Realiza una solicitud GET para obtener el Estudiante por ID
    api.get(`/estudiantes/${estudianteId}`)
      .then((response) => {
        // Actualiza el estado con la información del Estudiante
        setEstudianteInfo(response.data);
      })
      .catch((error) => {
        console.error('Error al obtener el Estudiante por ID:', error);
        // Puedes manejar errores aquí, por ejemplo, mostrar un mensaje de error
      });
  }

  return (
    <div>
      <h2>Obtener Estudiante por ID</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>ID del Estudiante:</label>
          <input
            type="text"
            value={estudianteId}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <button type="submit">Obtener Estudiante</button>
        </div>
      </form>
      {estudianteInfo && (
        <div>
          <h3>Información del Estudiante</h3>
          <p>Nombre: {estudianteInfo.id}</p>
          <p>Nombre: {estudianteInfo.nombre}</p>
          <p>Primer Apellido: {estudianteInfo.apellido1}</p>
          <p>Segundo Apellido: {estudianteInfo.apellido2}</p>
          <p>fecha de Nacimiento: {estudianteInfo.fechNacimiento}</p>
          <p>Edad: {estudianteInfo.edad}</p>
          <p>Sexo: {estudianteInfo.sexo === false ? "Hombre" : "Mujer"}</p>
          <p>direccion: {estudianteInfo.direccion}</p>
        </div>
      )}
    </div>
  );
}

export default GetEstudianteById;