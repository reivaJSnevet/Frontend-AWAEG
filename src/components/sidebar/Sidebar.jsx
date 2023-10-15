import { Link, useNavigate } from "react-router-dom";
import useLogout from "../../hooks/useLogout";

const Sidebar = () => {
    const navigate = useNavigate();
    const logout = useLogout();

    const signOut = async () => {
        await logout();
        navigate("/login");
    }

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
          <Link to="archivos">Archivos</Link>
        </li>
        <li>
          <Link to="/perfil">Perfil</Link>
        </li>
        <br />
        <div>
            <button onClick={signOut}>Cerrar sesión</button>
        </div>
      </ul>
    </div>
  );
}

export default Sidebar;
