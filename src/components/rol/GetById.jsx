import { useState } from 'react';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';

const GetRoleById = () => {
    const api = useAxiosPrivate();
  const [roleId, setRoleId] = useState(''); // Estado para almacenar el ID ingresado
  const [roleInfo, setRoleInfo] = useState(null); // Estado para almacenar la información del rol
  const [error, setError] = useState('');

  const handleInputChange = (event) => {
    setRoleId(event.target.value);
    setError(''); // Limpiar el mensaje de error al cambiar el valor del campo de entrada
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Validar si el campo del ID del rol está vacío
    if (roleId.trim() === '') {
      setError('El campo del ID del rol no puede estar vacío.');
      return;
    }

    // Realiza una solicitud GET para obtener el rol por ID
    api.get(`/roles/${roleId}`)
      .then((response) => {
        // Actualiza el estado con la información del rol
        setRoleInfo(response.data);
      })
      .catch((error) => {
        console.error('Error al obtener el rol por ID:', error);
        // Puedes manejar errores aquí, por ejemplo, mostrar un mensaje de error
      });
  };

  return (
    <div className="relative max-w-md p-6 mx-auto mt-10 overflow-hidden bg-purple-600 rounded-lg shadow-lg">
      <h2 className="relative mb-4 text-2xl font-bold text-white">Obtener Rol por ID</h2>
      {error && <div className="mt-2 text-black">{error}</div>}
      <form onSubmit={handleSubmit} className="relative space-y-4">
        <div>
          <label className="block mb-1 text-sm font-medium text-white">ID del Rol:</label>
          <input
            type="text"
            value={roleId}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
          />
        </div>
        <div>
          <button
            type="submit"
            className="w-full p-2 text-white bg-slate-950  rounded-md hover:bg-slate-950  focus:outline-none focus:ring focus:ring-purple-300"
          >
            Obtener Rol
          </button>
        </div>
      </form>
      {roleInfo && (
        <div className="mt-4">
          <h3 className="mb-2 text-lg font-semibold text-purple-800">Información del Rol</h3>
          <p className="text-gray-600">Nombre: {roleInfo.nombre}</p>
          <p className="text-gray-600">Nivel de Privilegio: {roleInfo.nivelPrivilegio}</p>
          <p className="text-gray-600">Descripción: {roleInfo.descripcion}</p>
        </div>
      )}
    </div>
  );
};

export default GetRoleById;
