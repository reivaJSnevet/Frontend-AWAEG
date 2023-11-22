import { useState } from 'react';
import { useParams } from 'react-router-dom';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';

const DeleteHorarioById = () => {
  const api = useAxiosPrivate();
  const { id } = useParams();
  const [horarioId, setHorarioId] = useState(id);

  
  const handleInputChange = (event) => {
    setHorarioId(event.target.value);
  }

  const handleDelete = (event) => {
    event.preventDefault();

    // Realiza una solicitud DELETE para eliminar el horario por ID
    api.delete(`/horarios/${horarioId}`)
      .then(() => {
        // Maneja el éxito, por ejemplo, mostrando un mensaje de éxito
        alert('horario eliminado con éxito.');
        // Limpia el campo de entrada después de eliminar el horario
        setHorarioId('');
        // Recarga la página
        window.location.reload();
      })
      .catch((error) => {
        console.error('Error al eliminar el horario por ID:', error);
        // Puedes manejar errores aquí, por ejemplo, mostrando un mensaje de error
      });
  }

  return (
    <div className="max-w-md p-6 mx-auto mt-10 bg-purple-400 rounded-lg shadow-lg">
      <h2 className="mb-4 text-2xl font-bold text-white">Eliminar horario por ID</h2>
      <form className="space-y-4" onSubmit={handleDelete}>
        <div>
          <label className="block mb-1 text-sm font-medium text-white">ID del horario a Eliminar:</label>
          <input
            type="text"
            value={horarioId}
            onChange={handleInputChange}
            
            className="w-full p-2 bg-white border border-purple-600 rounded-md focus:outline-none focus:ring focus:ring-purple-600"
          />
        </div>
        <div>
          <button className="w-full p-2 text-white bg-purple-300  rounded-md hover:bg-[#F7A834]  focus:outline-none focus:ring focus:ring-gray-700" type="submit">Eliminar horario</button>
        </div>
      </form>
    </div>
  );
}

export default DeleteHorarioById;