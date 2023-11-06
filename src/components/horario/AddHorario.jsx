import { useEffect, useState } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

const AddHorario = () => {
  const api = useAxiosPrivate();
  const [clases, setClases] = useState([]);
  const [horario, setHorario] = useState({
    provisional: false,
    habilitado: false,
  });

  useEffect(() => {
    const fetchClases = async () => {
      try {
        const response = await api.get("/clases");
        setClases(response.data);
      } catch (error) {
        console.error(
          "Error fetching clases:",
          error.response?.data || error.message
        );
      }
    };
    fetchClases();
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setHorario((prevHorario) => ({
      ...prevHorario,
      [name]: value === "true",
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Verificar que los campos estén completos
    if (horario.provisional === null || horario.habilitado === null) {
      alert("Por favor, complete todos los campos.");
      return;
    }

    try {
      // Realizar la solicitud POST a través de la instancia de Axios
      await api.post("/horarios", horario);

      // Limpiar el formulario después de enviar los datos
      setHorario({
        provisional: false,
        habilitado: false,
      });

      alert("Horario agregado exitosamente.");
    } catch (error) {
      console.error("Error al agregar el horario:", error);
      alert(
        "Hubo un error al agregar el horario. Por favor, inténtelo de nuevo."
      );
    }
  };

  return (
    <div>
      <h2>Agregar horario</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Provisional:</label>
          <select
            name="provisional"
            value={horario.provisional.toString()}
            onChange={handleInputChange}
          >
            <option value="true">Sí</option>
            <option value="false">No</option>
          </select>
        </div>
        <div>
          <label>Estado de Horario:</label>
          <select
            name="habilitado"
            value={horario.habilitado.toString()}
            onChange={handleInputChange}
          >
            <option value="true">Activo</option>
            <option value="false">Inactivo</option>
          </select>
        </div>
        <table className="min-w-full border border-gray-200">
          <thead>
            <tr>
              <th className="px-4 py-2 border-b">Hora</th>
              <th className="px-4 py-2 border-b">Lección</th>
              <th className="px-4 py-2 border-b">lunes</th>
              <th className="px-4 py-2 border-b">martes</th>
              <th className="px-4 py-2 border-b">miércoles</th>
              <th className="px-4 py-2 border-b">jueves</th>
              <th className="px-4 py-2 border-b">viernes</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              {[...Array(6)].map((_, index) => {
                const selectedClass = clases.find(
                  (clase) => clase.leccion === "I"
                );
                const selectedHour = selectedClass ? selectedClass.horaInicio : ""; // Obtén la hora de la clase seleccionada
                return (
                  <td key={index} className="px-4 py-2 border">
                    <div>{selectedHour}</div>
                    <select
                      name={`leccionI${index}`}
                      className="w-full px-3 py-2 bg-white border border-gray-300 rounded outline-none"
                    >
                      <option value="">Selecciona una clase</option>
                      {clases
                        .filter((clase) => clase.leccion === "I")
                        .map((clase, index) => (
                          <option key={index} value={clase.id}>
                            {`${clase.materia.nombre} - ${clase.funcionario.nombre} ${clase.funcionario.apellido}`}
                          </option>
                        ))}
                    </select>
                  </td>
                );
              })}
            </tr>
          </tbody>
        </table>

        <div>
          <button type="submit">Agregar horario</button>
        </div>
      </form>
    </div>

  );
};

export default AddHorario;
