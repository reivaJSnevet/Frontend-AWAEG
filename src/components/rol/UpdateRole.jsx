import { useState, useEffect } from 'react';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import { useParams } from 'react-router-dom';

const UpdateRol = () => {
    const api = useAxiosPrivate();
  const { paramId } = useParams();
  const [rol, setRol] = useState({
    id: '',
    nombre: '',
    nivelPrivilegio: 0,
    descripcion: ''
  });

  useEffect(() => {
    if(!paramId) return;
    const fetchRol = async () => {
      try {
        const response = await api.get(`/roles/${paramId}`);
        setRol(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchRol();
  }, [paramId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRol((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/roles/${paramId}`, rol);
      alert('Clase actualizada con éxito.');
    } catch (error) {
      alert('Error al actualizar la clase.');
    }
  };

  return (
    <div className="p-8 bg-purple-400 rounded shadow-lg">
      <h2 className="mb-6 text-3xl font-semibold text-white">Actualizar Rol</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block mb-2 text-sm font-semibold text-white">Nombre del Rol:</label>
          <input
            type="text"
            name="nombre"
            value={rol.nombre}
            onChange={handleInputChange}
            className="w-full p-2 border rounded focus:outline-none focus:border-purple-400"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2 text-sm font-semibold text-white">Nivel de Privilegio:</label>
          <input
            type="number"
            name="nivelPrivilegio"
            value={rol.nivelPrivilegio}
            onChange={handleInputChange}
            className="w-full p-2 border rounded focus:outline-none focus:border-purple-400"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2 text-sm font-semibold text-white">Descripción:</label>
          <textarea
            name="descripcion"
            value={rol.descripcion}
            onChange={handleInputChange}
            className="w-full p-2 border rounded focus:outline-none focus:border-purple-400"
            rows="4"
            required
          />
        </div>

        <button type="submit" className="px-4 py-2 text-white bg-purple-200 rounded hover:bg-purple-600">
          Actualizar
        </button>
      </form>
    </div>
  );
};

export default UpdateRol;
