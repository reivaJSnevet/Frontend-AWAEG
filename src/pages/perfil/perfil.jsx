import { useState, useEffect } from "react";
import api from "../../services/api.config.js"; // Importa tu instancia de Axios

function Perfil() {
  const [estudiante, setEstudiante] = useState(null);
  const estudianteId = 118050543

  useEffect(() => {
    async function cargarEstudiante() {
      try {
        const response = await api.get(`estudiantes/${estudianteId}`);
        const estudianteData = response.data;
        setEstudiante(estudianteData);
      } catch (error) {
        console.error("Error al cargar el estudiante:", error);
      }
    }

    cargarEstudiante();
  }, [estudianteId]);

  if (!estudiante) {
    return <div>Cargando...</div>;
  }

  return (
    <div>
      <h2>Perfil de Estudiante</h2>
      <p>Nombre: {estudiante.nombre}</p>
      <p>Apellido 1: {estudiante.apellido1}</p>
      <p>Apellido 2: {estudiante.apellido2}</p>
      <p>Fecha de Nacimiento: {estudiante.fechaNacimiento}</p>
      <p>Edad: {estudiante.edad}</p>
      <p>Sexo: {estudiante.sexo ? "Masculino" : "Femenino"}</p>
      <p>Dirección: {estudiante.direccion}</p>
    </div>
  );
}

export default Perfil;
