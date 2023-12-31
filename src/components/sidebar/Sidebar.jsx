import { Link, useNavigate} from "react-router-dom";
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
  GrLogout,
  GrMenu,
  GrClose,
  GrObjectGroup,
  GrAction,
  GrPin,
  GrCalendar,
  GrClipboard,
} from "react-icons/gr";
import useLogout from "../../hooks/useLogout";

function Sidebar() {
  const [showMenu, setShowMenu] = useState(false);
  const logout = useLogout();
  const navigate = useNavigate();

  const signOut = async () => {
    await logout();
    navigate("/");
  };

  return (
    <>
      <div
        className={`xl:h-[100vh] overflow-y-auto fixed xl:static  shadow-lg w-[80%] md:w-[40%] lg:w-[30%] xl:w-auto h-full top-0 bg-slate-200 p-5 flex flex-col justify-between z-50 ${
          showMenu ? "left-0" : "-left-full"
        } transition-all`}
      >
        {/* titulo */}
        <h1 className="mb-10 font-bold text-center text-black text-3xl">A W A E G</h1>

        {/* links */}
        <Link to="roles" className="link-item">
          <div className="flex items-center gap-4 p-4 font-semibold text-black transition-colors rounded-lg hover:bg-purple-300">
            {" "}
            <GrConfigure color="#FFFFFF" /> Roles{" "}
          </div>
        </Link>
        <Link to="usuarios" className="link-item"style={{ color: "white" }}>
          <div className="flex items-center gap-4 p-4 font-semibold text-black transition-colors rounded-lg hover:bg-purple-300">
            {" "}
            <GrUser /> Usuario{" "}
          </div>
        </Link>
        <Link to="funcionarios" className="link-item">
          <div className="flex items-center gap-4 p-4 font-semibold text-black transition-colors rounded-lg hover:bg-purple-300">
            {" "}
            <GrUserWorker /> Funcionarios{" "}
          </div>
        </Link>
        <Link to="estudiantes" className="link-item">
          <div className="flex items-center gap-4 p-4 font-semibold text-black transition-colors rounded-lg hover:bg-purple-300">
            {" "}
            <GrBook /> Estudiantes{" "}
          </div>
        </Link>
        <Link to="grupos" className="link-item">
          <div className="flex items-center gap-4 p-4 font-semibold text-black transition-colors rounded-lg hover:bg-purple-300">
            {" "}
            <GrGroup /> Grupos{" "}
          </div>
        </Link>
        <Link to="horarios" className="link-item">
          <div className="flex items-center gap-4 p-4 font-semibold text-black transition-colors rounded-lg hover:bg-purple-300">
            {" "}
            <GrSchedules /> Horarios{" "}
          </div>
        </Link>
        <Link to="clases" className="link-item">
          <div className="flex items-center gap-4 p-4 font-semibold text-black transition-colors rounded-lg hover:bg-purple-300">
            {" "}
            <GrCatalogOption /> Clases{" "}
          </div>
        </Link>
        <Link to="notas" className="link-item">
          <div className="flex items-center gap-4 p-4 font-semibold text-black transition-colors rounded-lg hover:bg-purple-300">
            {" "}
            <GrScorecard /> Notas{" "}
          </div>
        </Link>
        <Link to="solicitudes" className="link-item">
            <div className="flex items-center gap-4 p-4 font-semibold text-black transition-colors rounded-lg hover:bg-purple-300">
                {" "}
            <GrClipboard/> Solicitudes{" "}
            </div>
        </Link>
        <Link to="archivos" className="link-item">
          <div className="flex items-center gap-4 p-4 font-semibold text-black transition-colors rounded-lg hover:bg-purple-300">
            {" "}
            <GrDocumentText /> Archivos{" "}
          </div>
        </Link>
        <Link to="citas" className="link-item">
            <div className="flex items-center gap-4 p-4 font-semibold text-black transition-colors rounded-lg hover:bg-purple-300">
                {" "}
            <GrCalendar/> Citas{" "}
            </div>
        </Link>
        <Link to="insumoEstudiantil" className="link-item">
            <div className="flex items-center gap-4 p-4 font-semibold text-black transition-colors rounded-lg hover:bg-purple-300">
                {" "}
            <GrPin /> Insumos Estudiantiles{" "}
            </div>
        </Link>
        <Link to="insumoInstitucional" className="link-item">
            <div className="flex items-center gap-4 p-4 font-semibold text-black transition-colors rounded-lg hover:bg-purple-300">
                {" "}
            <GrObjectGroup /> Insumos Institucionales{" "}
            </div>
        </Link>
        <Link to="categoriaInsumo" className="link-item">
            <div className="flex items-center gap-4 p-4 font-semibold text-black transition-colors rounded-lg hover:bg-purple-300">
                {" "}
            <GrAction /> Categoria Insumos{" "}
            </div>
        </Link>


       

        <div>
          <button
            type="button"
            onClick={signOut}
            className="flex items-center gap-4 p-4 font-semibold text- transition-colors rounded-lg hover:bg-purple-300"
          >
            <GrLogout />
            Cerrar Sesión
          </button>
        </div>
      </div>

      {/* boton responsive */}
      <button
        onClick={() => setShowMenu(!showMenu)}
        className="fixed z-50 p-3 text-black bg-purple-600 rounded-full xl:hidden bottom-4 right-4"
      >
        {showMenu ? <GrClose /> : <GrMenu />}
      </button>
    </>
  );
}

export default Sidebar;
