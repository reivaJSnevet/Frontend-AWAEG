import { useState } from 'react';
import api from '../../services/api.config.js';

const GetGrupoById = () => {
  const [grupoId, setGrupoId] = useState(''); // Estado para almacenar el ID ingresado
  const [grupoInfo, setGrupoInfo] = useState(null); // Estado para almacenar la información del Grupo
  const handleInputChange = (event) => {
    setGrupoId(event.target.value);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    
    // Realiza una solicitud GET para obtener el Grupo por ID
    api.get(`/grupos/${grupoId}`)
      .then((response) => {
        // Actualiza el estado con la información del Grupo
        setGrupoInfo(response.data);
      })
      .catch((error) => {
        console.error('Error al obtener el Grupo por seccion:', error);
        // Puedes manejar errores aquí, por ejemplo, mostrar un mensaje de error
      });
  }

  return (
    <div>
      <h2>Obtener Grupo por ID</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Seccion del Grupo:</label>
          <input
            type="text"
            value={grupoId}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <button type="submit">Obtener Grupo</button>
        </div>
      </form>
      {grupoInfo && (
        <div>
          <h3>Información del Grupo</h3>
          <p>seccion: {grupoInfo.seccion}</p>
          <p>Grado: {grupoInfo.ciclo}</p>
          <p>Grado: {grupoInfo.grado}</p>
          <p>Aula: {grupoInfo.aula}</p>
          <p>Cantidad de Estudiantes: {grupoInfo.cantAlumno}</p>
          <p>turno: {grupoInfo.turno === false ? "mañana" : "tarde"}</p>
        </div>
      )}
    </div>
  );
}

export default GetGrupoById;