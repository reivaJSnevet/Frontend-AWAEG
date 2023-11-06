import { Link, Outlet } from 'react-router-dom';

function Cita() {
  return (
    <div className="roles-container">
    <div className="roles-content">
      <nav className="roles-tabs">
        <ul>
            <li><Link to="../citas">Lista</Link></li>
            <li><Link to="crear">Crear cita</Link></li> 
        </ul>
      </nav>
      <Outlet />
    </div>
  </div>  )
}

export default Cita