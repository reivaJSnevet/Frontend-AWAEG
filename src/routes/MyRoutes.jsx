import Home from "../pages/home/Home";
import Login from "../pages/login/Login";
import { Route } from "react-router-dom";
import PersistLogin from "../components/auth/PersistLogin";
import RequireAuth from "../components/auth/RequireAuth";
import Roles from "../pages/Roles/Roles";
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
import MyGrades from "../pages/profiles/students/components/MyGrades";
import MySchedule from "../pages/profiles/students/components/MySchedule";
import PreRegistration from "../pages/profiles/students/components/PreRegistration";
import Supplies from "../pages/supplies/Supplies";
import HomeWork from "../pages/profiles/students/components/HomeWork";
import MyAppointments from "../pages/profiles/students/components/MyAppointments";


const routes = (
  <>
    <Route path="login" element={<Login />} />
    <Route path="/" element={<Home/>} />

    <Route element={<PersistLogin />}>
      <Route element={<RequireAuth allowedRoles={["superadmin", "director", "maestra"]} />}>
        <Route element={<Layout />}>
          <Route path="roles/" element={<Roles />} />
          <Route path="users/" element={<UsersTable />} />
          <Route path="functionaries/" element={<Functionaries />} />
          <Route path="students/" element={<Students />} />
          <Route path="caregivers/" element={<Caregivers />} />
          <Route path="groups/" element={<Groups/>} />
          <Route path="grades/" element={<Grades/>} />
          <Route path="courses" element={<Courses />} />
          <Route path="files" element={<Files/>} />
          <Route path="applications" element={<Applications/>} />
          <Route path="supplies" element={<Supplies/>} />
        </Route>
      </Route>
      <Route element={<RequireAuth allowedRoles={["estudiante"]}/>}>
        <Route element={<Layout />}>
            <Route path="profile/" element={<StudentProfile />}/>
            <Route path="mygrades/" element={<MyGrades />} />
            <Route path="schedule/" element={<MySchedule/>} />
            <Route path="preregistration/" element={<PreRegistration/>} />
            <Route path="homework/" element={<HomeWork/>} />
            <Route path="appointments/" element={<MyAppointments/>} />
            
            
        </Route>
      </Route>
    </Route>

    <Route path="*" element={<h1>Not Found</h1>} />
    <Route path="unauthorized/*" element={<h1> sin autorizacion</h1>} />
  </>
);

export default routes;
