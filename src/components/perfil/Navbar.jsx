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
  <nav className="flex items-center justify-between p-4 rounded-lg bg-gray-500 relative">
  <Link>
  </Link>
  <div className="flex items-center space-x-4 lg:space-x-8">
        <button
          className="text-white lg:hidden focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <svg
            className="w-6 h-6 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d={
                menuOpen
                  ? "M6 18L18 6M6 6l12 12"
                  : "M4 6h16M4 12h16M4 18h16"
              }
            ></path>
          </svg>
        </button>
        <div
          className={`lg:flex flex-col lg:flex-row lg:space-x-8 lg:items-center ${
            menuOpen ? "flex" : "hidden"
          }`}
        >
          <Link
            to="../perfil"
            className="nav-link text-white"
            onClick={() => setMenuOpen(false)}
          >
            Datos Personales
          </Link>
          <Link
            to="notas"
            className="nav-link text-white"
            onClick={() => setMenuOpen(false)}
          >
            Notas
          </Link>
          <Link
            to="horario"
            className="nav-link text-white"
            onClick={() => setMenuOpen(false)}
          >
            Horario
          </Link>
          <Link
            to="tareas"
            className="nav-link text-white"
            onClick={() => setMenuOpen(false)}
          >
            Tareas
          </Link>
          <Link
            to="citas"
            className="nav-link text-white"
            onClick={() => setMenuOpen(false)}
          >
            Citas
          </Link>
          <button
            type="button"
            className="px-4 py-2 font-bold text-white bg-red-500 rounded hover:bg-red-700"
            onClick={signOut}
          >
            Cerrar sesión
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
