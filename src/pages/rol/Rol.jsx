import { Link, Outlet } from 'react-router-dom';

function Rol() {
  return (
    <div className="flex items-center justify-center h-screen bg-purple-500">
      <div className="w-full p-8 bg-white rounded-lg shadow-lg">
        <nav className="flex justify-center mb-6">
          <ul className="flex space-x-4">
            <li>
              <Link to="../roles" className="text-purple-500 transition duration-300 hover:text-yellow-500">
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
        </nav>
        <Outlet />
      </div>
    </div>
  );
}

export default Rol;
