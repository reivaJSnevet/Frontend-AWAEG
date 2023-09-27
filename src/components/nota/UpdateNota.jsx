import { useState, useEffect } from "react";
import api from "../../services/api.config.js";
import { useParams } from "react-router-dom";

const UpdateNota = () => {
  const { id } = useParams();

  const [formData, setFormData] = useState({
    calificacion: "",
    periodo: "",
    fechaSubida: "",
  });

  useEffect(() => {
    if (id) {
      const fetchData = async () => {
        try {
          const response = await api.get(`notas/${id}`);
          setFormData(response.data);
        } catch (error) {
          console.error(
            "Error fetching nota:",
            error.response?.data || error.message
          );
        }
      };
      fetchData();
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.calificacion || !formData.periodo || !formData.fechaSubida) {
      alert("Por favor, complete todos los campos.");
      return;
    }

    try {
      const response = await api.put(`notas/${formData.id}`, formData);
      console.log("Update successful:", response.data);
      alert("Nota actualizada exitosamente.");
    } catch (error) {
      console.error(
        "Error updating nota:",
        error.response?.data || error.message
      );
      alert("Error al actualizar nota.");
    }
  };

  return (
    <div>
      <h2>Actualizar Nota</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Calificación:</label>
          <input
            type="number"
            name="calificacion"
            value={formData.calificacion}
            onChange={handleChange}
            required
            min="0"
            max="100"
          />
        </div>
        <div>
          <label>Periodo:</label>
          <input
            type="text"
            name="periodo"
            value={formData.periodo}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Fecha de Subida:</label>
          <input
            type="date"
            name="fechaSubida"
            value={formData.fechaSubida}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <button type="submit">Actualizar</button>
        </div>
      </form>
    </div>
  );
};

export default UpdateNota;
