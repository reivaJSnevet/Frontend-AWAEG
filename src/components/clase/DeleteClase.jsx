import { useState, useEffect } from "react";
import api from "../../services/api.config.js";
import { useParams } from "react-router-dom";

const DeleteClase = () => {
  const { paramId } = useParams();
  const [id, setId] = useState(paramId || "");

  console.log(paramId);

  useEffect(() => {
    if (paramId) {
      setId(paramId);
    }
  }, [paramId]);

  const deleteClase = async () => {
    try {
      await api.delete(`/clases/${id}`);
      alert("Clase eliminada con éxito.");
    } catch (error) {
      alert("Error al eliminar la clase.");
    }
  };

  return (
    <div className="max-w-md p-6 mx-auto mt-10 bg-purple-400 rounded-lg shadow-lg">
      <h2 className="mb-4 text-2xl font-bold text-white">Eliminar Clase</h2>
      <div>
        <label className="block mb-1 text-sm font-medium text-white">ID:</label>
        <input
          className="w-full p-2 bg-transparent border border-white rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
          disabled
          type="text"
          value={id}
          onChange={(e) => setId(e.target.value)}
        />
        <button className="w-full p-2 text-white bg-purple-300  rounded-md hover:bg-[#F7A834]  focus:outline-none focus:ring focus:ring-gray-700" onClick={deleteClase}>Eliminar</button>
      </div>
    </div>
  );
};

export default DeleteClase;
