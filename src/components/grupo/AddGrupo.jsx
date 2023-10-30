import { useEffect, useState } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

const AddGrupo = () => {
  const api = useAxiosPrivate();
  const [seccion, setSeccion] = useState("");
  const [ciclo, setCiclo] = useState("");
  const [grado, setGrado] = useState("");
  const [aula, setAula] = useState("");
  const [cantAlumno, setCantAlumno] = useState("");
  const [turno, setturno] = useState("");
  const [profesorId, setProfesorId] = useState("");
  const [funcionarios, setFuncionarios] = useState([]);

  const [errorMessages, setErrorMessages] = useState({});

  useEffect(() => {
    const fetchFuncionarios = async () => {
      try {
        const response = await api.get("funcionarios");
        setFuncionarios(response.data);
      } catch (error) {
        console.error(
          "Error fetching funcionarios:",
          error.response?.data || error.message
        );
      }
    };
    fetchFuncionarios();
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === "seccion") {
      setSeccion(value);
    } else if (name === "ciclo") {
      setCiclo(value);
    } else if (name === "grado") {
      setGrado(value);
    } else if (name === "aula") {
      setAula(value);
    } else if (name === "cantAlumno") {
      setCantAlumno(value);
    } else if (name === "turno") {
      setturno(value);
    } else if (name === "profesor") {
      setProfesorId(value);
    }
  };

  const validateForm = () => {
    const errors = {};

    if (!seccion) {
      errors.seccion = "La seccion es obligatoria";
    } else if (!/^[1-6]-\d+$/.test(seccion)) {
      errors.seccion =
        "La seccion debe tener el formato 'm-n', donde m es igual a un numero entre 1 y 6";
    }

    if (!ciclo) {
      errors.ciclo = "El ciclo es obligatorio";
    }

    if (!grado) {
      errors.grado = "El grado es obligatorio";
    }

    if (!aula) {
      errors.aula = "El aula es obligatoria";
    }
    if (!turno) {
      errors.turno = "El turno es obligatorio";
    }
    if (!profesorId) {
      errors.profesorId = "La profesotId es obligatoria";
    }

    setErrorMessages(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      // Realizar la solicitud POST a través de la instancia de Axios
      await api.post("/grupos", {
        seccion,
        ciclo,
        grado,
        aula,
        cantAlumno,
        turno,
        profesorId,
      });

      // Limpiar el formulario después de enviar los datos
      setSeccion("");
      setCiclo("");
      setGrado("");
      setAula("");
      setCantAlumno("");
      setturno("");

      alert("Grupo agregado exitosamente.");
    } catch (error) {
      console.error("Error al agregar el Grupo:", error);
      alert(
        "Hubo un error al agregar el Grupo. Por favor, inténtelo de nuevo."
      );
    }
  };

  return (
    <div className="p-8 bg-purple-500 rounded-lg shadow-lg">
      <h2 className="mb-4 text-2xl text-white">Agregar Grupo</h2>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div className="flex flex-col">
          <label className="text-white">Seccion:</label>
          <input
            type="text"
            name="seccion"
            value={seccion}
            onChange={handleInputChange}
            className="p-2 border border-white rounded"
          />
          {errorMessages.seccion && (
            <p className="text-yellow-500">{errorMessages.seccion}</p>
          )}
        </div>
        <div className="flex flex-col">
          <label className="text-white">Ciclo:</label>
          <input
            type="text"
            name="ciclo"
            value={ciclo}
            onChange={handleInputChange}
            className="p-2 border border-white rounded"
          />
          {errorMessages.ciclo && (
            <p className="text-yellow-500">{errorMessages.ciclo}</p>
          )}
        </div>
        <div className="flex flex-col">
          <label className="text-white">Grado:</label>
          <input
            type="text"
            name="grado"
            value={grado}
            onChange={handleInputChange}
            className="p-2 border border-white rounded"
          />
          {errorMessages.grado && (
            <p className="text-yellow-500">{errorMessages.grado}</p>
          )}
        </div>
        <div className="flex flex-col">
          <label className="text-white">Aula:</label>
          <input
            type="text"
            name="aula"
            value={aula}
            onChange={handleInputChange}
            className="p-2 border border-white rounded"
          />
          {errorMessages.aula && (
            <p className="text-yellow-500">{errorMessages.aula}</p>
          )}
        </div>
        <div className="flex flex-col">
          <label className="text-white">Turno:</label>
          <input
            type="text"
            name="turno"
            value={turno}
            onChange={handleInputChange}
            className="p-2 border border-white rounded"
          />
          {errorMessages.turno && (
            <p className="text-yellow-500">{errorMessages.turno}</p>
          )}
        </div>
        <div className="flex flex-col">
          <select
            name="profesor"
            value={profesorId}
            onChange={handleInputChange}
          >
            <option value="" disabled>
              Seleccione un profesor
            </option>
            {funcionarios.map((funcionario) => (
              <option key={funcionario.id} value={funcionario.id}>
                {funcionario.nombre} {funcionario.apellido1}{" "}
                {funcionario.apellido2}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          className="px-4 py-2 text-purple-800 bg-yellow-500 rounded hover:bg-yellow-400"
        >
          Agregar Grupo
        </button>
      </form>
    </div>

    // <div>
    //   <h2>Agregar Grupo</h2>
    //   <form onSubmit={handleSubmit}>
    //     <div>
    //       <label>seccion:</label>
    //       <input
    //         type="text"
    //         name="seccion"
    //         value={seccion}
    //         onChange={handleInputChange}
    //       />
    //     </div>
    //     <div>
    //     <label>Ciclo:</label>
    //       <input
    //         type="text"
    //         name="ciclo"
    //         value={ciclo}
    //         onChange={handleInputChange}
    //       />
    //     </div>
    //     <div>
    //     <label>Grado:</label>
    //       <input
    //         type="text"
    //         name="grado"
    //         value={grado}
    //         onChange={handleInputChange}
    //       />
    //     </div>
    //     <div>
    //       <label>Aula:</label>
    //       <input
    //         type="text"
    //         name="aula"
    //         value={aula}
    //         onChange={handleInputChange}
    //       />
    //     </div>
    //     <div>
    //     <label>Cantidad de Estudiantes:</label>
    //       <input
    //         type="number"
    //         name="cantAlumno"
    //         value={cantAlumno}
    //         onChange={handleInputChange}
    //       />
    //         <label>turno:</label>
    //       <input
    //         type="text"
    //         name="turno"
    //         value={turno}
    //         onChange={handleInputChange}
    //       />
    //       <div>
    //       <label>Profesor:</label>
    //       <select
    //         name="profesor"
    //         value={profesorId}
    //         onChange={handleInputChange}
    //       >
    //         <option value="" disabled>
    //           Seleccione un profesor
    //         </option>
    //         {funcionarios.map((funcionario) => (
    //           <option key={funcionario.id} value={funcionario.id}>
    //             {funcionario.nombre} {funcionario.apellido1} {funcionario.apellido2}
    //           </option>
    //         ))}
    //       </select>
    //     </div>
    //       <button type="submit">Agregar Grupo</button>
    //     </div>
    //   </form>
    // </div>
  );
};

export default AddGrupo;
