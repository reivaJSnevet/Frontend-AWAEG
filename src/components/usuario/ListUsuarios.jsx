import React, { useState, useEffect } from "react";
import api from "../../services/api.config";

const ListUsuarios = () => {
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    // Realiza una solicitud GET para obtener todos los usuarios
    api.get('/usuarios')
      .then((response) => {
        // Actualiza el estado con los usuarios obtenidos
        setUsuarios(response.data);
      })
      .catch((error) => {
        console.error('Error al obtener los usuarios:', error);
      });
  }, []); // El [] como segundo argumento asegura que este efecto se ejecute solo una vez al montar el componente

  return (
    <div>
      <h2>Lista de Usuarios</h2>
      <ul>
        {usuarios.map((usuario) => (
          <li key={usuario.id}>
            <strong>{usuario.nombre}</strong> - Correo: {usuario.correo} - Rol: {usuario.role.nombre}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ListUsuarios;
