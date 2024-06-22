import { Box, Typography } from "@mui/material";
import { Facebook, LocationOn, Phone, MailOutline } from "@mui/icons-material";

const Footer = () => {
  return (
    <Box sx={{ width: "100%", backgroundColor: "#1e1b4b", color: "white", padding: "2rem 1rem", mt: 3 }}>
      <Box sx={{ maxWidth: "1240px", mx: "auto", display: "grid", gridTemplateColumns: { md: "repeat(2, 1fr)" }, borderBottom: "2px solid #606060", py: 1 }}>
        <Box>
          <Typography variant="h6" fontWeight="bold" sx={{ textTransform: "uppercase", pt: 2 }}>Equipo Desarrollador</Typography>
          <ul>
            <li className="p-2 py-1">Javier Díaz Marin</li>
            <li className="p-2 py-1">Dyllan Ruiz Vásquez</li>
            <li className="p-2 py-1">José Vallejos Álvarez</li>
            <li className="p-2 py-1">Emilio Guevara Gómez</li>
          </ul>
        </Box>
        <Box>
          <Typography variant="h6" fontWeight="bold" sx={{ textTransform: "uppercase", pt: 2 }}>Contactos</Typography>
          <ul>
            <li className="items-center p-4 py-1"><LocationOn sx={{ color: "white" }} /> Santa Cruz, Guanacaste</li>
            <li className="items-center p-4 py-1"><Phone sx={{ color: "white" }} /> +506 2680-4790</li>
            <li className="items-center p-4 py-1"><Facebook sx={{ color: "white" }} /> Escuela Guayabal</li>
            <li className="items-center p-4 py-1"><MailOutline sx={{ color: "white" }} /> esc.guayabal@mep.go.cr</li>
          </ul>
        </Box>
      </Box>

      <Box sx={{ maxWidth: "1240px", mx: "auto", display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center", p: 2, textAlign: "center" }}>
        <Typography>
          2023 Algunos derechos reservados, Diseñado por Estudiantes de la Universidad Nacional
        </Typography>
      </Box>
    </Box>
  );  
};

export default Footer;
