import { useRef, useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import useLocalStorage from "../../hooks/useLocalStorage";
import useAuth from "../../hooks/useAuth";
import api from "../../api/axios";

const Login2 = () => {
  const { setAuth, persist, setPersist } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname;

  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useLocalStorage("user", "");
  const [pwd, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [user, pwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post(
        "/auth/login",
        JSON.stringify({ nombre: user, contraseña: pwd }),
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      console.log(JSON.stringify(response?.data));

      const accessToken = response?.data?.accessToken;
      const role = response?.data?.rol;
      const personaId = response?.data?.personaId;

      const roleArray = role ? [role] : ["anonimo"];

      setAuth({ roleArray, accessToken, personaId });

      setUser("");
      setPwd("");

      if ((roleArray.includes("Director") || roleArray.includes("Maestra")) && from === "/admin") {
        console.log("1111111111");
        navigate(from, { replace: true });

      } else if (roleArray.includes("Estudiante") && from === "/perfil") {
        console.log("222222222222");
        navigate(from, { replace: true });
        
      } else if (roleArray.includes("Director") || roleArray.includes("Maestra")) {
        console.log("3333333333333");
        navigate("/admin", { replace: true });

      } else if (roleArray.includes("Estudiante")) {
        console.log("444444444444");
        navigate("/perfil", { replace: true });

      } else {
        console.log("Rol desconocido o ruta incorrecta para el rol");
        navigate("/", { replace: true });
      }

      /* navigate(from, { replace: true }); */
    } catch (error) {
      if (!error?.response) {
        setErrMsg("Error de conexión, sin respuesta del servidor");
        console.log(error);
      } else if (error?.response?.status === 400) {
        setErrMsg("Usuario o contraseña incorrecta");
      } else if (error?.response?.status === 401) {
        setErrMsg("Sin autorización");
      } else if (error?.response?.status === 404) {
        setErrMsg("Usuario no registrado");
      } else {
        setErrMsg("Error desconocido");
      }
      errRef.current.focus();
    }
  };

  const togglePersist = () => {
    setPersist((prev) => !prev);
  };

  useEffect(() => {
    localStorage.setItem("persist", persist);
  }, [persist]);

  return (
    <section className="flex flex-col items-center justify-center h-screen" style={{ backgroundColor: '#1e1b4b' }}>
    <div className="relative">
        <form
          onSubmit={handleSubmit}
          className="relative z-10 flex flex-col w-full max-w-md p-4 rounded-lg shadow-md text-white dark:bg-gray-800 sm:px-6 md:px-8 lg:px-10 mt-n8"
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.7)', boxShadow: '0 0 0 3px rgba(156, 72, 255, 0.7), 0 0 0 6px rgba(156, 72, 255, 0.5), 0 0 0 9px rgba(156, 72, 255, 0.3), 0 0 0 12px rgba(156, 72, 255, 0.2)' }}
        >
          <div className="flex items-center justify-center mb-2">
            <img src="/about.png" alt="Logo" className="h-60" />
          </div>
          <p
            ref={errRef}
            className={`${
              errMsg ? "errmsg p-3" : "offscreen"
            } bg-red-500 text-white p-0 rounded-md mt-2`}
            role="alert"
            aria-live="assertive"
          >
            {errMsg}
          </p>
          <label
            htmlFor="username"
            className="block text-sm font-medium text-white"
          >
            Usuario
          </label>
          <input
            type="text"
            id="username"
            ref={userRef}
            autoComplete="off"
            onChange={(e) => setUser(e.target.value)}
            value={user}
            required
            className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm dark:bg-gray-700 dark:text-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
    
          <label
            htmlFor="password"
            className="block text-sm font-medium text-white mt-4"
          >
            Contraseña
          </label>
          <input
            type="password"
            id="password"
            autoComplete="off"
            onChange={(e) => setPwd(e.target.value)}
            value={pwd}
            required
            className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm dark:bg-gray-700 dark:text-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
          <button
            type="submit"
            className="rounded-3xl bg-purple-400 bg-opacity-50 px-10 py-2 text-white shadow-xl backdrop-blur-md transition-colors duration-300 hover:bg-purple-600 mt-4"
          >
            Iniciar sesión
          </button>
          <div className="flex items-center mt-2">
            <input
              type="checkbox"
              id="persist"
              onChange={togglePersist}
              checked={persist}
              className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500 focus:ring focus:ring-opacity-50"
            />
            <label htmlFor="persist" className="ml-2 text-sm text-white">
              Mantener sesión iniciada
            </label>
          </div>
    
          <p className="mt-2 text-white">
            ¿Olvidaste tu contraseña?{" "}
            <span className="text-blue-500">
              Recupérala <a href="/Admin">aquí</a>
            </span>
          </p>
        </form>
      </div>
    </section>
  );
};

export default Login2;