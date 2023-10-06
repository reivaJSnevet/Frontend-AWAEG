import { Link, Outlet } from 'react-router-dom';

function Clases(/* debe recibir un paramtero para el "to" de la ruta */) {
    return (
        <div className="roles-container">
          <div className="roles-content">
            <nav className="roles-tabs">
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
        </div>
      );
}

export default Clases