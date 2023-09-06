import { useState } from 'react';
import api from '../../services/api.config.js';

const GetFuncionarioById = () => {
  const [funcionarioId, setFuncionarioId] = useState(''); // Estado para almacenar el ID ingresado
  const [funcionarioInfo, setFuncionarioInfo] = useState(null); // Estado para almacenar la información del funcionario

  const handleInputChange = (event) => {
    setFuncionarioId(event.target.value);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    
    // Realiza una solicitud GET para obtener el funcionario por ID
    api.get(`/funcionarios/${funcionarioId}`)
      .then((response) => {
        // Actualiza el estado con la información del funcionario
        setFuncionarioInfo(response.data);
      })
      .catch((error) => {
        console.error('Error al obtener el funcionario por ID:', error);
        // Puedes manejar errores aquí, por ejemplo, mostrar un mensaje de error
      });
  }

  return (
    <div>
      <h2>Obtener Funcionario por ID</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>ID del Funcionario:</label>
          <input
            type="text"
            value={funcionarioId}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <button type="submit">Obtener Funcionario</button>
        </div>
      </form>
      {funcionarioInfo && (
        <div>
          <h3>Información del Funcionario</h3>
          <p>ID: {funcionarioInfo.id}</p>
          <p>Nombre: {funcionarioInfo.nombre}</p>
          <p>Apellido1: {funcionarioInfo.apellido1}</p>
          <p>Apellido2: {funcionarioInfo.apellido2}</p>
          <p>Fecha de Nacimiento: {funcionarioInfo.fechaNacimiento}</p>
          <p>Edad: {funcionarioInfo.edad}</p>
          <p>Sexo: {funcionarioInfo.sexo === false ? "Hombre" : "Mujer"}</p>
        </div>
      )}
    </div>
  );
}

export default GetFuncionarioById;
