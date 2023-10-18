import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import useAxiosPrivate from '../../hooks/useAxiosPrivate';

const ListFuncionarios = () => {
    const api = useAxiosPrivate();
  const [funcionarios, setFuncionarios] = useState([]);

  useEffect(() => {
    // Realiza una solicitud GET para obtener todos los funcionarios
    api
      .get('/funcionarios')
      .then((response) => {
        // Actualiza el estado con los funcionarios obtenidos
        setFuncionarios(response.data);
      })
      .catch((error) => {
        console.error('Error fetching funcionarios:', error);
      });
  }, []);

  return (
    <div>
    <table className="list-roles-table">
      <thead>
        <tr className="list-roles-tr">
          <th className="roles-th">ID</th>
          <th className="roles-th">Nombre</th>
          <th className="roles-th">Primer Apellido</th>
          <th className="roles-th">Segundo Apellido</th>
          <th className="roles-th">Fecha de Nacimiento</th>
          <th className="roles-th">Edad</th>
          <th className="roles-th">Género</th>
          <th className="roles-th">Acciones</th>
        </tr>
      </thead>
      <tbody>
        {funcionarios.map((funcionario) => (
          <tr key={funcionario.id} className="list-roles-tr">
            <td className="list-roles-td">{funcionario.id}</td>
            <td className="list-roles-td">{funcionario.nombre}</td>
            <td className="list-roles-td">{funcionario.apellido1}</td>
            <td className="list-roles-td">{funcionario.apellido2}</td>
            <td className="list-roles-td">{funcionario.fechaNacimiento}</td>
            <td className="list-roles-td">{funcionario.edad}</td>
            <td className="list-roles-td">{funcionario.sexo === false ? "Hombre" : "Mujer"}</td>
            <td className="list-roles-td">
              <Link to={`../actualizar/${funcionario.id}`}>Actualizar</Link>
              &nbsp;|&nbsp;
              <Link to={`../borrar/${funcionario.id}`}>Borrar</Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
  );
}

export default ListFuncionarios;