import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import Swal from 'sweetalert2';

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

    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción eliminará el estudiante. ¿Estás seguro de que deseas continuar?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        // Usuario confirmó la eliminación
        api.delete(`/estudiantes/${estudianteId}`)
          .then(() => {
            Swal.fire(
              'Eliminado',
              'El estudiante ha sido eliminado con éxito.',
              'success'
            );
            setEstudianteId('');
          })
          .catch((error) => {
            console.error('Error al eliminar el estudiante por ID:', error);
            Swal.fire(
              'Error',
              'Hubo un error al eliminar el estudiante. Por favor, inténtelo de nuevo.',
              'error'
            );
          });
      }
    });

    // // Realiza una solicitud DELETE para eliminar un Estudiante por ID
    // api.delete(`/estudiantes/${paramId}`)
    //   .then(() => {
    //     // Maneja el éxito, por ejemplo, mostrando un mensaje de éxito
    //     alert('Estudiante eliminado con éxito.');
    //     // Limpia el campo de entrada después de eliminar el Estudiante
    //     setEstudianteId('');
    //     // Recarga la página
    //   })
    //   .catch((error) => {
    //     console.error('Error al eliminar el Estudiante por ID:', error);
    //     // Puedes manejar errores aquí, por ejemplo, mostrando un mensaje de error
    //   });
  }

  return (
    <div className="max-w-md p-6 mx-auto mt-10 bg-purple-400 rounded-lg shadow-lg">
      <h2 className="mb-4 text-2xl font-bold text-white">Eliminar Estudiante por ID</h2>
      <form className="space-y-4" onSubmit={handleDelete}>
        <div>
          <label  className="block mb-1 text-sm font-medium text-white">ID del Estudiante a Eliminar:</label>
          <input
            type="text"
            value={estudianteId}
            onChange={handleInputChange}
            className="w-full p-2 bg-transparent border border-white rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
            disabled
          />
        </div>
        <div>
          <button  className="w-full p-2 text-white bg-purple-300  rounded-md hover:bg-[#F7A834]  focus:outline-none focus:ring focus:ring-gray-700">Eliminar Estudiante</button>
        </div>
      </form>
    </div>
  );
}

export default DeleteEstudianteBYId;