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
    <div  className="p-8 bg-purple-400 rounded shadow-lg">
      <h2 className="mb-6 text-3xl font-semibold text-white">Actualizar Nota</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block mb-2 text-sm font-semibold text-white">Calificación:</label>
          <input
            type="number"
            name="calificacion"
            value={formData.calificacion}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded focus:outline-none focus:border-purple-400"
            min="0"
            max="100"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 text-sm font-semibold text-white">Periodo:</label>
          <input
            type="text"
            name="periodo"
            value={formData.periodo}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded focus:outline-none focus:border-purple-400"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 text-sm font-semibold text-white">Fecha de Subida:</label>
          <input
            type="date"
            name="fechaSubida"
            value={formData.fechaSubida}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded focus:outline-none focus:border-purple-400"
          />
        </div>
        <div>
          <button className="w-full p-2 text-white bg-purple-300  rounded-md hover:bg-[#F7A834]  focus:outline-none focus:ring focus:ring-gray-700" type="submit">Actualizar</button>
        </div>
      </form>
    </div>
  );
};

export default UpdateNota;
