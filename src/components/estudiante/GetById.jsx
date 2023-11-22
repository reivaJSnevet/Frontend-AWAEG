import { useState } from 'react';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';

const GetEstudianteById = () => {
    const api = useAxiosPrivate();
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
    <div className="relative max-w-md p-6 mx-auto mt-10 overflow-hidden bg-purple-600 rounded-lg shadow-lg">
      <h2 className="relative mb-4 text-2xl font-bold text-white">Obtener Estudiante por ID</h2>
      <form onSubmit={handleSubmit} className="relative space-y-4">
        <div>
          <label className="block mb-1 text-sm font-medium text-white">ID del Estudiante:</label>
          <input
            type="text"
            value={estudianteId}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
          />
        </div>
        <div>
          <button
            type="submit"
            className="w-full p-2 text-white bg-purple-300  rounded-md hover:bg-[#F7A834]  focus:outline-none focus:ring focus:ring-gray-700"
          >
            Obtener Estudiante
          </button>
        </div>
      </form>
      {estudianteInfo && (
        <div className="mt-4">
          <h3 className="mb-2 text-lg font-semibold text-white">Información del Estudiante</h3>
          <p>ID: {estudianteInfo.id}</p>
          <p>Nombre: {estudianteInfo.nombre}</p>
          <p>Primer Apellido: {estudianteInfo.apellido1}</p>
          <p>Segundo Apellido: {estudianteInfo.apellido2}</p>
          <p>fecha de Nacimiento: {estudianteInfo.fechNacimiento}</p>
          <p>Edad: {estudianteInfo.edad}</p>
          <p>Sexo: {estudianteInfo.sexo ? 'Hombre' : 'Mujer'}</p>
          <p>direccion: {estudianteInfo.direccion}</p>
        </div>
      )}
    </div>
  );
};

export default GetEstudianteById;