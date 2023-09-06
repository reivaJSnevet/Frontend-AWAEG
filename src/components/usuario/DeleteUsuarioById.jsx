import { useState } from "react";
import api from "../../services/api.config";

const DeleteUsuarioById = () => {
    const [usuarioId, setUsuarioId] = useState('');

    const handleInputChange = (event) => {
        setUsuarioId(event.target.value);
    }

    const handleDelete = (event) => {
        event.preventDefault();

         // Realiza una solicitud DELETE para eliminar el rol por ID
    api.delete(`/usuarios/${usuarioId}`)
    .then(() => {
      // Maneja el éxito, por ejemplo, mostrando un mensaje de éxito
      alert('Usuario eliminado con éxito.');
      // Limpia el campo de entrada después de eliminar el rol
      setRoleId('');
      // Recarga la página
      window.location.reload();
    })
    .catch((error) => {
      console.error('Error al eliminar el Usuario por ID:', error);
      // Puedes manejar errores aquí, por ejemplo, mostrando un mensaje de error
    });

    }

    return(
        <div>
        <h2>Eliminar Usuario por ID</h2>
        <form onSubmit={handleDelete}>
          <div>
            <label>ID del Usuario a Eliminar:</label>
            <input
              type="text"
              value={usuarioId}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <button type="submit">Eliminar Usuario</button>
          </div>
        </form>
      </div>
    )
    

}

export default DeleteUsuarioById;