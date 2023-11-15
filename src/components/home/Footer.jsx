import { Divider } from "@chakra-ui/react";
import React from "react";
import { GrFacebook, GrMap, GrPhone, GrMailOption } from "react-icons/gr";

const Footer = () => {
  return (
    <div className="w-full mt-24" style={{ backgroundColor: "#1e1b4b", color: "white", padding: "2rem 1rem" }}>
      <div className="max-w-[1240px] mx-auto grid md:grid-cols-2 border-b-2 border-gray-600 py-8">
        <div>
          <h6 className="font-bold uppercase pt-2">Equipo Desarrollador</h6>
          <ul>
            <li className="p-2 py-1">Javier Diaz Marin</li>
            <li className="p-2 py-1">Dyllan Ruiz Vasquez</li>
            <li className="p-2 py-1">José Vallejos Álvarez</li>
            <li className="p-2 py-1">Emilio Guevara Gómez</li>
          </ul>
        </div>
        <div>
          <h6 className="font-bold uppercase pt-2">Contactos</h6>
          <ul>
            <li className="p-4 py-1 items-center">
              <GrMap color="white"/> Santa Cruz, Guanacaste
            </li>
            <li className="p-4 py-1 items-center">
              <GrPhone color="white"/>
              +506 2680-4790
            </li>
            <li className="p-4 py-1 items-center">
              <GrFacebook color="white" />
              Escuela Guayabal
            </li>
            <li className="p-4 py-1 items-center">
              {" "}
              <GrMailOption color="white"/> Correo Electronico: esc.guayabal@mep.go.cr
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
    </div>
  );  
};

export default Footer;
