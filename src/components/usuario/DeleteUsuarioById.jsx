import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

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

    const confirmDelete = window.confirm('¿Estás seguro de eliminar este usuario?');

    if (confirmDelete) {
      api.delete(`/usuarios/${usuarioId}`)
        .then(() => {
          setSuccessMessage('Usuario eliminado con éxito.');

          // Limpia el campo de entrada después de eliminar al usuario
          setUsuarioId('');

          // Borra el mensaje de éxito después de 5 segundos
          setTimeout(() => {
            setSuccessMessage('');
          }, 5000);
        })
        .catch((error) => {
          if (error.response && error.response.status === 404) {
            setErrorMessage('Usuario no encontrado.');
          } else {
            console.error('Error al eliminar el Usuario por ID:', error);
            setErrorMessage('Error al eliminar el usuario.');
          }
        });
    }
  }

  return (
    <div>
      <h2>Eliminar Usuario por ID</h2>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
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
  );
}

export default DeleteUsuarioById;
