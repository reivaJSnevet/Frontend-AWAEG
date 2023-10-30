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
  const [seccion, setSeccion] = useState("");

  const [secciones, setSecciones] = useState([]);

  const [errorMessages, setErrorMessages] = useState({});

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

  const validateForm = () => {
    const errors = {};

    if (!id) {
      errors.id = "La ID es obligatoria";
    } else if (!/^(?:[1-8]|1558)\d{8}$/.test(id)) {
      errors.id = "La ID debe seguir el formato de cedulas costarricenses";
    }

    if (!nombre) {
      errors.nombre = "El nombre es obligatorio";
    }

    if (!apellido1) {
      errors.apellido1 = "El apellido1 es obligatorio";
    }

    if (!apellido2) {
      errors.apellido2 = "El apellido2 es obligatorio";
    }
    if (!fechaNacimiento) {
      errors.fechaNacimiento = "La fecha de Nacimineto es obligatoria";
    }
    if (!sexo) {
      errors.sexo = "El sexo es obligatorio";
    }
    if (!direccion) {
      errors.direccion = "La direccion es obligatoria";
    }
    if (!seccion) {
      errors.seccion = "La seccion es obligatoria";
    }

    setErrorMessages(errors);
    return Object.keys(errors).length === 0;
  };

  //Cambiar esto
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === "id") {
      setId(value);
    } else if (name === "nombre") {
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
    // console.log(id, nombre, apellido1, apellido2, fechaNacimiento, sexo, direccion);

    // Verificar que los campos estén completos
    if (!validateForm()) {
      return;
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
        seccion,
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
    //crear
    <div className="p-8 bg-purple-500 rounded-lg shadow-lg">
      <h2 className="mb-4 text-2xl text-white">Agregar Estudiante</h2>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div className="flex flex-col">
          <label className="text-white">Id:</label>
          <input
            type="text"
            name="id"
            value={id}
            onChange={handleInputChange}
            className="p-2 border border-white rounded"
          />
          {errorMessages.id && (
            <p className="text-yellow-500">{errorMessages.id}</p>
          )}
        </div>
        <div className="flex flex-col">
          <label className="text-white">Nombre:</label>
          <input
            type="text"
            name="nombre"
            value={nombre}
            onChange={handleInputChange}
            className="p-2 border border-white rounded"
          />
          {errorMessages.nombre && (
            <p className="text-yellow-500">{errorMessages.nombre}</p>
          )}
        </div>
        <div className="flex flex-col">
          <label className="text-white">Apellido 1:</label>
          <input
            type="text"
            name="apellido1"
            value={apellido1}
            onChange={handleInputChange}
            className="p-2 border border-white rounded"
          />
          {errorMessages.apellido1 && (
            <p className="text-yellow-500">{errorMessages.apellido1}</p>
          )}
        </div>
        <div className="flex flex-col">
          <label className="text-white">Apellido 2:</label>
          <input
            type="text"
            name="apellido2"
            value={apellido2}
            onChange={handleInputChange}
            className="p-2 border border-white rounded"
          />
          {errorMessages.apellido2 && (
            <p className="text-yellow-500">{errorMessages.apellido2}</p>
          )}
        </div>
        <div className="flex flex-col">
          <label className="text-white">Fecha de Nacimiento:</label>
          <input
            type="text"
            name="fechaNacimiento"
            value={fechaNacimiento}
            onChange={handleInputChange}
            className="p-2 border border-white rounded"
          />
          {errorMessages.fechaNacimiento && (
            <p className="text-yellow-500">{errorMessages.fechaNacimiento}</p>
          )}
        </div>
        <div className="flex flex-col">
          <label className="text-white">Sexo:</label>
          <input
            type="text"
            name="sexo"
            value={sexo}
            onChange={handleInputChange}
            className="p-2 border border-white rounded"
          />
          {errorMessages.sexo && (
            <p className="text-yellow-500">{errorMessages.sexo}</p>
          )}
        </div>
        <div className="flex flex-col">
          <label className="text-white">Direccion:</label>
          <input
            type="text"
            name="direccion"
            value={direccion}
            onChange={handleInputChange}
            className="p-2 border border-white rounded"
          />
          {errorMessages.direccion && (
            <p className="text-yellow-500">{errorMessages.direccion}</p>
          )}
        </div>
        <div className="flex flex-col">
          <label className="text-white">Seccion:</label>
          <select name="seccion" value={seccion} onChange={handleInputChange}>
            <option value="" disabled>
              Seleccione una sección
            </option>
            {secciones.map((seccion, index) => (
              <option key={index} value={seccion}>
                {seccion}
              </option>
            ))}
          </select>
          {errorMessages.seccion && (
            <p className="text-yellow-500">{errorMessages.seccion}</p>
          )}
        </div>

        <button
          type="submit"
          className="px-4 py-2 text-purple-800 bg-yellow-500 rounded hover:bg-yellow-400"
        >
          Agregar Funcionario
        </button>
      </form>
    </div>

    // <div>
    //   <h2>Agregar Estudiante</h2>
    //   <form onSubmit={handleSubmit}>
    //   <div>
    //       <label>Id:</label>
    //       <input
    //         type="text"
    //         name="id"
    //         value={id}
    //         onChange={handleInputChange}
    //       />
    //     </div>
    //     <div>
    //       <label>Nombre:</label>
    //       <input
    //         type="text"
    //         name="nombre"
    //         value={nombre}
    //         onChange={handleInputChange}
    //       />
    //     </div>
    //     <div>
    //       <label>Primer Apellido:</label>
    //       <input
    //         type="text"
    //         name="apellido1"
    //         value={apellido1}
    //         onChange={handleInputChange}
    //       />
    //     </div>
    //     <div>
    //       <label>Segundo Apellido:</label>
    //       <input
    //         type="text"
    //         name="apellido2"
    //         value={apellido2}
    //         onChange={handleInputChange}
    //       />
    //     </div>
    //     <div>
    //       <label>Fecha de Nacimiento:</label>
    //       <input
    //         type="text"
    //         name="fechaNacimiento"
    //         value={fechaNacimiento}
    //         onChange={handleInputChange}
    //       />
    //     </div>
    //     <div>
    //       <label>Sexo:</label>
    //       <input
    //         type="text"
    //         name="sexo"
    //         value={sexo}
    //         onChange={handleInputChange}
    //       />
    //     </div>
    //     <div>
    //       <label>Direccion:</label>
    //       <input
    //         type="text"
    //         name="direccion"
    //         value={direccion}
    //         onChange={handleInputChange}
    //       />
    //     </div>
    //     <div>
    //       <label>Sección:</label>
    //       <select
    //         name="seccion"
    //         value={seccion}
    //         onChange={handleInputChange}
    //       >
    //         <option value="" disabled>
    //           Seleccione una sección
    //         </option>
    //         {secciones.map((seccion, index) => (
    //           <option key={index} value={seccion}>
    //             {seccion}
    //           </option>
    //         ))}
    //       </select>
    //     </div>
    //     <div>
    //       <button type="submit">Agregar Estudiante</button>
    //     </div>
    //   </form>
    // </div>
  );
};

export default AddEstudiante;
