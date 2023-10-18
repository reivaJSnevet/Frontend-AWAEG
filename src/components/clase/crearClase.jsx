import { useState, useEffect } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate.jsx";
import {
  convertirAFormato24Horas,
  convertirAFormato12Horas,
  convertirANumeroRomano,
} from "../../services/conversores.js";

const CrearClase = () => {
  const api = useAxiosPrivate();
  const [dia, setDia] = useState("lunes");
  const [selectedLeccion, setSelectedLeccion] = useState("I");
  const [profesores, setProfesores] = useState([]);
  const [materias, setMaterias] = useState([]);
  const [selectedProfesor, setSelectedProfesor] = useState("");
  const [selectedMateria, setSelectedMateria] = useState("");
  const [turno, setTurno] = useState("mañana");

  const diasSemana = ["lunes", "martes", "miércoles", "jueves", "viernes"];

  useEffect(() => {
    try {
      const fetchData = async () => {
        const responseF = await api.get("/funcionarios");
        const responseM = await api.get("/materias");

        setProfesores(responseF.data);
        setMaterias(responseM.data);
      };
      fetchData();
    } catch (error) {
        console.log(error);
    }
  }, []);

  const handleToggleTurno = () => {
    setTurno(turno === "mañana" ? "tarde" : "mañana");
  };

  const calcularHoraInicio = (leccion) => {
    if (turno === "mañana") {
      const horasManana = [
        "07:00",
        "07:40",
        "08:40",
        "09:20",
        "10:05",
        "10:45",
        "11:30",
      ];
      return convertirAFormato12Horas(horasManana[leccion - 1]);
    } else {
      const horasTarde = [
        "12:30",
        "13:10",
        "13:55",
        "14:35",
        "15:35",
        "16:15",
        "17:00",
      ];
      return convertirAFormato12Horas(horasTarde[leccion - 1]);
    }
  };

  const calcularHoraSalida = (leccion) => {
    if (turno === "mañana") {
      const horasManana = [
        "07:40",
        "08:20",
        "09:20",
        "10:00",
        "10:45",
        "11:25",
        "12:10",
      ];
      return convertirAFormato12Horas(horasManana[leccion - 1]);
    } else {
      const horasTarde = [
        "13:10",
        "13:50",
        "14:35",
        "15:15",
        "16:15",
        "16:55",
        "17:40",
      ];
      return convertirAFormato12Horas(horasTarde[leccion - 1]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const lecccionNumerica = parseInt(selectedLeccion);
      const leccionRomana = convertirANumeroRomano(lecccionNumerica);

      // Convertir la hora de 12 horas a 24 horas antes de enviarla al API
      const horaInicio24h = convertirAFormato24Horas(
        calcularHoraInicio(selectedLeccion)
      );
      const horaSalida24h = convertirAFormato24Horas(
        calcularHoraSalida(selectedLeccion)
      );

      await api.post("/clases", {
        funcionarioId: selectedProfesor,
        materiaId: selectedMateria,
        leccion: leccionRomana,
        dia,
        horaInicio: horaInicio24h, // Enviar hora de inicio en formato de 24 horas
        horaSalida: horaSalida24h, // Enviar hora de salida en formato de 24 horas
      });
      alert("Clase creada con éxito.");
    } catch (error) {
      alert("Error al crear la clase.");
    }
  };

  return (
    <div>
      <h2>Crear Clase</h2>
      <button onClick={handleToggleTurno}>
        Cambiar Turno: {turno.charAt(0).toUpperCase() + turno.slice(1)}
      </button>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Profesor:</label>
          <select
            value={selectedProfesor}
            onChange={(e) => setSelectedProfesor(e.target.value)}
          >
            <option value="">Seleccione un profesor</option>
            {profesores.map((profesor) => (
              <option key={profesor.id} value={profesor.id}>
                {profesor.nombre +
                  " " +
                  profesor.apellido1 +
                  " " +
                  profesor.apellido2}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Materia:</label>
          <select
            value={selectedMateria}
            onChange={(e) => setSelectedMateria(e.target.value)}
          >
            <option value="">Seleccione una materia</option>
            {materias.map((materia) => (
              <option key={materia.id} value={materia.id}>
                {materia.nombre}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Día:</label>
          <select value={dia} onChange={(e) => setDia(e.target.value)}>
            <option value="">Seleccione un día</option>
            {diasSemana.map((dia) => (
              <option key={dia} value={dia}>
                {dia}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Lección:</label>
          <select
            value={selectedLeccion}
            onChange={(e) => setSelectedLeccion(e.target.value)}
          >
            <option value="">Seleccione una lección</option>
            {[1, 2, 3, 4, 5, 6, 7].map((numero) => (
              <option key={numero} value={numero}>
                {convertirANumeroRomano(numero)}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Hora de Entrada:</label>
          <input
            type="text"
            value={calcularHoraInicio(selectedLeccion)}
            readOnly
          />
        </div>
        <div>
          <label>Hora de Salida:</label>
          <input
            type="text"
            value={calcularHoraSalida(selectedLeccion)}
            readOnly
          />
        </div>
        <button type="submit">Crear</button>
      </form>
    </div>
  );
};

export default CrearClase;
