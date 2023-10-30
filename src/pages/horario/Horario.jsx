import { Link, Outlet } from "react-router-dom";

function Horario() {
  return (
    <div className="">
      <div className="h-[80vh] w-[150vh] bg-red-900 p-8 rounded-xl ">
        <nav className="flex justify-center mb-8 gap-6 p-1 rounded-lg bg-blue-400">
          <Link
            to="../horarios"
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

    // <div className="roles-container">
    //   <div className="roles-content">
    //     <nav className="roles-tabs">
    //       <ul>
    //           <li><Link to="../horarios">Ver todo</Link></li>
    //           <li><Link to="crear">Crear</Link></li>
    //           <li><Link to="buscar">Buscar</Link></li>
    //           <li><Link to="actualizar">Actualizar</Link></li>
    //           <li><Link to="borrar">Borrar</Link></li>
    //       </ul>
    //     </nav>
    //     <Outlet />
    //   </div>
    // </div>
  );
}

export default Horario;
