import { Link, Outlet } from "react-router-dom";

function Funcionario() {
  return (
    <div className="">
      <div className="h-[80vh] w-[150vh] bg-red-900 p-8 rounded-xl ">
        <nav className="flex justify-center mb-8 gap-6 p-1 rounded-lg bg-blue-400">
          <Link
            to="../funcionarios"
            className="flex items-center gap-4 text-white font-semibold hover:bg-purple-300 p-4  rounded-lg transition-colors"
          >
            Ver todo
          </Link>
          <Link
            to="crear"
            className="flex items-center gap-4 text-white font-semibold hover:bg-purple-300 p-4  rounded-lg transition-colors"
          >
            Crear
          </Link>
          <Link
            to="buscar"
            className="flex items-center gap-4 text-white font-semibold hover:bg-purple-300 p-4  rounded-lg transition-colors"
          >
            Buscar
          </Link>
        </nav>
        <Outlet />
      </div>
    </div>
  );
}

export default Funcionario;
