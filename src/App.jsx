import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PanelAdmin from './pages/admin/PanelAdmin';
import Rol from './pages/rol/Rol';
import Perfil from './pages/perfil/perfil';
import Usuario from './pages/usuario/Usuario';
import ListUsuarios from './components/usuario/ListUsuarios'
import AddUsuario from './components/usuario/AddUsuario'
import GetUsuarioById from './components/usuario/GetUsuarioById'
import DeleteUsuarioById from './components/usuario/DeleteUsuarioById';
import ListRoles from './components/rol/ListAll'
import AddRol from './components/rol/AddRole'
import GetRolById from './components/rol/GetById'
import DeleteRolById from './components/rol/DeleteRole'
import UpdateUsuario from './components/usuario/UpdateUsuario';


function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/perfil/*" element={<Perfil />} /> {/* Ruta para Borrar */}
          <Route path="/admin/*" element={<PanelAdmin />} />
          
          {/* Rutas de Usuario */}
          <Route path="/usuarios/*" element={<Usuario />}>
          <Route index element={<ListUsuarios />} />
            <Route path="todo" element={<ListUsuarios />} /> {/* Ruta para Crear */}
            <Route path="crear" element={<AddUsuario />} /> {/* Ruta para Crear */}
            <Route path="buscar" element={<GetUsuarioById />} /> {/* Ruta para Buscar */}
            <Route path="actualizar" element={<UpdateUsuario />} /> {/* Ruta para Actualizar */}
            <Route path="borrar" element={<DeleteUsuarioById />} /> {/* Ruta para Borrar */}
          </Route>

          
          <Route path="/roles/*" element={<Rol />}>
            <Route index element={<ListRoles />} />
            <Route path="todo" element={<ListRoles />} /> {/* Ruta para Crear */}
            <Route path="crear" element={<AddRol />} /> {/* Ruta para Crear */}
            <Route path="buscar" element={<GetRolById />} /> {/* Ruta para Buscar */}
            {/* <Route path="actualizar" element={<Update />} /> {/* Ruta para Actualizar */}
            <Route path="borrar" element={<DeleteRolById />} /> {/* Ruta para Borrar */}
           
          </Route>
          {/* Otras rutas */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;



















/* import AddRol from './components/rol/AddRol';
import ListRoles from './components/rol/ListRoles';
import GetRoleById from './components/rol/GetRolById';
import DeleteRoleById from './components/rol/DeleteRolById';

function App() {
  return (
    <>
        <AddRol/>
        <ListRoles/>
        <GetRoleById/>
        <DeleteRoleById/>
    </>
  );
 
}

export default App; */
