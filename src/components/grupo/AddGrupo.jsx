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
    <div className="max-w-md p-8 mx-auto mt-10 bg-purple-600 rounded-lg shadow-lg">
      <h2 className="mb-6 text-2xl font-bold text-white">Agregar Grupo</h2>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label className="block mb-1 text-sm font-medium text-white">Seccion:</label>
          <input
            type="text"
            name="seccion"
            value={formulario.seccion}
            onChange={handleInputChange}
            className="w-full p-2 bg-white border border-purple-600 rounded-md focus:outline-none focus:ring focus:ring-purple-600"
          />
          {errorMessages.seccion && (
            <p className="text-yellow-500">{errorMessages.seccion}</p>
          )}
        </div>
        <div>
          <label className="block mb-1 text-sm font-medium text-white">Ciclo:</label>
          <input
            type="text"
            name="ciclo"
            value={formulario.ciclo}
            onChange={handleInputChange}
            className="w-full p-2 bg-white border border-purple-600 rounded-md focus:outline-none focus:ring focus:ring-purple-600"
          />
          {errorMessages.ciclo && (
            <p className="text-yellow-500">{errorMessages.ciclo}</p>
          )}
        </div>
        <div>
          <label className="block mb-1 text-sm font-medium text-white">Grado:</label>
          <input
            type="text"
            name="grado"
            value={formulario.grado}
            onChange={handleInputChange}
            className="w-full p-2 bg-white border border-purple-600 rounded-md focus:outline-none focus:ring focus:ring-purple-600"
          />
          {errorMessages.grado && (
            <p className="text-yellow-500">{errorMessages.grado}</p>
          )}
        </div>
        <div>
          <label className="block mb-1 text-sm font-medium text-white">Aula:</label>
          <input
            type="text"
            name="aula"
            value={formulario.aula}
            onChange={handleInputChange}
            className="w-full p-2 bg-white border border-purple-600 rounded-md focus:outline-none focus:ring focus:ring-purple-600"
          />
          {errorMessages.aula && (
            <p className="text-yellow-500">{errorMessages.aula}</p>
          )}
        </div>
        <div>
          <label className="block mb-1 text-sm font-medium text-white">Cantidad de Estudiantes:</label>
          <input
            type="number"
            name="cantAlumno"
            value={formulario.cantAlumno}
            onChange={handleInputChange}
            className="w-full p-2 bg-white border border-purple-600 rounded-md focus:outline-none focus:ring focus:ring-purple-600"
          />
          <label className="block mb-1 text-sm font-medium text-white">Turno:</label>
          <select
            name="turno"
            value={formulario.turno ? "tarde" : "mañana"}
            onChange={handleInputChange}
             className="w-full p-2 bg-white border border-purple-600 rounded-md focus:outline-none focus:ring focus:ring-purple-600"
          >
            <option value="" disabled>
                Seleccione un turno
              </option>
            <option value="mañana">Mañana</option>
            <option value="tarde">Tarde</option>
          </select>
          <div>
            <label className="block mb-1 text-sm font-medium text-white">Profesor:</label>
            <select
              name="funcionarioId"
              value={formulario.funcionarioId}
              onChange={handleInputChange}
               className="w-full p-2 mb-4 bg-white border border-purple-600 rounded-md focus:outline-none focus:ring focus:ring-purple-600"
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
          <button className="w-full p-2 text-white bg-purple-300  rounded-md hover:bg-[#F7A834]  focus:outline-none focus:ring focus:ring-gray-700" type="submit">Agregar Grupo</button>
        </div>
      </form>
    </div>
  );
};

export default AddGrupo;
