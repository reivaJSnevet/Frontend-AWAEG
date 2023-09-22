import { useState } from "react";
import api from "../../services/api.config.js";

const AddRol = () => {
  const [nombre, setNombre] = useState("");
  const [nivelPrivilegio, setNivelPrivilegio] = useState(0);
  const [descripcion, setDescripcion] = useState("");

  // Esto parece poco practico, pero es la forma más sencilla de manejar los cambios en los campos del formulario
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === "nombre") {
      setNombre(value);
    } else if (name === "nivelPrivilegio") {
      setNivelPrivilegio(value);
    } else if (name === "descripcion") {
      setDescripcion(value);
    }
  };

  const handleValidation = () => {
    //validar que los campos no esten vacios
    if (!nombre || !nivelPrivilegio || !descripcion) {
      alert("Por favor, complete todos los campos.");
      return false;
    }
    //verificar que el nivel de privilegio sea un numero y este entre 1 y 5
    if (isNaN(nivelPrivilegio)) {
      alert("El nivel de privilegio debe ser un número y estar entre 1 y 5");
      return false;
    } else if (nivelPrivilegio < 1 || nivelPrivilegio > 5) {
      alert("El nivel de privilegio debe estar entre 1 y 5");
      return false;
    }
    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Verificar que los campos estén completos
    if (!handleValidation()) {
      return;
    }

    try {
      // Realizar la solicitud POST a través de la instancia de Axios
      await api.post("/roles", {
        nombre,
        nivelPrivilegio,
        descripcion,
      });

      // Limpiar el formulario después de enviar los datos
      setNombre("");
      setNivelPrivilegio(0);
      setDescripcion("");

      alert("Rol agregado exitosamente.");
    } catch (error) {
      console.error("Error al agregar el rol:", error);
      alert("Hubo un error al agregar el rol. Por favor, inténtelo de nuevo.");
    }
  };

  return (
    <div>
      <h2>Agregar Rol</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nombre:</label>
          <input
            type="text"
            name="nombre"
            value={nombre}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Nivel de Privilegio:</label>
          <input
            type="number"
            name="nivelPrivilegio"
            value={nivelPrivilegio}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Descripción:</label>
          <input
            type="text"
            name="descripcion"
            value={descripcion}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <button type="submit">Agregar Rol</button>
        </div>
      </form>
    </div>
  );
};

export default AddRol;
