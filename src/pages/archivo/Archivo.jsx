import { Link, Outlet } from 'react-router-dom';

function Archivo() {
    return (
        <div className="roles-container">
          <div className="roles-content">
            <nav className="roles-tabs">
              <ul>
                  <li><Link to="lista">Lista</Link></li>
                  <li><Link to="subir">Subir</Link></li> 
              </ul>
            </nav>
            <Outlet />
          </div>
        </div>
      );
}

export default Archivo