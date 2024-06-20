import { Box } from "@mui/material";

const Location = () => {
  return (
    <div name="ubicacion" className="w-full my-32">
      <div className="max-w-[1240px] mx-auto px-2">
        <h2 className="text-5xl font-bold text-center">
          ¿Dónde nos encontramos?
        </h2>
        <p className="py-8 text-2xl text-center text-gray-500">
          Encuentra fácilmente nuestra ubicación utilizando Google Maps. Nuestra
          integración te permite llegar rápidamente a nuestras instalaciones sin
          complicaciones. ¡Visítanos pronto!
        </p>
        <Box sx={{ width: "100%", position: "relative", pb: "56.25%" }}>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3926.059080284865!2d-85.56947898833504!3d10.256818989819811!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8f9fcbb4f575cec9%3A0xfad83aeba0dc0896!2sEscuela%20Guayabal!5e0!3m2!1ses!2scr!4v1697520363753!5m2!1ses!2scr"
            title="Google Map"
            style={{
              position: "absolute",
              width: "100%",
              height: "100%",
              border: 0,
            }}
            allowFullScreen
          />
        </Box>
      </div>
    </div>
  );
};

export default Location;
