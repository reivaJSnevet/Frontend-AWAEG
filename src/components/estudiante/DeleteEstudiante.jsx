import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';

const DeleteEstudianteBYId = () => {
    const api = useAxiosPrivate();
  const [estudianteId, setEstudianteId] = useState('');
  const {paramId} = useParams();

  const handleInputChange = (event) => {
    setEstudianteId(event.target.value);
  }

  useEffect(() => { 
    if(paramId){
        setEstudianteId(paramId);
    }else{
        setEstudianteId('');
    }
  }, [paramId]);

  const handleDelete = (event) => {
    event.preventDefault();

    // Realiza una solicitud DELETE para eliminar un Estudiante por ID
    api.delete(`/estudiantes/${paramId}`)
      .then(() => {
        // Maneja el éxito, por ejemplo, mostrando un mensaje de éxito
        alert('Estudiante eliminado con éxito.');
        // Limpia el campo de entrada después de eliminar el Estudiante
        setEstudianteId('');
        // Recarga la página
      })
      .catch((error) => {
        console.error('Error al eliminar el Estudiante por ID:', error);
        // Puedes manejar errores aquí, por ejemplo, mostrando un mensaje de error
      });
  }

  return (
    <div>
      <h2>Eliminar Estudiante por ID</h2>
      <form onSubmit={handleDelete}>
        <div>
          <label>ID del Estudiante a Eliminar:</label>
          <input
            type="text"
            value={estudianteId}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <button type="submit">Eliminar Estudiante</button>
        </div>
      </form>
    </div>
  );
}

export default DeleteEstudianteBYId;