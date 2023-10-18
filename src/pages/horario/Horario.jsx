import { Link, Outlet } from 'react-router-dom';

function Horario() {
  return (
    <div className="roles-container">
      <div className="roles-content">
        <nav className="roles-tabs">
          <ul>
              <li><Link to="../horarios">Ver todo</Link></li>
              <li><Link to="crear">Crear</Link></li>
              <li><Link to="buscar">Buscar</Link></li>
              <li><Link to="actualizar">Actualizar</Link></li>
              <li><Link to="borrar">Borrar</Link></li>
          </ul>
        </nav>
        <Outlet />
      </div>
    </div>
  );
}

export default Horario;