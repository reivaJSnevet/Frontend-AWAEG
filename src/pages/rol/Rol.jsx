import { Link, Outlet } from 'react-router-dom';

function Rol() {
  return (
    <div >
      <div className="h-[80vh] bg-purple-200 p-8 rounded-xl ">
        <nav className="flex justify-center gap-6 p-1 mb-8 bg-purple-400 rounded-lg shadow-lg">
          
              <Link to="../roles" className="flex items-center gap-4 p-4 font-semibold text-white transition-colors rounded-lg hover:bg-purple-600">
                Ver todo
              </Link>
           
            
              <Link to="crear" className="flex items-center gap-4 p-4 font-semibold text-white transition-colors rounded-lg hover:bg-purple-600">
                Crear
              </Link>
            
            
              <Link to="buscar" className="flex items-center gap-4 p-4 font-semibold text-white transition-colors rounded-lg hover:bg-purple-600">
                Buscar
              </Link>
            
        </nav>
        <Outlet />
      </div>
    </div>
  );
}

export default Rol;
