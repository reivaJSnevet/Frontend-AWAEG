
import { Routes, Route } from 'react-router-dom';
import Sidebar from '../../components/sidebar/Sidebar';
import Rol from '../rol/Rol';

function PanelAdmin() {
  return (
    <div className="panel-admin">
      <Sidebar />
      <main>
        <Routes>
          <Route path="/admin/roles" element={<Rol />} />
          {/* Agrega otras rutas aquí */}
        </Routes>
      </main>
    </div>
  );
}

export default PanelAdmin;


