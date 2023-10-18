import { useState } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import useAuth from "../../hooks/useAuth";

function AddCita() {
  const api = useAxiosPrivate();
  const { auth } = useAuth();
  const [cita, setCita] = useState({
    dia: "",
    asunto: "",
    duracion: "",
    ubicacion: "",
    funcionarioId: auth.personaId,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCita({
      ...cita,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/citas", cita);

      console.log("Cita creada:", response.data);

      setCita({
        dia: "",
        asunto: "",
        duracion: "",
        ubicacion: "",
        funcionarioId: "",
      });
    } catch (error) {
      console.error("Error al crear la cita:", error);
    }
  };

  return (
    <div>
      <h2>Añadir Cita</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Fecha y Hora:</label>
          <input
            type="datetime-local"
            name="dia"
            value={cita.dia}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Asunto:</label>
          <input
            type="text"
            name="asunto"
            value={cita.asunto}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Duración:</label>
          <input
            type="text"
            name="duracion"
            value={cita.duracion}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Ubicación:</label>
          <input
            type="text"
            name="ubicacion"
            value={cita.ubicacion}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>ID del Funcionario:</label>
          <input
            type="text"
            name="funcionarioId"
            value={cita.funcionarioId}
            onChange={handleInputChange}
          />
        </div>
        <button type="submit">Agregar Cita</button>
      </form>
    </div>
  );
}

export default AddCita;
