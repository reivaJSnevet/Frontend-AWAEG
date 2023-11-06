import React from "react";
import { Box, AspectRatio } from "@chakra-ui/react";

const Ubicacion = () => {
  return (
    <div name="ubicacion" className="w-full my-32">
      <div className="max-w-[1240px] mx-auto px-2">
        <h2 className="text-5xl font-bold text-center">
          ¿Dónde nos encontramos?
        </h2>
        <p className="text-2xl py-8 text-gray-500 text-center">
          En esta sección, te brindamos la posibilidad de acceder a la dirección
          de nuestra institución de una manera sumamente conveniente y sencilla,
          a través de la herramienta de Google Maps. Esto te permitirá encontrar
          nuestra ubicación de forma rápida y eficiente, facilitando enormemente
          tu llegada a nuestras instalaciones. Gracias a la integración de
          Google Maps en nuestro sitio web, te ofrecemos una solución efectiva
          para eliminar cualquier posible confusión en tu camino hacia nuestra
          institución. Ya no tendrás que preocuparte por direcciones complicadas
          o búsquedas infructuosas en mapas tradicionales,No importa si eres
          nuevo en la zona o si has visitado nuestra institución antes, con esta
          opción, te garantizamos un acceso sencillo y directo.¡Esperamos verte
          pronto en nuestras instalaciones!
        </p>

        <Box w="100%" bg={"purple.400"} p={8}>
          <AspectRatio ratio={16 / 9}>
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3926.059080284865!2d-85.56947898833504!3d10.256818989819811!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8f9fcbb4f575cec9%3A0xfad83aeba0dc0896!2sEscuela%20Guayabal!5e0!3m2!1ses!2scr!4v1697520363753!5m2!1ses!2scr" />
          </AspectRatio>
        </Box>
      </div>
    </div>
  );
};

export default Ubicacion;
