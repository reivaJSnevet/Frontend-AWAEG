import {Outlet } from 'react-router-dom';
import Sidebar from '../../components/sidebar/Sidebar';

function PanelAdmin() {
  return (
    <div className="panel-admin">
      <Sidebar />
      <main>
        <Outlet/>
      </main>
    </div>
  );
}

export default PanelAdmin;


