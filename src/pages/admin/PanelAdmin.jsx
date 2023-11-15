import { Outlet } from "react-router-dom";
import Users from "../../components/auth/Users";
import Sidebar from "../../components/sidebar/Sidebar";
import Header from "../../components/sidebar/Header";
/* import Solicitud from '../../components/solicitud/Solicitud'; */

function PanelAdmin() {
  return (
    <div className="min-h-screen grid grid-cols-1 xl:grid-cols-6 bg-slate-100">
        <Sidebar />
      {/*         <Users /> */}
      <div className="xl:col-span-5 ">
        <Header />
          <div className="h-[90vh]  overflow-y-scroll p-8">
            <Outlet />
          </div>
      </div>
      {/*      <Solicitud/> */}
    </div>
  );
}

export default PanelAdmin;
