import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

function DeleteInstitucional() {
  const api = useAxiosPrivate();
  const [institucionalId, setInstitucionalId] = useState("");
  const { paramId } = useParams();

  const handleInputChange = (event) => {
    setInstitucionalId(event.target.value);
  };

  useEffect(() => {
    if (paramId) {
      setInstitucionalId(paramId);
    } else {
      setInstitucionalId("");
    }
  }, [paramId]);

  const handleDelete = (event) => {
    event.preventDefault();

    api
      .delete(`/insumoInst/${paramId}`)
      .then(() => {
        alert("Institucional eliminado con éxito.");
        setInstitucionalId("");
      })
      .catch((error) => {
        console.error("Error al eliminar el institucional por ID:", error);
      });
  };

  return (
    <div>
      <h2>Eliminar Institucional por ID</h2>
      <form onSubmit={handleDelete}>
        <div>
          <label>ID del institucional a Eliminar:</label>
          <input
            type="text"
            value={institucionalId}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <button type="submit">Eliminar Institucional</button>
        </div>
      </form>
    </div>
  );
}

export default DeleteInstitucional;
