import { Link, Outlet } from "react-router-dom";

function InsumoInstitucional() {
  return (
    <div>
    <div className="h-[80vh] w-[150vh]  p-8 rounded-xl ">
      <nav className="flex justify-center mb-8 gap-6 p-1 rounded-lg bg-purple-400">
          <Link
            className="flex items-center gap-4 text-white font-semibold hover:bg-[#F7A834] p-4  rounded-lg transition-colors"
            to="../insumoInstitucional"
          >
            Ver todo
          </Link>
          <Link
            className="flex items-center gap-4 text-white font-semibold hover:bg-[#F7A834] p-4  rounded-lg transition-colors"
            to="crear"
          >
            Crear
          </Link>
          <Link
            className="flex items-center gap-4 text-white font-semibold hover:bg-[#F7A834] p-4  rounded-lg transition-colors"
            to="buscar"
          >
            Buscar
          </Link>
        </nav>
        <Outlet />
      </div>
    </div>
  );
}

export default InsumoInstitucional;
