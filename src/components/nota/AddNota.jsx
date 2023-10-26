import { useEffect, useState } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import useAuth from "../../hooks/useAuth";

const AddNota = () => {
  const api = useAxiosPrivate();
  const { auth } = useAuth();
  const personaId = auth?.personaId || 0;
  const [estudiantes, setEstudiantes] = useState([]);
  const [clases, setClases] = useState([]);
  const [nota, setNota] = useState({
    calificacion: "",
    periodo: "",
    fechaSubida: "",
    funcionarioId: personaId,
    claseId: "",
    estudianteId: "",
  });

  useEffect(() => {
    const fetchEstudiantes = async () => {
      try {
        const responseEst = await api.get(`clases/estudiantes/${712345678}`);
        const responseClas = await api.get(`/notas/Clases/${712345678}`);
        setClases(responseClas.data);
        setEstudiantes(responseEst.data);
        
      } catch (error) {
        console.error("Error trayendo los estudiantes:", error);
      }
    };
    fetchEstudiantes();

  }, []);

  console.log("clases", clases);
  console.log("estudiantes", estudiantes);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNota((prevNota) => ({
      ...prevNota,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Verificar que los campos estén completos
    if (!nota.calificacion || !nota.periodo || !nota.fechaSubida) {
      alert("Por favor, complete todos los campos.");
      return;
    }

    try {
      // Realizar la solicitud POST a través de la instancia de Axios
      await api.post("/Notas", nota);

      // Limpiar el formulario después de enviar los datos
      setNota({
        calificacion: "",
        periodo: "",
        fechaSubida: "",
      });

      alert("Nota agregada exitosamente.");
    } catch (error) {
      console.error("Error al agregar la Nota:", error);
      alert("Hubo un error al agregar la Nota. Por favor, inténtelo de nuevo.");
    }
  };

  return (
    <div>
      <h2>Agregar Nota</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Calificación:</label>
          <input
            type="text"
            name="calificacion"
            value={nota.calificacion}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Periodo:</label>
          <input
            type="text"
            name="periodo"
            value={nota.periodo}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Fecha de Subida:</label>
          <input
            type="text"
            name="fechaSubida"
            value={nota.fechaSubida}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Clase:</label>
          <select
            name="claseId"
            value={nota.claseId}
            onChange={handleInputChange}
          >
            <option value="" disabled>
              Seleccione una clase
            </option>
            {clases.map((clase) => (
              <option key={clase.id} value={clase.id}>
                {clase.nombre}{" "}
                {/* Reemplaza 'nombre' con la propiedad correcta del objeto de clase */}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Estudiante:</label>
          <select
            name="estudianteId"
            value={nota.estudianteId}
            onChange={handleInputChange}
          >
            <option value="" disabled>
              Seleccione un estudiante
            </option>
            {estudiantes.map((estudiante) => (
              <option key={estudiante.id} value={estudiante.id}>
                {estudiante.nombre}{" "}
                {/* Reemplaza 'nombre' con la propiedad correcta del objeto de estudiante */}
              </option>
            ))}
          </select>
        </div>
        <div>
          <button type="submit">Agregar Nota</button>
        </div>
      </form>
    </div>
  );
};

export default AddNota;
