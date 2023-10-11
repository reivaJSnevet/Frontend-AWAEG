import {Outlet } from 'react-router-dom';
import Users from '../../components/auth/Users';
import Sidebar from '../../components/sidebar/Sidebar';
import Solicitud from '../../components/solicitud/Solicitud';

function PanelAdmin() {
  return (
    <div className="panel-admin">
      <Sidebar />
      <main>
        <Users />
        <br/>
        <Outlet/>
      </main>
     <Solicitud/>
    </div>
  );
}

export default PanelAdmin;


