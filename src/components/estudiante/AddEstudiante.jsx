import { useEffect, useState } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

const AddEstudiante = () => {
    const api = useAxiosPrivate();

  //estos campos se pueden crear en un solo obejeto useState({})
  const [id, setId] = useState("");
  const [nombre, setNombre] = useState("");
  const [apellido1, setApellido1] = useState("");
  const [apellido2, setApellido2] = useState("");
  const [fechaNacimiento, setFechaNacimiento] = useState("");
  const [sexo, setSexo] = useState("");
  const [direccion, setDireccion] = useState("");
  const [seccion, setSeccion ] = useState("");

  const [secciones, setSecciones] = useState([]);

  useEffect(() => {
    const fetchSecciones = async () => {
      try {
        const response = await api.get("grupos");
        setSecciones(response.data.map((grupo) => grupo.seccion));
      } catch (error) {
        console.error(
          "Error fetching secciones:",
          error.response?.data || error.message
        );
      }
    };
    fetchSecciones();
  }, []);

  //Cambiar esto
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
    } else if (name === "seccion") {
      setSeccion(value);
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
        seccion
      });
  
      await api.put(`grupos/${seccion}/increment`);
      setId("");
      setNombre("");
      setApellido1("");
      setApellido2("");
      setFechaNacimiento("");
      setSexo("");
      setDireccion("");
      setSeccion("");
  
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
          <label>Sección:</label>
          <select
            name="seccion"
            value={seccion}
            onChange={handleInputChange}
          >
            <option value="" disabled>
              Seleccione una sección
            </option>
            {secciones.map((seccion, index) => (
              <option key={index} value={seccion}>
                {seccion}
              </option>
            ))}
          </select>
        </div>
        <div>
          <button type="submit">Agregar Estudiante</button>
        </div>
      </form>
    </div>
  );
};

export default AddEstudiante;
