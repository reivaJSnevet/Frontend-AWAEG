import { useState, useEffect } from "react";
import api from "../../services/api.config";

function DatosPersonales() {
  const [estudiante, setEstudiante] = useState(null);

  useEffect(() => {
    // Obtener userId y token del localStorage
    const userId = localStorage.getItem("userId");
    const token = localStorage.getItem("token");

    async function cargarEstudiante() {
      try {
        // Agregar el token a la instancia de Axios para autorización
        api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

        const response = await api.get(`estudiantes/usuario/${userId}`);
        const estudianteData = response.data;
        setEstudiante(estudianteData);
        localStorage.setItem("EstId", estudianteData.id); // Store token in local storage
      } catch (error) {
        console.error("Error al cargar el estudiante:", error);
      }
    }

    // Verificar si hay userId y token en el localStorage antes de hacer la solicitud
    if (userId && token) {
      cargarEstudiante();
    } else {
      // Manejar el caso en el que no haya userId o token en el localStorage (por ejemplo, redirigir a la página de inicio de sesión)
      console.error("UserId o token no encontrados en el localStorage.");
    }
  }, []); // Deja el array de dependencias vacío para que se ejecute solo una vez al cargar el componente

  if (!estudiante) {
    return <div>Cargando...</div>;
  }

  return (
    <div>
      <div>DatosPersonales</div>
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

export default DatosPersonales;
