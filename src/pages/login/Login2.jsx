import { useRef, useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import useLocalStorage from "../../hooks/useLocalStorage";
import useAuth from "../../hooks/useAuth";
import api from "../../api/axios";

const Login2 = () => {
  const { setAuth, persist, setPersist } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useLocalStorage("user", "")  //useState("");
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
          withCredentials: true, //POSIBLE FALLO AQUI PORQUE NO SE SI ES TRUE O FALSE
        }
      );
      console.log(JSON.stringify(response?.data));

      const accessToken = response?.data?.accessToken;
      const role = response?.data?.rol; //POSIBLE FALLO CON ROLES manejo diferente

      const roleArray = role ? [role] : ["anonimo"];

      setAuth({ user, pwd, roleArray, accessToken });

      setUser("");
      setPwd("");

      navigate(from, { replace: true });
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
  }

  useEffect(() => {
    localStorage.setItem("persist", persist);
  }, [persist]);

  return (
    <section className="flex flex-col items-center h-screen md:flex-col">
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
      <h1 className="text-4xl font-bold text-gray-800 md:text-5xl">
        Iniciar Sesión
      </h1>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col w-full max-w-md px-4 py-8 bg-white rounded-lg shadow dark:bg-gray-800 sm:px-6 md:px-8 lg:px-10"
      >
        <label
          htmlFor="username"
          className="block text-sm font-medium text-gray-700"
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
          className="block text-sm font-medium text-gray-700"
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
        <button>Iniciar sesión</button>
        <div className="flex items-center mt-4">
          <input
            type="checkbox"
            id="persist"
            onChange={togglePersist}
            checked={persist}
            className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500 focus:ring focus:ring-opacity-50"
          />
          <label htmlFor="persist" className="ml-2 text-sm text-gray-700">
            Mantener sesión iniciada
          </label>
        </div>
      </form>
      <p>
        ¿Olvidaste tu contraseña?
        <br />
        <span className="text-blue-500">
          Recupérala
          {/* router link aqui */}
          <a href="/Admin"> aquí</a>
        </span>
      </p>
    </section>
  );
};

export default Login2;
