import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import api from '../../services/api.config.js';

const ListFuncionarios = () => {
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
    <table className="list-funcionarios-table">
      <thead>
        <tr className="list-funcionarios-tr">
          <th className="funcionarios-th">ID</th>
          <th className="funcionarios-th">Nombre</th>
          <th className="funcionarios-th">Primer Apellido</th>
          <th className="funcionarios-th">Segundo Apellido</th>
          <th className="funcionarios-th">Fecha de Nacimiento</th>
          <th className="funcionarios-th">Edad</th>
          <th className="funcionarios-th">Género</th>
          <th className="funcionarios-th">Acciones</th>
        </tr>
      </thead>
      <tbody>
        {funcionarios.map((funcionario) => (
          <tr key={funcionario.id} className="list-funcionarios-tr">
            <td className="list-funcionarios-td">{funcionario.id}</td>
            <td className="list-funcionarios-td">{funcionario.nombre}</td>
            <td className="list-funcionarios-td">{funcionario.apellido1}</td>
            <td className="list-funcionarios-td">{funcionario.apellido2}</td>
            <td className="list-funcionarios-td">{funcionario.fechaNacimiento}</td>
            <td className="list-funcionarios-td">{funcionario.edad}</td>
            <td className="list-funcionarios-td">{funcionario.sexo === false ? "Hombre" : "Mujer"}</td>
            <td className="list-funcionarios-td">
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