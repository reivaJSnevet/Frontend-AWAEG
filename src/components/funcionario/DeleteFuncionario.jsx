import { useState, useEffect} from "react";
import { useParams } from "react-router-dom";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

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

    // Realiza una solicitud DELETE para eliminar un Funcionario por ID
    api
      .delete(`/funcionarios/${funcionarioId}`)
      .then(() => {
        // Maneja el éxito, por ejemplo, mostrando un mensaje de éxito
        alert("Funcionario eliminado con éxito.");
        // Limpia el campo de entrada después de eliminar el funcionario
        setFuncionarioId("");
        // Recarga la página
        window.location.reload();
      })
      .catch((error) => {
        console.error("Error al eliminar el Funcionario por ID:", error);
        // Puedes manejar errores aquí, por ejemplo, mostrando un mensaje de error
      });
  };

  return (
    <div>
      <h2>Eliminar Funcionario por ID</h2>
      <form onSubmit={handleDelete}>
        <div>
          <label>ID del Funcionario a Eliminar:</label>
          <input
            type="text"
            value={funcionarioId}
            onChange={handleInputChange}
          />
        </div>
        <button type="submit">Eliminar Funcionario</button>
      </form>
    </div>
  );
};

export default DeleteFuncionarioById;
