import { useEffect, useState } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

const AddGrupo = () => {
  const api = useAxiosPrivate();
  const [formulario, setFormulario] = useState({
    seccion: "",
    ciclo: "",
    grado: "",
    aula: "",
    cantAlumno: "",
    turno: false,
    funcionarioId: "",
  });
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
    console.log(name, value);
  
    if (name === 'turno') {
      // Convierte 'tarde' en true y 'mañana' en false
      setFormulario((prevFormulario) => ({
        ...prevFormulario,
        turno: value === 'tarde',
      }));
    } else {
      setFormulario((prevFormulario) => ({
        ...prevFormulario,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    console.log(formulario);

    // Verificar que los campos estén completos
    const { seccion, ciclo, grado, aula, cantAlumno, turno, funcionarioId } =
      formulario;
    if (
      !seccion ||
      !grado ||
      !aula ||
      !cantAlumno ||
      !ciclo ||
      !funcionarioId
    ) {
      alert("Por favor, complete todos los campos.");
      console.log(!seccion, !grado, !aula, !cantAlumno, !ciclo, !turno, !funcionarioId);
      return;
    }

    try {
      // Realizar la solicitud POST a través de la instancia de Axios
      await api.post("/grupos", formulario);

      // Limpiar el formulario después de enviar los datos
      setFormulario({
        seccion: "",
        ciclo: "",
        grado: "",
        aula: "",
        cantAlumno: "",
        turno: false,
        funcionarioId: "",
      });

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
            value={formulario.seccion}
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
            value={formulario.ciclo}
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
            value={formulario.grado}
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
            value={formulario.aula}
            onChange={handleInputChange}
            className="p-2 border border-white rounded"
          />
          {errorMessages.aula && (
            <p className="text-yellow-500">{errorMessages.aula}</p>
          )}
        </div>
        <div>
          <label>Cantidad de Estudiantes:</label>
          <input
            type="number"
            name="cantAlumno"
            value={formulario.cantAlumno}
            onChange={handleInputChange}
            className="p-2 border border-white rounded"
          />
          <label>Turno:</label>
          <select
            name="turno"
            value={formulario.turno ? "tarde" : "mañana"}
            onChange={handleInputChange}
          >
            <option value="" disabled>
                Seleccione un turno
              </option>
            <option value="mañana">Mañana</option>
            <option value="tarde">Tarde</option>
          </select>
          <div>
            <label>Profesor:</label>
            <select
              name="funcionarioId"
              value={formulario.funcionarioId}
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
          <button type="submit">Agregar Grupo</button>
        </div>
      </form>
    </div>
  );
};

export default AddGrupo;
