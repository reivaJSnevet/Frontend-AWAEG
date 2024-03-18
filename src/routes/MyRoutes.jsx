import Home from "../pages/home/Home";
import Login from "../pages/login/login";
import { Route } from "react-router-dom";
import PersistLogin from "../components/auth/PersistLogin";
import RequireAuth from "../components/auth/RequireAuth";
import Role from "../pages/Roles/components/ListarRoles";
import UsersTable from "../pages/users/components/UsersTable";
import StudentProfile from "../pages/profiles/students/StudentProfile";
import Functionaries from "../pages/functionaries/Functionaries";
import Layout from "../components/layout/layout";
import Students from "../pages/students/Students";
import Caregivers from "../pages/caregivers/Caregivers";
import Groups from "../pages/groups/Groups";
import Grades from "../pages/grades/Grades";
import Courses from "../pages/courses/Courses"
import Files from "../pages/files/Files"
import Applications from "../pages/applications/Applications";


const routes = (
  <>
    <Route path="login" element={<Login />} />
    <Route path="/" element={<Home/>} />

    <Route element={<PersistLogin />}>
      <Route element={<RequireAuth allowedRoles={["superadmin", "director", "maestra"]} />}>
        <Route element={<Layout />}>
          <Route path="roles/" element={<Role />} />
          <Route path="users/" element={<UsersTable />} />
          <Route path="functionaries/" element={<Functionaries />} />
          <Route path="students/" element={<Students />} />
          <Route path="caregivers/" element={<Caregivers />} />
          <Route path="groups/" element={<Groups/>} />
          <Route path="grades/" element={<Grades/>} />
          <Route path="courses" element={<Courses />} />
          <Route path="files" element={<Files/>} />
          <Route path="applications" element={<Applications/>} />
        </Route>
      </Route>
      <Route element={<RequireAuth allowedRoles={["estudiante"]}/>}>
      <Route element={<Layout />}>
        <Route path="perfil/" element={<StudentProfile />} />
        </Route>
      </Route>
    </Route>

    <Route path="*" element={<h1>Not Found</h1>} />
    <Route path="unauthorized/*" element={<h1> sin autorizacion</h1>} />
  </>
);

export default routes;
