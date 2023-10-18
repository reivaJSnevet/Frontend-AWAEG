import { Link, Outlet } from "react-router-dom";

function Usuario() {
 return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-purple-500">
    <nav className="fixed top-0 p-4 bg-white shadow-lg">
      <div className="flex justify-center">
        <ul className="flex space-x-4">
          <li>
            <Link to="../usuarios" className="text-purple-500 transition duration-300 hover:text-yellow-500">
              Ver todo
            </Link>
          </li>
          <li>
            <Link to="crear" className="text-purple-500 transition duration-300 hover:text-yellow-500">
              Crear
            </Link>
          </li>
          <li>
            <Link to="buscar" className="text-purple-500 transition duration-300 hover:text-yellow-500">
              Buscar
            </Link>
          </li>
        </ul>
      </div>
    </nav>
    <div className="w-full p-8 mt-16 bg-white rounded-lg shadow-lg">
      <Outlet />
    </div>
  </div>
 );
}

export default Usuario;
