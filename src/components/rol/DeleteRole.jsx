import { useState } from 'react';
import { useParams } from 'react-router-dom';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';

const DeleteRoleById = () => {
    const api = useAxiosPrivate();
  const { paramId } = useParams();
  const [roleId, setRoleId] = useState(paramId);

  const handleInputChange = (event) => {
    setRoleId(event.target.value);
  };

  const handleDelete = (event) => {
    event.preventDefault();

    api.delete(`/roles/${roleId}`)
      .then(() => {
        alert('Rol eliminado con éxito.');
        setRoleId('');
      })
      .catch((error) => {
        console.error('Error al eliminar el rol por ID:', error);
      });
  };

  return (
    <div className="max-w-md p-6 mx-auto mt-10 bg-purple-400 rounded-lg shadow-lg">
      <h2 className="mb-4 text-2xl font-bold text-white">Eliminar Rol por ID</h2>
      <form onSubmit={handleDelete} className="space-y-4">
        <div>
          <label className="block mb-1 text-sm font-medium text-white">ID del Rol a Eliminar:</label>
          <input
            type="text"
            value={roleId}
            onChange={handleInputChange}
            className="w-full p-2 bg-transparent border border-white rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
          />
        </div>
        <div>
          <button
            type="submit"
            className="w-full p-2 text-purple-500 bg-white rounded-md hover:bg-gray-100 focus:outline-none focus:ring focus:ring-gray-200"
          >
            Eliminar Rol
          </button>
        </div>
      </form>
    </div>
  );
}

export default DeleteRoleById;
