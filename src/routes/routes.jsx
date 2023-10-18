import { Route } from "react-router-dom";
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
/* import Login from "../pages/login/Login"; */
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
import AddCita from "../components/cita/AddCita";
import Login2 from "../pages/login/Login2";
import RequireAuth from "../components/auth/RequireAuth";
import Unauthorized from "../pages/errors/Unauthorized";
import NotFound from "../pages/errors/NotFound";
import PersistLogin from "../components/auth/PersistLogin";
import Home from "../pages/home/Home";
import ListAllCitas from "../components/cita/ListAllCitas";

const routes = (
  <>
    <Route path="login" element={<Login2 />} />
    <Route path="/" element={<Home />} />

    <Route element={<PersistLogin />}>
      <Route element={<RequireAuth allowedRoles={["Estudiante"]} />}>
        <Route path="perfil/" element={<Perfil />}>
          <Route index element={<DatosPersonales />} />
          <Route path="notas" element={<Notas />} />
          <Route path="horario" element={<MiHorario />} />
          <Route path="tareas" element={<ListaArchivos />} />
          <Route path="citas" element={<ListAllCitas />} />
        </Route>
      </Route>
    </Route>

    <Route element={<PersistLogin />}>
      <Route
        element={
          <RequireAuth allowedRoles={["Director", "Maestra", "Secretaria"]} />
        }
      >
        <Route path="admin/" element={<PanelAdmin />}>
          <Route path="roles/" element={<Rol />}>
            <Route index element={<ListRoles />} />
            <Route path="crear" element={<AddRol />} />
            <Route path="buscar" element={<GetRolById />} />
            <Route path="borrar/:paramId" element={<DeleteRolById />} />
          </Route>

          <Route path="funcionarios/" element={<Funcionario />}>
            <Route index element={<ListFuncionarios />} />
            <Route path="crear" element={<AddFuncionario />} />
            <Route path="buscar" element={<GetFuncionarioById />} />
            <Route path="actualizar/:paramId" element={<UpdateFuncionario />} />
            <Route path="borrar/:paramId" element={<DeleteFuncionarioById />} />
          </Route>

          <Route path="estudiantes/" element={<Estudiante />}>
            <Route index element={<ListEstudiantes />} />
            <Route path="crear" element={<AddEstudiante />} />
            <Route path="buscar" element={<GetEstudianteById />} />
            <Route path="actualizar/:paramId" element={<UpdateEstudiante />} />
            <Route path="borrar/:paramId" element={<DeleteEstudianteById />} />
          </Route>

          <Route path="grupos/" element={<Grupo />}>
            <Route index element={<ListGrupos />} />
            <Route path="crear" element={<AddGrupo />} />
            <Route path="buscar" element={<GetGrupoById />} />
            <Route path="actualizar/:paramId" element={<UpdateGrupo />} />
            <Route path="borrar/:paramId" element={<DeleteGrupoById />} />
          </Route>

          <Route path="horarios/" element={<Horario />}>
            <Route index element={<ListHorarios />} />
            <Route path="crear" element={<AddHorario />} />
            <Route path="buscar/:paramId" element={<GetHorarioById />} />
            <Route path="borrar/:paramId" element={<DeleteHorarioById />} />
          </Route>

          <Route path="notas/" element={<Nota />}>
            <Route index element={<ListNotas />} />
            <Route path="crear" element={<AddNota />} />
            <Route path="buscar" element={<GetNotaById />} />
            <Route path="actualizar/:paramId" element={<UpdateNota />} />
            <Route path="borrar/:paramId" element={<DeleteNotaById />} />
          </Route>

          <Route path="clases/" element={<Clases />}>
            <Route index element={<ListAll />} />
            <Route path="crear" element={<CrearClase />} />
            <Route path="buscar/*" element={<GetById />} />
            <Route path="actualizar/:paramId" element={<UpdateClase />} />
            <Route path="borrar/:paramId" element={<DeleteClase />} />
          </Route>

          <Route path="archivos/" element={<Archivo />}>
            <Route index element={<ListaArchivos />} />
            <Route path="subir" element={<SubirArchivo />} />
          </Route>

          <Route path="usuarios/" element={<Usuario />}>
            <Route index element={<ListUsuarios />} />
            <Route path="crear" element={<AddUsuario />} />
            <Route path="buscar" element={<GetUsuarioById />} />
            <Route path="actualizar/:paramId" element={<UpdateUsuario />} />
            <Route path="borrar/:paramId" element={<DeleteUsuarioById />} />
          </Route>

          <Route path="citas/" element={<AddCita />} />
          <Route path="citas/lista" element={<ListAllCitas />} />
        </Route>
      </Route>
    </Route>

    <Route path="unauthorized/*" element={<Unauthorized />} />
    <Route path="*" element={<NotFound />} />
  </>
);

export default routes;
