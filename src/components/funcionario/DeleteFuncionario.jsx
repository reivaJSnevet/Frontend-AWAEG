import { useState, useEffect} from "react";
import { useParams } from "react-router-dom";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import Swal from "sweetalert2";

const DeleteFuncionarioById = () => {
    const api = useAxiosPrivate();
  const [funcionarioId, setFuncionarioId] = useState("");
  const {paramId} = useParams();

  useEffect(() => { 
    if(paramId){
        setFuncionarioId(paramId);
    }else{
        setFuncionarioId('');
    }
  }, [paramId]);

  const handleInputChange = (event) => {
    setFuncionarioId(event.target.value);
  };

  const handleDelete = (event) => {
    event.preventDefault();

    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción eliminará el funcionario. ¿Estás seguro de que deseas continuar?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        // Usuario confirmó la eliminación
        api.delete(`/funcionarios/${funcionarioId}`)
          .then(() => {
            Swal.fire(
              'Eliminado',
              'El funcionario ha sido eliminado con éxito.',
              'success'
            );
            setFuncionarioId('');
            window.location.reload();
          })
          .catch((error) => {
            console.error('Error al eliminar el funcionario por ID:', error);
            Swal.fire(
              'Error',
              'Hubo un error al eliminar el funcionario. Por favor, inténtelo de nuevo.',
              'error'
            );
          });
      }
    });
    // // Realiza una solicitud DELETE para eliminar un Funcionario por ID
    // api
    //   .delete(`/funcionarios/${funcionarioId}`)
    //   .then(() => {
    //     // Maneja el éxito, por ejemplo, mostrando un mensaje de éxito
    //     alert("Funcionario eliminado con éxito.");
    //     // Limpia el campo de entrada después de eliminar el funcionario
    //     setFuncionarioId("");
    //     // Recarga la página
    //     window.location.reload();
    //   })
    //   .catch((error) => {
    //     console.error("Error al eliminar el Funcionario por ID:", error);
        
    //     // Puedes manejar errores aquí, por ejemplo, mostrando un mensaje de error
    //   });
  };

  return (
    <div className="relative max-w-md p-6 mx-auto mt-10 overflow-hidden bg-purple-600 rounded-lg shadow-lg">
      <h2 className="relative mb-4 text-2xl font-bold text-white">Eliminar Funcionario por ID</h2>
      <form onSubmit={handleDelete} className="relative space-y-4">
        <div>
          <label className="text-white">ID del Funcionario a Eliminar:</label>
          <input
            type="text"
            value={funcionarioId}
            onChange={handleInputChange}
            disabled
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
          />
        </div>
        <button
          type="submit"
          className="w-full p-2 text-white bg-purple-300  rounded-md hover:bg-[#F7A834]  focus:outline-none focus:ring focus:ring-gray-700"
        >
          Eliminar Funcionario
        </button>
      </form>
    </div>
  );
};

export default DeleteFuncionarioById;
