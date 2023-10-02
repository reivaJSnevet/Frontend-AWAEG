import { useEffect, useState } from 'react';
import api from '../../services/api.config.js';
import { useNavigate } from 'react-router-dom';

const Notas = () => {
  const userId = localStorage.getItem("userId"); // Obtiene el ID del usuario del local storage
  const [notas, setNotas] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Verificar si el usuario está autenticado
    if (!userId) {
      navigate('/login'); // Redirigir a la página de inicio de sesión si el usuario no está autenticado
      return;
    }

    // Obtener notas del API usando el ID del usuario
    api.get(`/users/${userId}/notas`)
      .then(response => {
        setNotas(response.data);
      })
      .catch(error => {
        console.error('Error fetching notes:', error);
        // Handle error (e.g., show an error message)
      });
  }, [userId, navigate]);

  return (
    <div>
      <h1>Notas</h1>
      <ul>
        {notas.map(nota => (
          <li key={nota.id}>{nota.contenido}</li>
        ))}
      </ul>
    </div>
  );
};

export default Notas;
