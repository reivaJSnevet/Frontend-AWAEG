import { useState } from 'react';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';

const GetFuncionarioById = () => {
    const api = useAxiosPrivate();
  const [funcionarioId, setFuncionarioId] = useState(''); // Estado para almacenar el ID ingresado
  const [funcionarioInfo, setFuncionarioInfo] = useState(null); // Estado para almacenar la información del funcionario

  const handleInputChange = (event) => {
    setFuncionarioId(event.target.value);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    
    // Realiza una solicitud GET para obtener el funcionario por ID
    api.get(`/funcionarios/${funcionarioId}`)
      .then((response) => {
        // Actualiza el estado con la información del funcionario
        setFuncionarioInfo(response.data);
      })
      .catch((error) => {
        console.error('Error al obtener el funcionario por ID:', error);
        // Puedes manejar errores aquí, por ejemplo, mostrar un mensaje de error
      });
    }

    return (
      <div className="relative max-w-md p-6 mx-auto mt-10 overflow-hidden bg-purple-600 rounded-lg shadow-lg">
        <h2 className="relative mb-4 text-2xl font-bold text-white">Obtener Funcionario por ID</h2>
        <form onSubmit={handleSubmit} className="relative space-y-4">
          <div>
            <label className="block mb-1 text-sm font-medium text-white">ID del Funcionario:</label>
            <input
              type="text"
              value={funcionarioId}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full p-2 text-white bg-slate-950 rounded-md hover:bg-slate-950 focus:outline-none focus:ring focus:ring-purple-300"
            >
              Obtener Funcionario
            </button>
          </div>
        </form>
        {funcionarioInfo && (
          <div className="mt-4">
            <h3 className="mb-2 text-lg font-semibold text-white">Información del Funcionario</h3>
            <p>ID: {funcionarioInfo.id}</p>
            <p>Nombre: {funcionarioInfo.nombre}</p>
            <p>Apellido1: {funcionarioInfo.apellido1}</p>
            <p>Apellido2: {funcionarioInfo.apellido2}</p>
            <p>Fecha de Nacimiento: {funcionarioInfo.fechaNacimiento}</p>
            <p>Edad: {funcionarioInfo.edad}</p>
            <p>Sexo: {funcionarioInfo.sexo === false ? 'Hombre' : 'Mujer'}</p>
          </div>
        )}
      </div>
    );
  };
  
  export default GetFuncionarioById;