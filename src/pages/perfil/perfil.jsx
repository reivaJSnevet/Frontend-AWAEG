import { Outlet } from "react-router-dom";
import Navbar from "../../components/perfil/Navbar.jsx";

function Perfil() {
  return (
    <div>
      <header>
        {" "}
        <Navbar />{" "}
      </header>
      <h2>Perfil de Estudiante</h2>
      <div>
        <Outlet />
      </div>
    </div>
  );
}

export default Perfil;
