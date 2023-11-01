import { Link } from "react-router-dom";
import NavbarH from "../../components/home/NavbarH";
import Inicio from "../../components/home/Inicio";
import Sobre from "../../components/home/Sobre";
import Informacion from "../../components/home/Informacion";
import Ubicacion from "../../components/home/Ubicacion";
import Footer from "../../components/home/Footer";

const Home = () => {

  return (
    <>
    <NavbarH />
    <Inicio />
    <Sobre />
    <Informacion />
    <Ubicacion />
    <Footer />
    </>
  );
};

export default Home;
