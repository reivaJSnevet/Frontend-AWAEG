import { Route, Routes } from 'react-router-dom';
import PanelAdmin from './pages/admin/PanelAdmin';
import Rol from './pages/rol/Rol';
import Perfil from './pages/perfil/perfil';
import ListRoles from './components/rol/ListAll'
import AddRol from './components/rol/AddRole'
import GetRolById from './components/rol/GetById'
import DeleteRolById from './components/rol/DeleteRole'

import Funcionario from './pages/funcionario/Funcionario'
import ListFuncionarios from './components/funcionario/ListAll'
import AddFuncionario from './components/funcionario/AddFuncionario'
import './App.css';


function App() {
  return (
      <div className="App">
        <Routes>
            <Route path='/perfil' element={<Perfil />} />
            <Route path='/admin/*' element={<PanelAdmin />}>
                <Route path='roles' element={<Rol />}>
                    <Route path="todo" element={<ListRoles />} />
                    <Route path="crear" element={<AddRol />} /> 
                    <Route path="buscar" element={<GetRolById />} /> 
                    {/* <Route path="actualizar" element={<Update />} /> */}
                    <Route path="borrar" element={<DeleteRolById />} /> 
                    <Route path="borrar/:id" element={<DeleteRolById />} />
                </Route> 
                <Route path='funcionarios' element={<Funcionario />}>
                    <Route path="todo" element={<ListFuncionarios />} />
                    <Route path="crear" element={<AddFuncionario />} /> 
                    <Route path="buscar" element={<GetRolById />} /> 
                    {/* <Route path="actualizar" element={<Update />} /> */}
                    <Route path="borrar" element={<DeleteRolById />} /> 
                    <Route path="borrar/:id" element={<DeleteRolById />} />
                </Route>
            </Route>
          {/* Otras rutas */}
        </Routes>
      </div>
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
