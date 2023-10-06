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
    <div className="datos-personales">
    <h3>Datos Personales</h3>
    <ul>
        <li><strong>Nombre:</strong> {estudiante.nombre}</li>
        <li><strong>Apellido 1:</strong> {estudiante.apellido1}</li>
        <li><strong>Apellido 2:</strong> {estudiante.apellido2}</li>
        <li><strong>Fecha de Nacimiento:</strong> {estudiante.fechaNacimiento}</li>
        <li><strong>Edad:</strong> {estudiante.edad}</li>
        <li><strong>Sexo:</strong> {estudiante.sexo ? "Masculino" : "Femenino"}</li>
        <li><strong>Dirección:</strong> {estudiante.direccion}</li>
    </ul>
    </div>
  );
}

export default DatosPersonales;
