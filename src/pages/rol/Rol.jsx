import { Link, Outlet } from 'react-router-dom';

function Rol() {
  return (
    <div className="rol">
      <nav>
        <ul>
            <li><Link to="todo">Ver todo</Link></li>
            <li><Link to="crear">Crear</Link></li>
            <li><Link to="buscar">Buscar</Link></li>
            <li><Link to="actualizar">Actualizar</Link></li>
            <li><Link to="borrar">Borrar</Link></li>
        </ul>
      </nav>
      <Outlet />
    </div>
  );
}

export default Rol;



