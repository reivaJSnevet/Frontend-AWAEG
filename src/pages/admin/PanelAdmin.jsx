import { Outlet } from "react-router-dom";
import Users from "../../components/auth/Users";
import Sidebar from "../../components/sidebar/Sidebar";
/* import Solicitud from '../../components/solicitud/Solicitud'; */

function PanelAdmin() {
  return (
    <div className="grid grid-cols-8">
      <div className="col-span-2">
        <Sidebar />
      </div>
      {/*         <Users /> */}
      <div className="col-span-6 ">
        <Outlet />
      </div>
      {/*      <Solicitud/> */}
    </div>
  );
}

export default PanelAdmin;
