import { useState } from "react";
import api from "../../services/api.config.js";

const AddEstudiante = () => {
  const [id, setId] = useState("");
  const [nombre, setNombre] = useState("");
  const [apellido1, setApellido1] = useState("");
  const [apellido2, setApellido2] = useState("");
  const [fechaNacimiento, setFechaNacimiento] = useState("");
  const [sexo, setSexo] = useState("");
  const [direccion, setDireccion] = useState("");

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === "id") {
        setId(value);
    }else if (name === "nombre") {
      setNombre(value);
    } else if (name === "apellido1") {
      setApellido1(value);
    } else if (name === "apellido2") {
      setApellido2(value);
    } else if (name === "fechaNacimiento") {
      setFechaNacimiento(value);
    } else if (name === "sexo") {
      setSexo(value);
    } else if (name === "direccion") {
      setDireccion(value);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(id, nombre, apellido1, apellido2, fechaNacimiento, sexo, direccion);

    // Verificar que los campos estén completos
    if (
      !id ||
      !nombre ||
      !apellido1 ||
      !apellido2 ||
      !fechaNacimiento ||
      !sexo ||
      !direccion
    ) {
      alert("Por favor, complete todos los campos.");
      
      return console.log({id, nombre, apellido1, apellido2, fechaNacimiento, sexo, direccion});
    }

    try {
      // Realizar la solicitud POST a través de la instancia de Axios
      await api.post("/estudiantes", {
        id,
        nombre,
        apellido1,
        apellido2,
        fechaNacimiento,
        sexo,
        direccion,
      });

      // Limpiar el formulario después de enviar los datos
      setId("");
      setNombre("");
      setApellido1("");
      setApellido2("");
      setFechaNacimiento("");
      setSexo(-1);
      setDireccion("");
      alert("Estudiante agregado exitosamente.");
    } catch (error) {
      console.error("Error al agregar el Estudiante:", error);
      alert(
        "Hubo un error al agregar el Estudiante. Por favor, inténtelo de nuevo."
      );
    }
  };

  return (
    <div>
      <h2>Agregar Estudiante</h2>
      <form onSubmit={handleSubmit}>
      <div>
          <label>Id:</label>
          <input
            type="text"
            name="id"
            value={id}
            onChange={handleInputChange}
          />
        </div>
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
          <label>Primer Apellido:</label>
          <input
            type="text"
            name="apellido1"
            value={apellido1}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Segundo Apellido:</label>
          <input
            type="text"
            name="apellido2"
            value={apellido2}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Fecha de Nacimiento:</label>
          <input
            type="text"
            name="fechaNacimiento"
            value={fechaNacimiento}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Sexo:</label>
          <input
            type="text"
            name="sexo"
            value={sexo}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Direccion:</label>
          <input
            type="text"
            name="direccion"
            value={direccion}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <button type="submit">Agregar Estudiante</button>
        </div>
      </form>
    </div>
  );
};

export default AddEstudiante;
