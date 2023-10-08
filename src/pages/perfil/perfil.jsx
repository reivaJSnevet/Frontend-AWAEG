import { Outlet } from "react-router-dom";
import Navbar from "../../components/perfil/Navbar.jsx";
import Prematricula from "../../components/perfil/Prematricula.jsx";

function Perfil() {
  return (
    <div>
      <header>
        {" "}
        <Navbar />
        {" "}
        <Prematricula />
      </header>
      <h2>Perfil de Estudiante</h2>
      <div>
        <Outlet />
      </div>
    </div>
  );
}

export default Perfil;
