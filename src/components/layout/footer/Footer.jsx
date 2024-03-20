const Footer = () => {
    return (
      <footer className="w-full mt-24" style={{ backgroundColor: "#332941", color: "white", padding: "2rem 1rem" }}>
        <div className="max-w-[1240px] mx-auto grid md:grid-cols-2 border-b-2 border-customYellow py-8">
          <div>
            <h6 className="pt-2 font-bold uppercase text-customPurple">Equipo Desarrollador</h6>
            <ul>
              <li className="p-2 py-1">Javier Diaz Marin</li>
              <li className="p-2 py-1">Dyllan Ruiz Vasquez</li>
              <li className="p-2 py-1">José Vallejos Álvarez</li>
              <li className="p-2 py-1">Emilio Guevara Gómez</li>
            </ul>
          </div>
          <div>
            <h6 className="pt-2 font-bold uppercase text-customPurple">Contactos</h6>
            <ul>
              <li className="items-center p-4 py-1">
                <span>Santa Cruz, Guanacaste</span>
              </li>
              <li className="items-center p-4 py-1">
                <span>+506 2680-4790</span>
              </li>
              <li className="items-center p-4 py-1">
                <span>Escuela Guayabal</span>
              </li>
              <li className="items-center p-4 py-1">
                <span>esc.guayabal@mep.go.cr</span>
              </li>
            </ul>
          </div>
        </div>
    
        <div className="p-2 max-w-[1240px] m-auto sm:flex-row text-center">
          <p>
            2023 Todos los derechos reservados, Diseñado por Estudiantes de la
            Universidad Nacional
          </p>
        </div>
      </footer>
    );  
  };
  
  export default Footer;
  