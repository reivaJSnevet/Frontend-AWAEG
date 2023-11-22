import { useState, useEffect } from "react";
import api from "../../services/api.config.js";
import { useParams } from "react-router-dom";

const UpdateClase = () => {
  const { id } = useParams();
  const [clase, setClase] = useState({
    dia: "",
    horaInicio: "",
    horaSalida: "",
    leccion: "",
  });

  useEffect(() => {
    if (!id) return;
    const fetchClase = async () => {
      try {
        const response = await api.get(`/clases/${id}`);
        setClase(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchClase();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setClase((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/clases/${id}`, clase);
      alert("Clase actualizada con éxito.");
    } catch (error) {
      alert("Error al actualizar la clase.");
    }
  };

  return (
    <div className="p-8 bg-purple-400 rounded shadow-lg">
      <h2 className="mb-6 text-3xl font-semibold text-white">
        Actualizar Clase
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block mb-2 text-sm font-semibold text-white">
            Día:
          </label>
          <input
            type="text"
            name="dia"
            value={clase.dia}
            onChange={handleInputChange}
            className="w-full p-2 border rounded focus:outline-none focus:border-purple-400"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 text-sm font-semibold text-white">
            Hora de Inicio:
          </label>
          <input
            type="time"
            name="horaInicio"
            value={clase.horaInicio}
            onChange={handleInputChange}
            className="w-full p-2 border rounded focus:outline-none focus:border-purple-400"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 text-sm font-semibold text-white">
            Hora de Salida:
          </label>
          <input
            type="time"
            name="horaSalida"
            value={clase.horaSalida}
            onChange={handleInputChange}
            className="w-full p-2 border rounded focus:outline-none focus:border-purple-400"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 text-sm font-semibold text-white">
            Lección:
          </label>
          <input
            type="text"
            name="leccion"
            value={clase.leccion}
            onChange={handleInputChange}
            className="w-full p-2 border rounded focus:outline-none focus:border-purple-400"
            required
          />
        </div>
        <button  className="w-full p-2 text-white bg-purple-300  rounded-md hover:bg-[#F7A834]  focus:outline-none focus:ring focus:ring-gray-700" type="submit">Actualizar</button>
      </form>
    </div>
  );
};

export default UpdateClase;
