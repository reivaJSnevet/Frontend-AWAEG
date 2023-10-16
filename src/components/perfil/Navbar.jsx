import { Link } from "react-router-dom";
import useLogout from "../../hooks/useLogout";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const logout = useLogout();

  const signOut = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <ul className="flex gap-4 justify-evenly">
      <li>
          <Link className="font-extrabold text-purple-700 hover:text-purple-900" to="datosPersonales">
            Datos Personales
          </Link>
        </li>
        <li>
          <Link className="font-extrabold text-yellow-500 hover:text-yellow-600" to="notas">
            Notas
          </Link>
        </li>
        <li>
          <Link className="font-extrabold text-purple-700 hover:text-purple-900" to="horario">
            Horario
          </Link>
        </li>
        <li>
          <Link className="font-extrabold text-yellow-500 hover:text-yellow-600" to="tareas">
            Tareas
          </Link>
        </li>
        <li>
        <button
          className="px-4 py-2 font-bold text-white bg-red-500 rounded hover:bg-red-700"
          onClick={signOut}
        >
          Cerrar sesión
        </button>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
