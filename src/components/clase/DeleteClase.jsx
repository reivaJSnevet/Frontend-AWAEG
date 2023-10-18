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
    <div>
      <h2>Eliminar Clase</h2>
      <div>
        <label>ID:</label>
        <input type="text" value={id} onChange={(e) => setId(e.target.value)} />
        <button onClick={deleteClase}>Eliminar</button>
      </div>
    </div>
  );
};

export default DeleteClase;
