import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';

const DeleteNotaById = () => {
    const api = useAxiosPrivate();
  const [notaId, setNotaId] = useState('');
  const {paramId} = useParams();

  const handleInputChange = (event) => {
    setNotaId(event.target.value);
  }

  useEffect(() => { 
    if(paramId){
        setNotaId(paramId);
    }else{
        setNotaId('');
    }
  }, [paramId]);

  const handleDelete = (event) => {
    event.preventDefault();

    // Realiza una solicitud DELETE para eliminar el Nota por ID
    api.delete(`/notas/${paramId}`)
      .then(() => {
        // Maneja el éxito, por ejemplo, mostrando un mensaje de éxito
        alert('Nota eliminado con éxito.');
        // Limpia el campo de entrada después de eliminar el Nota
        setNotaId('');
      })
      .catch((error) => {
        console.error('Error al eliminar el Nota por ID:', error);
        // Puedes manejar errores aquí, por ejemplo, mostrando un mensaje de error
      });
  }

  return (
    <div>
      <h2>Eliminar Nota por ID</h2>
      <form onSubmit={handleDelete}>
        <div>
          <label>ID de la Nota a Eliminar:</label>
          <input
            type="text"
            value={notaId}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <button type="submit">Eliminar Nota</button>
        </div>
      </form>
    </div>
  );
}

export default DeleteNotaById;