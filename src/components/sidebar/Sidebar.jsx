import { Link } from "react-router-dom";
import { useState } from "react";
import {
  GrConfigure,
  GrUser,
  GrUserWorker,
  GrScorecard,
  GrGroup,
  GrSchedules,
  GrBook,
  GrCatalogOption,
  GrDocumentText,
  GrUserSettings,
  GrLogout,
  GrMenu,
  GrClose,
} from "react-icons/gr";
import useLogout from "../../hooks/useLogout";

function Sidebar() {
  const [showMenu, setShowMenu] = useState(false);
  const logout = useLogout();

  const signOut = async () => {
    await logout();
    navigate("/");
  };

  return (
    <>
      <div
        className={`xl:h-[100vh] overflow-y-auto fixed xl:static w-[80%] md:w-[40%] lg:w-[30%] xl:w-auto h-full top-0 bg-gray-500 p-10 flex flex-col justify-between z-50 ${
          showMenu ? "left-0" : "-left-full"
        } transition-all`}
      >
        {/* titulo */}
        <h1 className="text-center 2xl font-bold text-white mb-10 ">AWAEG</h1>

        {/* links */}
        <Link to="roles" className="link-item">
          <div className="flex items-center gap-4 text-white font-semibold hover:bg-purple-600 p-4  rounded-lg transition-colors">
            {" "}
            <GrConfigure /> Roles{" "}
          </div>
        </Link>
        <Link to="usuarios" className="link-item">
          <div className="flex items-center gap-4 text-white font-semibold hover:bg-purple-600 p-4  rounded-lg transition-colors">
            {" "}
            <GrUser /> Usuario{" "}
          </div>
        </Link>
        <Link to="funcionarios" className="link-item">
          <div className="flex items-center gap-4 text-white font-semibold hover:bg-purple-600 p-4  rounded-lg transition-colors">
            {" "}
            <GrUserWorker /> Funcionarios{" "}
          </div>
        </Link>
        <Link to="estudiantes" className="link-item">
          <div className="flex items-center gap-4 text-white font-semibold hover:bg-purple-600 p-4  rounded-lg transition-colors">
            {" "}
            <GrBook /> Estudiantes{" "}
          </div>
        </Link>
        <Link to="grupos" className="link-item">
          <div className="flex items-center gap-4 text-white font-semibold hover:bg-purple-600 p-4  rounded-lg transition-colors">
            {" "}
            <GrGroup /> Grupos{" "}
          </div>
        </Link>
        <Link to="horarios" className="link-item">
          <div className="flex items-center gap-4 text-white font-semibold hover:bg-purple-600 p-4  rounded-lg transition-colors">
            {" "}
            <GrSchedules /> Horarios{" "}
          </div>
        </Link>
        <Link to="clases" className="link-item">
          <div className="flex items-center gap-4 text-white font-semibold hover:bg-purple-600 p-4  rounded-lg transition-colors">
            {" "}
            <GrCatalogOption /> Clases{" "}
          </div>
        </Link>
        <Link to="notas" className="link-item">
          <div className="flex items-center gap-4 text-white font-semibold hover:bg-purple-600 p-4  rounded-lg transition-colors">
            {" "}
            <GrScorecard /> Notas{" "}
          </div>
        </Link>
        <Link to="archivos" className="link-item">
          <div className="flex items-center gap-4 text-white font-semibold hover:bg-purple-600 p-4  rounded-lg transition-colors">
            {" "}
            <GrDocumentText /> Archivos{" "}
          </div>
        </Link>
        <Link to="perfil" className="link-item">
          <div className="flex items-center gap-4 text-white font-semibold hover:bg-purple-600 p-4 rounded-lg transition-colors">
            {" "}
            <GrUserSettings /> Perfil{" "}
          </div>
        </Link>

        {/* image */}
        <div className="">
          <Link to="">
            <img
              src="/logo-removebg-preview.png"
              alt="Image"
              style={{ width: "100px", height: "auto" }}
            />
          </Link>
        </div>

        <div>
          <button
            type="button"
            onClick={signOut}
            className="flex items-center gap-4 text-white font-semibold hover:bg-purple-600 p-4 rounded-lg transition-colors"
          >
            <GrLogout />
            Cerrar Sesión
          </button>
        </div>
      </div>

      {/* boton responsive */}
      <button
        onClick={() => setShowMenu(!showMenu)}
        className="xl:hidden fixed bottom-4 right-4 bg-purple-600 text-black p-3 rounded-full z-50"
      >
        {showMenu ? <GrClose /> : <GrMenu />}
      </button>
    </>
  );
}

export default Sidebar;
