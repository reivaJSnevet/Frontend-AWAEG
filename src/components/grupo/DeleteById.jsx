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
    <div>
      <h2>Eliminar Grupo por Seccion</h2>
      <form onSubmit={handleDelete}>
        <div>
          <label>Seccion del Grupo a Eliminar:</label>
          <input
            type="text"
            value={grupoId}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <button type="submit">Eliminar Grupo</button>
        </div>
      </form>
    </div>
  );
}

export default DeleteGrupoById;