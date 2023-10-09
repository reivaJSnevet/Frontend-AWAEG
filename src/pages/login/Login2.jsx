import { useRef, useState, useEffect, useContext} from "react";
import AuthContext from "../../context/Authprovider"

import api from "../../api/axios";

const Login2 = () => {
  const {setAuth} = useContext(AuthContext)
  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [user, pwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        const reponse = await api.post("/auth/login", 
        JSON.stringify({correo: user, contraseña: pwd}),
            {
                headers: {
                    "Content-Type": "application/json"},
               /*  withCredentials: true //AQUIIIII OSOBILE FALLOOO APIII DIFERNETE */
            }
        );
        console.log(JSON.stringify(reponse?.data));

        const accessToken = reponse?.data?.accessToken;
        const role = reponse?.data?.role; //AQUIIIII OSOBILE FALLOOO APIII DIFERNETE
        setAuth({user, pwd, role, accessToken});

        setUser("");
        setPwd("");
        setSuccess(true);
    } catch (error) {
        if(!error?.response){
            setErrMsg("Error de conexión, sin respuesta del servidor");
        }else if(error?.response?.status === 400){
            setErrMsg("Usuario o contraseña incorrecta");   

        }else if(error?.response?.status === 401){
            setErrMsg("Sin autorización");
        }else{
            setErrMsg("Error desconocido");
        }
        errRef.current.focus();
   }
  }

  return (
    <> {success ? (
        <section className="flex flex-col items-center h-screen md:flex-row ">
            <h1 > Iniciaste sesión! </h1>
            <br />
            <p>
                <a href="#"> Volver al inicio</a>
            </p> 
        </section>
    ) : (
    <section className="flex flex-col items-center h-screen md:flex-row">
        <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
        <h1 className="text-4xl font-bold text-gray-800 md:text-5xl">Iniciar Sesión</h1>
        <form onSubmit={handleSubmit} className="flex flex-col w-full max-w-md px-4 py-8 bg-white rounded-lg shadow dark:bg-gray-800 sm:px-6 md:px-8 lg:px-10">
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">Usuario</label>
            <input type="text" id="username" ref={userRef} autoComplete="off" onChange={(e)=> setUser(e.target.value)} value={user}  required className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm dark:bg-gray-700 dark:text-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />

            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Contraseña</label>
            <input type="password" id="password" autoComplete="on" onChange={(e)=> setPwd(e.target.value)} value={pwd} required className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm dark:bg-gray-700 dark:text-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
            <button>Iniciar sesión</button>
        </form>
        <p>
            ¿Olvidaste tu contraseña?<br />
            <span className="text-blue-500">
                Recupérala
                {/* router link aqui */}
                <a href="#"> aquí</a>
            </span>
        </p>
    </section>
    )}
    </>
  );
};

export default Login2;
