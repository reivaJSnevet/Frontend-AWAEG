import { useState } from "react";
import api from "../../services/api.config.js";

const AddHorario = () => {
  const [provisional, setprovisional] = useState("");
  const [habilitado, setHabilitado] = useState("");

  const [errorMessages, setErrorMessages] = useState({});

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === "provisional") {
      setprovisional(value);
    } else if (name === "habilitado") {
      setHabilitado(value);
    }
  };

  const validateForm = () => {
    const errors = {};

    if (!provisional) {
      errors.provisional =
        "El espacio provisional debe ser seleccionar si o no";
    }

    if (!habilitado) {
      errors.habilitado = "El espacio habilitado debe ser seleccionar si o no";
    }
    setErrorMessages(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Verificar que los campos estén completos
    if (!validateForm()) {
      return;
    }

    try {
      // Realizar la solicitud POST a través de la instancia de Axios
      await api.post("/horarios", {
        provisional,
        habilitado,
      });

      // Limpiar el formulario después de enviar los datos
      setprovisional("");
      setHabilitado("");

      alert("horario agregado exitosamente.");
    } catch (error) {
      console.error("Error al agregar el horario:", error);
      alert(
        "Hubo un error al agregar el horario. Por favor, inténtelo de nuevo."
      );
    }
  };

  return (
    <div className="p-8 bg-purple-500 rounded-lg shadow-lg">
      <h2 className="mb-4 text-2xl text-white">Agregar Horario</h2>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div className="flex flex-col">
          <label className="text-white">Provisional:</label>
          <input
            type="text"
            name="provisional"
            value={provisional}
            onChange={handleInputChange}
            className="p-2 border border-white rounded"
          />
          {errorMessages.provisional && (
            <p className="text-yellow-500">{errorMessages.provisional}</p>
          )}
        </div>
        <div className="flex flex-col">
          <label className="text-white">Habilitado:</label>
          <input
            type="text"
            name="habiitado"
            value={habilitado}
            onChange={handleInputChange}
            className="p-2 border border-white rounded"
          />
          {errorMessages.habilitado && (
            <p className="text-yellow-500">{errorMessages.habilitado}</p>
          )}
        </div>

        <button
          type="submit"
          className="px-4 py-2 text-purple-800 bg-yellow-500 rounded hover:bg-yellow-400"
        >
          Agregar Horario
        </button>
      </form>
    </div>

    // <div>
    //   <h2>Agregar horario</h2>
    //   <form onSubmit={handleSubmit}>
    //     <div>
    //       <label>Provisional:</label>
    //       <input
    //         type=""
    //         name="provisional"
    //         value={provisional}
    //         onChange={handleInputChange}
    //       />
    //     </div>
    //     <div>
    //       <label>Estado de Horario:</label>
    //       <input
    //         type="text"
    //         name="habilitado"
    //         value={habilitado}
    //         onChange={handleInputChange}
    //       />
    //     </div>
    //     <div>
    //       <button type="submit">Agregar horario</button>
    //     </div>
    //   </form>
    // </div>
  );
};

export default AddHorario;
