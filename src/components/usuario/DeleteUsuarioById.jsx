import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import Swal from "sweetalert2";

const DeleteUsuarioById = () => {
    const api = useAxiosPrivate();
    const { paramId } = useParams();
  const [usuarioId, setUsuarioId] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    setUsuarioId(paramId);
  }, []);

  const handleInputChange = (event) => {
    const inputValue = event.target.value;

    if (/^\d+$/.test(inputValue) || inputValue === '') {
      setUsuarioId(inputValue);
      setErrorMessage('');
    } else {
      setErrorMessage('Ingrese solo números');
    }
  }

  const handleDelete = (event) => {
    event.preventDefault();

  
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción eliminará el usuario. ¿Estás seguro de que deseas continuar?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        // Usuario confirmó la eliminación
        api.delete(`/usuarios/${usuarioId}`)
          .then(() => {
            Swal.fire(
              'Eliminado',
              'El usuario ha sido eliminado con éxito.',
              'success'
            );
            setUsuarioId('');
          })
          .catch((error) => {
            console.error('Error al eliminar el usuario por ID:', error);
            Swal.fire(
              'Error',
              'Hubo un error al eliminar el usuario. Por favor, inténtelo de nuevo.',
              'error'
            );
          });
      }
    });
  }

  return (
    <div className="max-w-md p-6 mx-auto mt-10 bg-purple-400 rounded-lg shadow-lg">
      <h2 className="mb-4 text-2xl font-bold text-white">Eliminar Usuario por ID</h2>
      <form onSubmit={handleDelete} className="space-y-4">
        <div>
          <label className="block mb-1 text-sm font-medium text-white">ID del Usuario a Eliminar:</label>
          <input
            type="text"
            value={usuarioId}
            onChange={handleInputChange}
            disabled
            className="w-full p-2 bg-gray-300 border border-white rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
          />
        </div>
        <div>
          <button
            type="submit"
            className="w-full p-2 text-white bg-purple-300  rounded-md hover:bg-[#F7A834]  focus:outline-none focus:ring focus:ring-gray-700"
          >
            Eliminar Usuario
          </button>
        </div>
      </form>
    </div>
  );
}

export default DeleteUsuarioById;
