import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';

const DeleteGrupoById = () => {
    const api = useAxiosPrivate(); 
  const { paramId } = useParams();
  const [grupoId, setGrupoId] = useState('');

    useEffect(() => {
        if(paramId){
            setGrupoId(paramId);
        }else{
            setGrupoId('');
        }
    }, [paramId])

  const handleInputChange = (event) => {
    setGrupoId(event.target.value);
  }

  const handleDelete = (event) => {
    event.preventDefault();

    // Realiza una solicitud DELETE para eliminar un Grupo por ID
    api.delete(`/grupos/${grupoId}`)
      .then(() => {
        // Maneja el éxito, por ejemplo, mostrando un mensaje de éxito
        alert('Grupo eliminado con éxito.');
        // Limpia el campo de entrada después de eliminar el Grupo
        setGrupoId('');
        // Recarga la página
      })
      .catch((error) => {
        console.error('Error al eliminar el Grupo por ID:', error);
        // Puedes manejar errores aquí, por ejemplo, mostrando un mensaje de error
      });
  }

  return (
    <div className="max-w-md p-6 mx-auto mt-10 bg-purple-400 rounded-lg shadow-lg">
      <h2 className="mb-4 text-2xl font-bold text-white">Eliminar Grupo por Seccion</h2>
      <form className="space-y-4" onSubmit={handleDelete}>
        <div>
          <label className="block mb-1 text-sm font-medium text-white">Seccion del Grupo a Eliminar:</label>
          <input
            type="text"
            value={grupoId}
            onChange={handleInputChange}
            disabled
            className="w-full p-2 bg-transparent border border-white rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
          />
        </div>
        <div>
          <button className="w-full p-2 text-white bg-purple-300  rounded-md hover:bg-[#F7A834]  focus:outline-none focus:ring focus:ring-gray-700" type="submit">Eliminar Grupo</button>
        </div>
      </form>
    </div>
  );
}

export default DeleteGrupoById;