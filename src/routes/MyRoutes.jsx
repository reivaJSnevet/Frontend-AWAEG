import { Route, Routes } from "react-router-dom";
import PanelAdmin from "../pages/admin/PanelAdmin";
import Rol from "../pages/rol/Rol";
import Perfil from "../pages/perfil/perfil";
import ListRoles from "../components/rol/ListAll";
import AddRol from "../components/rol/AddRole";
import GetRolById from "../components/rol/GetById";
import DeleteRolById from "../components/rol/DeleteRole";
import Funcionario from "../pages/funcionario/Funcionario";
import ListFuncionarios from "../components/funcionario/ListAll";
import AddFuncionario from "../components/funcionario/AddFuncionario";
import GetFuncionarioById from "../components/funcionario/GetById";
import DeleteFuncionarioById from "../components/funcionario/DeleteFuncionario";
import Estudiante from "../pages/estudiante/Estudiante";
import AddEstudiante from "../components/estudiante/AddEstudiante";
import ListEstudiantes from "../components/estudiante/ListAll";
import GetEstudianteById from "../components/estudiante/GetById";
import DeleteEstudianteById from "../components/estudiante/DeleteEstudiante";
import Grupo from "../pages/grupo/Grupo";
import AddGrupo from "../components/grupo/AddGrupo";
import ListGrupos from "../components/grupo/ListAll";
import GetGrupoById from "../components/grupo/GetById";
import DeleteGrupoById from "../components/grupo/DeleteById";
import Horario from "../pages/horario/Horario";
import AddHorario from "../components/horario/AddHorario";
import ListHorarios from "../components/horario/ListAll";
import GetHorarioById from "../components/horario/GetById";
import DeleteHorarioById from "../components/horario/DeleteHorario";
import Nota from "../pages/nota/Nota";
import AddNota from "../components/nota/AddNota";
import ListNotas from "../components/nota/ListAll";
import GetNotaById from "../components/nota/GetById";
import DeleteNotaById from "../components/nota/DeleteNota";
import UpdateFuncionario from "../components/funcionario/UpdateFuncionario";
import UpdateEstudiante from "../components/estudiante/UpdateEstudiante";
import UpdateGrupo from "../components/grupo/UpdateGrupo";
import Clases from "../pages/clases/Clases";
import ListAll from "../components/clase/ListAll";
import CrearClase from "../components/clase/crearClase";
import GetById from "../components/clase/GetById";
import UpdateClase from "../components/clase/UpdateClase";
import DeleteClase from "../components/clase/DeleteClase";
import UpdateNota from "../components/nota/UpdateNota";
import Login from "../pages/login/Login";
import DatosPersonales from "../components/perfil/DatosPersonales";
import Notas from "../components/perfil/Notas";
import MiHorario from "../components/perfil/MiHorario";
import Archivo from "../pages/archivo/Archivo";
import SubirArchivo from "../components/archivo/SubirArchivo";
import ListaArchivos from "../components/archivo/ListaArchivos";
import Usuario from "../pages/usuario/Usuario";
import ListUsuarios from "../components/usuario/ListUsuarios";
import AddUsuario from "../components/usuario/AddUsuario";
import GetUsuarioById from "../components/usuario/GetUsuarioById";
import UpdateUsuario from "../components/usuario/UpdateUsuario";
import DeleteUsuarioById from "../components/usuario/DeleteUsuarioById";

const MyRoutes = () => (
  <Routes>
    <Route path="/" element={<Login />} />
    <Route path="/perfil" element={<Perfil />}>
        <Route path="notas" element={<Notas />}/>
        <Route path="datosPersonales" element={<DatosPersonales/>}/>
        <Route path="horario" element={<MiHorario />}/>
        <Route path="tareas" element={<ListaArchivos/>}/>
    </Route>

    <Route path="/admin/*" element={<PanelAdmin />}>
      {/* Rutas para roles */}
      <Route path="roles" element={<Rol />}>
        <Route path="todo" element={<ListRoles />} />
        <Route path="crear" element={<AddRol />} />
        <Route path="buscar" element={<GetRolById />} />
        <Route path="borrar" element={<DeleteRolById />} />
      </Route>

      {/* Rutas para funcionarios */}
      <Route path="funcionarios" element={<Funcionario />}>
        <Route path="todo" element={<ListFuncionarios />} />
        <Route path="crear" element={<AddFuncionario />} />
        <Route path="buscar" element={<GetFuncionarioById />} />
        <Route path="actualizar" element={<UpdateFuncionario />} />
        <Route path="borrar" element={<DeleteFuncionarioById />} />
      </Route>

      {/* Rutas para estudiantes */}
      <Route path="estudiantes" element={<Estudiante />}>
        <Route path="todo" element={<ListEstudiantes />} />
        <Route path="crear" element={<AddEstudiante />} />
        <Route path="buscar" element={<GetEstudianteById />} />
        <Route path="actualizar" element={<UpdateEstudiante />} />
        <Route path="borrar" element={<DeleteEstudianteById />} />
      </Route>

      {/* Rutas para grupos */}
      <Route path="grupos" element={<Grupo />}>
        <Route path="todo" element={<ListGrupos />} />
        <Route path="crear" element={<AddGrupo />} />
        <Route path="buscar" element={<GetGrupoById />} />
        <Route path="actualizar" element={<UpdateGrupo />} />
        <Route path="borrar" element={<DeleteGrupoById />} />
      </Route>

      {/* Rutas para horarios */}
      <Route path="horarios" element={<Horario />}>
        <Route path="todo" element={<ListHorarios />} />
        <Route path="crear" element={<AddHorario />} />
        <Route path="buscar" element={<GetHorarioById />} />
        <Route path="borrar" element={<DeleteHorarioById />} />
      </Route>

      {/* Rutas para notas */}
      <Route path="notas" element={<Nota />}>
        <Route path="todo" element={<ListNotas />} />
        <Route path="crear" element={<AddNota />} />
        <Route path="buscar" element={<GetNotaById />} />
        <Route path="actualizar" element={<UpdateNota />} />
        <Route path="borrar" element={<DeleteNotaById />} />
      </Route>

      {/* Rutas para clases */}
      <Route path="clases" element={<Clases />}>
        <Route path="todo" element={<ListAll />} />
        <Route path="crear" element={<CrearClase />} />
        <Route path="buscar" element={<GetById />} />
        <Route path="actualizar" element={<UpdateClase />} />
        <Route path="borrar" element={<DeleteClase />} />
      </Route>
      <Route path="archivos" element={<Archivo/>}>
        <Route path="subir" element={<SubirArchivo/>}/>
        <Route path="lista" element={<ListaArchivos/>}/>
      </Route>

      <Route path="usuarios" element={<Usuario />}>
        <Route path="todo" element={<ListUsuarios />} /> {/* Ruta para Crear */}
        <Route path="crear" element={<AddUsuario />} /> {/* Ruta para Crear */}
        <Route path="buscar" element={<GetUsuarioById />} /> {/* Ruta para Buscar */}
        <Route path="actualizar" element={<UpdateUsuario />} /> {/* Ruta para Actualizar */}
        <Route path="borrar" element={<DeleteUsuarioById />} /> {/* Ruta para Borrar */}
      </Route>

    </Route>
  </Routes>
);

export default MyRoutes;
