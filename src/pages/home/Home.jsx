import { Link } from "react-router-dom";

const Home = () => {
  const styles = {
    imagen: {
      backgroundImage: `url('/a.jpg')`,
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover",
      backgroundPosition: "center",
      height: "100vh",
    },
  };

  return (
    <header style={styles.imagen}>
      <div className="container p-10 mx-auto">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="relative">
              <div className="top-0 left-0 mt-4 mr-4 ">
                <Link to="/">
                  <img src="/logo.png" alt="Logo SWAEG" className="h-30" />
                </Link>
              </div>
            </div>
          </div>
          <div className="flex items-center">
            <nav className="ml-8">
              <ul className="flex space-x-6">
                <li>
                  <Link to="/" className="hover:text-gray-300">
                    Inicio
                  </Link>
                </li>
                <li>
                  <Link to="/" className="hover:text-gray-300">
                    Sobre Nosotros
                  </Link>
                </li>
                <li>
                  <Link to="/" className="hover:text-gray-300">
                    Estudiantes
                  </Link>
                </li>
                <li>
                  <Link to="/" className="hover:text-gray-300">
                    Profesores
                  </Link>
                </li>
                <li>
                  <Link to="/" className="hover:text-gray-300">
                    Administrativos
                  </Link>
                </li>
                <li>
                  <Link to="/login" className="hover:text-gray-300">
                    Login
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Home;
