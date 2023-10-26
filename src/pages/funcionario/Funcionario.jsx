import { Link, Outlet } from 'react-router-dom';

function Funcionario() {
  return (
    <div className="roles-container">
      <div className="roles-content">
        <nav className="roles-tabs">
          <ul>
              <li><Link to="../funcionarios">Ver todo</Link></li>
              <li><Link to="crear">Crear</Link></li>
              <li><Link to="buscar">Buscar</Link></li>
          </ul>
        </nav>
        <Outlet />
      </div>
    </div>
  );
}

export default Funcionario;
