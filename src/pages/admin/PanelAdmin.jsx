import {Outlet } from 'react-router-dom';
import Sidebar from '../../components/sidebar/Sidebar';
import Solicitud from '../../components/solicitud/Solicitud';

function PanelAdmin() {
  return (
    <div className="panel-admin">
      <Sidebar />
      <main>
        <Outlet/>
      </main>
     <Solicitud/>
    </div>
  );
}

export default PanelAdmin;


