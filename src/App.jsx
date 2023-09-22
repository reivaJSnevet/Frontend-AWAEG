import { Route, Routes } from "react-router-dom";
import PanelAdmin from "./pages/admin/PanelAdmin";
import Rol from "./pages/rol/Rol";
import Perfil from "./pages/perfil/perfil";
import ListRoles from "./components/rol/ListAll";
import AddRol from "./components/rol/AddRole";
import GetRolById from "./components/rol/GetById";
import DeleteRolById from "./components/rol/DeleteRole";

import Funcionario from "./pages/funcionario/Funcionario";
import ListFuncionarios from "./components/funcionario/ListAll";
import AddFuncionario from "./components/funcionario/AddFuncionario";
import "./App.css";
import GetFuncionarioById from "./components/funcionario/GetById";
import DeleteFuncionarioById from "./components/funcionario/DeleteFuncionario";
import Estudiante from "./pages/estudiante/Estudiante";
import AddEstudiante from "./components/estudiante/AddEstudiante";
import ListEstudiantes from "./components/estudiante/ListAll";
import GetEstudianteById from "./components/estudiante/GetById";
import DeleteEstudianteBYId from "./components/estudiante/DeleteEstudiante";
import Grupo from "./pages/grupo/Grupo";
import AddGrupo from "./components/grupo/AddGrupo";
import ListGrupos from "./components/grupo/ListAll";
import GetGrupoById from "./components/grupo/GetById";
import DeleteGrupoById from "./components/grupo/DeleteById";
import Horario from "./pages/horario/Horario";
import AddHorario from "./components/horario/AddHorario";
import ListHorarios from "./components/horario/ListAll";
import GetHorarioById from "./components/horario/GetById";
import DeleteHorarioById from "./components/horario/DeleteHorario";
import Nota from "./pages/nota/Nota";
import AddNota from "./components/nota/AddNota";
import ListNotas from "./components/nota/ListAll";
import GetNotaById from "./components/nota/GetById";
import DeleteNotaById from "./components/nota/DeleteNota";
import UpdateFuncionario from "./components/funcionario/UpdateFuncionario";
import UpdateEstudiante from "./components/estudiante/UpdateEstudiante";
import UpdateGrupo from "./components/grupo/UpdateGrupo";
import Clases from "./pages/clases/Clases";
import ListAll from "./components/clase/ListAll";
import CrearClase from "./components/clase/crearClase";
import GetById from "./components/clase/GetById";
import UpdateClase from "./components/clase/UpdateClase";
import DeleteClase from "./components/clase/DeleteClase";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/perfil" element={<Perfil />} />
        <Route path="/admin/*" element={<PanelAdmin />}>
          <Route path="roles" element={<Rol />}>
            <Route path="todo" element={<ListRoles />} />
            <Route path="crear" element={<AddRol />} />
            <Route path="buscar" element={<GetRolById />} />
            {/* <Route path="actualizar" element={<Update />} /> */}
            <Route path="borrar" element={<DeleteRolById />} />
            <Route path="borrar/:id" element={<DeleteRolById />} />
          </Route>
          <Route path="funcionarios" element={<Funcionario />}>
            <Route path="todo" element={<ListFuncionarios />} />
            <Route path="crear" element={<AddFuncionario />} />
            <Route path="buscar" element={<GetFuncionarioById />} />
            <Route path="actualizar" element={<UpdateFuncionario />} />
            <Route path="actualizar/:id" element={<UpdateFuncionario />} />
            <Route path="borrar" element={<DeleteFuncionarioById />} />
            <Route path="borrar/:id" element={<DeleteFuncionarioById />} />
          </Route>
          <Route path="estudiantes" element={<Estudiante />}>
            <Route path="todo" element={<ListEstudiantes />} />
            <Route path="crear" element={<AddEstudiante />} />
            <Route path="buscar" element={<GetEstudianteById />} />
            <Route path="actualizar" element={<UpdateEstudiante />} />
            <Route path="actualizar/:id" element={<UpdateEstudiante />} />ß
            <Route path="borrar" element={<DeleteEstudianteBYId />} />
            <Route path="borrar/:id" element={<DeleteEstudianteBYId />} />
          </Route>
          <Route path="grupos" element={<Grupo />}>
            <Route path="todo" element={<ListGrupos />} />
            <Route path="crear" element={<AddGrupo />} />
            <Route path="buscar" element={<GetGrupoById />} />
            <Route path="actualizar" element={<UpdateGrupo />} />
            <Route path="actualizar/:seccion" element={<UpdateGrupo />} />
            <Route path="borrar" element={<DeleteGrupoById />} />
            <Route path="borrar/:seccion" element={<DeleteGrupoById />} />
          </Route>
          <Route path="horarios" element={<Horario />}>
            <Route path="todo" element={<ListHorarios />} />
            <Route path="crear" element={<AddHorario />} />
            <Route path="buscar" element={<GetHorarioById />} />
            {/* <Route path="actualizar" element={<Update />} /> */}
            <Route path="borrar" element={<DeleteHorarioById />} />
            <Route path="borrar/:id" element={<DeleteHorarioById />} />
          </Route>
          <Route path="notas" element={<Nota />}>
            <Route path="todo" element={<ListNotas />} />
            <Route path="crear" element={<AddNota />} />
            <Route path="buscar" element={<GetNotaById />} />
            {/* <Route path="actualizar" element={<Update />} /> */}
            <Route path="borrar" element={<DeleteNotaById />} />
            <Route path="borrar/:id" element={<DeleteNotaById />} />
          </Route>
          <Route path="clases" element={<Clases />}>
            <Route path="todo" element={<ListAll />} />
            <Route path="crear" element={<CrearClase />} />
            <Route path="buscar" element={<GetById />} />
            <Route path="actualizar" element={<UpdateClase />} />
            <Route path="actualizar/:id" element={<UpdateClase />} />
            <Route path="borrar" element={<DeleteClase />} />
            <Route path="borrar/:paramId" element={<DeleteClase />} />
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
