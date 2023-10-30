import { useState } from "react";
import api from "../../services/api.config.js";

const AddNota = () => {
  const [calificacion, setCalificacion] = useState("");
  const [periodo, setPeriodo] = useState(0);
  const [fechaSubida, setFechaSubida] = useState("");
  const [errorMessages, setErrorMessages] = useState({});

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === "calificacion") {
      setCalificacion(value);
    } else if (name === "periodo") {
      setPeriodo(value);
    } else if (name === "fechaSubida") {
      setFechaSubida(value);
    }
  };

  const validateForm = () => {
    const errors = {};

    if (!calificacion) {
      errors.calificacion = "La calificacion es obligatoria";
    }

    if (!periodo) {
      errors.periodo = "El periodo es obligatorio";
    }

    if (!fechaSubida) {
      errors.fechaSubida = "La fecha de subida es obligatorio";
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
      await api.post("/Notas", {
        calificacion,
        periodo,
        fechaSubida,
      });

      // Limpiar el formulario después de enviar los datos
      setCalificacion("");
      setPeriodo("");
      setFechaSubida("");

      alert("Nota agregada exitosamente.");
    } catch (error) {
      console.error("Error al agregar el Nota:", error);
      alert("Hubo un error al agregar el Nota. Por favor, inténtelo de nuevo.");
    }
  };

  return (
    <div className="p-8 bg-purple-500 rounded-lg shadow-lg">
      <h2 className="mb-4 text-2xl text-white">Agregar Nota</h2>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div className="flex flex-col">
          <label className="text-white">Calificacion:</label>
          <input
            type="text"
            name="calificacion"
            value={calificacion}
            onChange={handleInputChange}
            className="p-2 border border-white rounded"
          />
          {errorMessages.calificacion && (
            <p className="text-yellow-500">{errorMessages.calificacion}</p>
          )}
        </div>
        <div className="flex flex-col">
          <label className="text-white">Periodo:</label>
          <input
            type="text"
            name="periodo"
            value={periodo}
            onChange={handleInputChange}
            className="p-2 border border-white rounded"
          />
          {errorMessages.periodo && (
            <p className="text-yellow-500">{errorMessages.periodo}</p>
          )}
        </div>
        <div className="flex flex-col">
          <label className="text-white">Fecha de Subida:</label>
          <input
            type="text"
            name="fechaSubida"
            value={fechaSubida}
            onChange={handleInputChange}
            className="p-2 border border-white rounded"
          />
          {errorMessages.fechaSubida && (
            <p className="text-yellow-500">{errorMessages.fechaSubida}</p>
          )}
        </div>

        <button
          type="submit"
          className="px-4 py-2 text-purple-800 bg-yellow-500 rounded hover:bg-yellow-400"
        >
          Agregar Nota
        </button>
      </form>
    </div>

    // <div>
    //   <h2>Agregar Nota</h2>
    //   <form onSubmit={handleSubmit}>
    //     <div>
    //       <label>calificacion:</label>
    //       <input
    //         type="text"
    //         name="calificacion"
    //         value={calificacion}
    //         onChange={handleInputChange}
    //       />
    //     </div>
    //     <div>
    //       <label>Periodo:</label>
    //       <input
    //         type="text"
    //         name="periodo"
    //         value={periodo}
    //         onChange={handleInputChange}
    //       />
    //     </div>
    //     <div>
    //       <label>Fecha de Subida:</label>
    //       <input
    //         type="text"
    //         name="fechaSubida"
    //         value={fechaSubida}
    //         onChange={handleInputChange}
    //       />
    //     </div>
    //     <div>
    //       <button type="submit">Agregar Nota</button>
    //     </div>
    //   </form>
    // </div>
  );
};

export default AddNota;
