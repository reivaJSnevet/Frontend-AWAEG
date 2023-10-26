import { useState } from "react";
import { Link } from "react-router-dom";
import useLogout from "../../hooks/useLogout";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const logout = useLogout();

  const signOut = async () => {
    await logout();
    navigate("/");
  };

  return (
    <nav className="flex items-center justify-between p-4 bg-purple-800">
      <Link to="/" className="text-lg font-bold text-white">
        SWAEG
      </Link>
      <div className="flex items-center space-x-8">
        <button
          className="text-white lg:hidden focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d={menuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
            ></path>
          </svg>
        </button>
        <div className={`lg:flex flex-grow items-center justify-center ${menuOpen ? "block" : "hidden"}`}>
          <ul className="flex flex-col lg:flex-row lg:space-x-8 lg:items-center">
            <li>
              <Link
                className="text-white hover:text-yellow-600"
                to="../perfil"
                onClick={() => setMenuOpen(false)}
              >
                Datos Personales
              </Link>
            </li>
            <li>
              <Link
                className="text-white hover:text-yellow-600"
                to="notas"
                onClick={() => setMenuOpen(false)}
              >
                Notas
              </Link>
            </li>
            <li>
              <Link
                className="text-white hover:text-yellow-600"
                to="horario"
                onClick={() => setMenuOpen(false)}
              >
                Horario
              </Link>
            </li>
            <li>
              <Link
                className="text-white hover:text-yellow-600"
                to="tareas"
                onClick={() => setMenuOpen(false)}
              >
                Tareas
              </Link>
            </li>
            <li>
              <Link
                className="text-white hover:text-yellow-600"
                to="citas"
                onClick={() => setMenuOpen(false)}
              >
                Citas
              </Link>
            </li>
            <li>
              <button
                type="button"
                className="px-4 py-2 font-bold text-white bg-red-500 rounded hover:bg-red-700"
                onClick={signOut}
              >
                Cerrar sesión
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
