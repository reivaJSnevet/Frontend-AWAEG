import { useState } from 'react';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';

const GetGrupoById = () => {
    const api = useAxiosPrivate();
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
        const grupo = response.data[1];
        setGrupoInfo(grupo);
        console.log(grupo);
      })
      .catch((error) => {
        console.error('Error al obtener el Grupo por seccion:', error);
        // Puedes manejar errores aquí, por ejemplo, mostrar un mensaje de error
      });
  }

  return (
    <div className="relative max-w-md p-6 mx-auto mt-10 overflow-hidden bg-purple-600 rounded-lg shadow-lg">
      <h2 className="relative mb-4 text-2xl font-bold text-white">Obtener Grupo por ID</h2>
      <form onSubmit={handleSubmit} className="relative space-y-4">
        <div>
          <label className="text-white">Sección del Grupo:</label>
          <input
            type="text"
            value={grupoId}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
          />
        </div>
        <div>
          <button
            type="submit"
            className="w-full p-2 text-white bg-purple-300  rounded-md hover:bg-[#F7A834]  focus:outline-none focus:ring focus:ring-gray-700"
          >
            Obtener Grupo
          </button>
        </div>
      </form>
      {grupoInfo && (
        <div className="mt-5">
          <h3 className="font-semibold">Información del Grupo</h3>
          <p>Sección: {grupoInfo.seccion}</p>
          <p>Ciclo: {grupoInfo.ciclo}</p>
          <p>Grado: {grupoInfo.grado}</p>
          <p>Aula: {grupoInfo.aula}</p>
          <p>Cantidad de Estudiantes: {grupoInfo.cantAlumno}</p>
          <p>Turno: {grupoInfo.turno ? 'Tarde' : 'Mañana'}</p>
          <div className="mt-2">
            <h2 className="font-semibold">Detalles del Grupo</h2>
            <p>
              Funcionario: {grupoInfo.funcionario.nombre}{' '}
              {grupoInfo.funcionario.apellido1}
            </p>
            <h3 className="font-semibold">Estudiantes del Grupo:</h3>
            <ul>
              {grupoInfo.estudiantes.map((estudiante) => (
                <li key={estudiante.id}>
                  {estudiante.nombre} {estudiante.apellido1}{' '}
                  {estudiante.apellido2}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default GetGrupoById;