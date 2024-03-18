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
    <div className="max-w-md p-8 mx-auto mt-10 bg-purple-600 rounded-lg shadow-lg">
      <h2 className="mb-6 text-2xl font-bold text-white">Añadir Cita</h2>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label className="block mb-1 text-sm font-medium text-white">Fecha y Hora:</label>
          <input
            type="datetime-local"
            name="dia"
            value={cita.dia}
            onChange={handleInputChange}
             className="w-full p-2 bg-white border border-purple-600 rounded-md focus:outline-none focus:ring focus:ring-purple-600"
          />
        </div>
        <div>
          <label className="block mb-1 text-sm font-medium text-white">Asunto:</label>
          <input
            type="text"
            name="asunto"
            value={cita.asunto}
            onChange={handleInputChange}
             className="w-full p-2 bg-white border border-purple-600 rounded-md focus:outline-none focus:ring focus:ring-purple-600"
          />
        </div>
        <div>
          <label className="block mb-1 text-sm font-medium text-white">Duración:</label>
          <input
            type="text"
            name="duracion"
            value={cita.duracion}
            onChange={handleInputChange}
             className="w-full p-2 bg-white border border-purple-600 rounded-md focus:outline-none focus:ring focus:ring-purple-600"
          />
        </div>
        <div>
          <label className="block mb-1 text-sm font-medium text-white">Ubicación:</label>
          <input
            type="text"
            name="ubicacion"
            value={cita.ubicacion}
            onChange={handleInputChange}
             className="w-full p-2 bg-white border border-purple-600 rounded-md focus:outline-none focus:ring focus:ring-purple-600"
          />
        </div>
        <div>
          <label className="block mb-1 text-sm font-medium text-white">ID del Funcionario:</label>
          <input
            type="text"
            name="funcionarioId"
            value={cita.funcionarioId}
            onChange={handleInputChange}
             className="w-full p-2 bg-white border border-purple-600 rounded-md focus:outline-none focus:ring focus:ring-purple-600"
          />
        </div>
        <button className="w-full p-2 text-white bg-purple-300  rounded-md hover:bg-[#F7A834]  focus:outline-none focus:ring focus:ring-gray-700" type="submit">Agregar Cita</button>
      </form>
    </div>
  );
}

export default AddCita;
