import { useState, useEffect } from "react";
import api from "../../services/api.config";

const ListUsuarios = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [roles, setRoles] = useState({});

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

  useEffect(() => {
    // Realiza una solicitud GET para obtener todos los roles
    api.get('/roles')
      .then((response) => {
        // Crea un objeto de roles donde la clave es el ID del rol y el valor es el nombre del rol
        const rolesData = {};
        response.data.forEach((rol) => {
          rolesData[roles.id] = rol.nombre;
        });
        // Actualiza el estado con los roles obtenidos
        setRoles(rolesData);
      })
      .catch((error) => {
        console.error('Error al obtener los roles:', error);
      });
  }, []); // El [] como segundo argumento asegura que este efecto se ejecute solo una vez al montar el componente

  return (
    <div>
      <h2>Lista de Usuarios</h2>
      <ul>
        {usuarios.map((usuario) => (
          <li key={usuario.id}>
            <strong>{usuario.nombre}</strong> - Correo: {usuario.correo} - Rol: {roles[usuario.roleId]}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ListUsuarios;
