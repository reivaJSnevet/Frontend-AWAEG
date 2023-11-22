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
    <div className="max-w-md p-6 mx-auto mt-10 bg-purple-400 rounded-lg shadow-lg">
      <h2 className="mb-4 text-2xl font-bold text-white">Eliminar Institucional por ID</h2>
      <form onSubmit={handleDelete} className="space-y-4">
        <div>
          <label className="block mb-1 text-sm font-medium text-white">ID del institucional a Eliminar:</label>
          <input
            type="text"
            value={institucionalId}
            onChange={handleInputChange}
            disabled
            className="w-full p-2 bg-transparent border border-white rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
          />
        </div>
        <div>
          <button className="w-full p-2 text-white bg-purple-300  rounded-md hover:bg-[#F7A834]  focus:outline-none focus:ring focus:ring-gray-700" type="submit">Eliminar Institucional</button>
        </div>
      </form>
    </div>
  );
}

export default DeleteInstitucional;
