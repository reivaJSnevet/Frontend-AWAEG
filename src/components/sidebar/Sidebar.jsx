import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div className="sidebar">
      <ul>
        <li>
          <Link to="roles">Roles</Link>
        </li>
        <li>
          <Link to="usuarios">Usuarios</Link>
        </li>
        <li>
          <Link to="funcionarios">Funcionarios</Link>
        </li>
        <li>
          <Link to="estudiantes">Estudiantes</Link>
        </li>
        <li>
          <Link to="grupos">Grupos</Link>
        </li>
        <li>
          <Link to="horarios">Horarios</Link>
        </li>
        <li>
          <Link to="clases">Clases</Link>
        </li>
        <li>
          <Link to="notas">Notas</Link>
        </li>
        <li>
          <Link to="/perfil">Perfil</Link>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
