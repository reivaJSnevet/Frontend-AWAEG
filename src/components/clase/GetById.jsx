import { useState } from 'react';
import api from '../../services/api.config.js';

const GetById = () => {
  const [id, setId] = useState('');
  const [clase, setClase] = useState(null);

  const fetchClase = async () => {
    try {
      const response = await api.get(`/clases/${id}`);
      setClase(response.data);
    } catch (error) {
      alert('Error al obtener la clase.');
      setClase(null);
    }
  };

  
  return (
    <div className="relative max-w-md p-6 mx-auto mt-10 overflow-hidden bg-purple-600 rounded-lg shadow-lg">
      <h2 className="relative mb-4 text-2xl font-bold text-white">Buscar Clase por ID</h2>
      <div className="flex items-center space-x-4">
        <label className="text-white">ID:</label>
        <input
          type="text"
          value={id}
          onChange={(e) => setId(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
        />
        <button
          onClick={fetchClase}
          className="w-full p-2 text-white bg-purple-300  rounded-md hover:bg-[#F7A834]  focus:outline-none focus:ring focus:ring-gray-700"
        >
          Buscar
        </button>
      </div>
      {clase && (
        <div className="mt-4">
          <p className="text-gray-200">
            <strong>Día:</strong> {clase.dia}
          </p>
          <p className="text-gray-200">
            <strong>Hora de Inicio:</strong> {clase.horaInicio}
          </p>
          <p className="text-gray-200">
            <strong>Hora de Salida:</strong> {clase.horaSalida}
          </p>
          <p className="text-gray-200">
            <strong>Lección:</strong> {clase.leccion}
          </p>
        </div>
      )}
    </div>
  );
};

export default GetById;