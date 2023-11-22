import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

const DeleteNotaById = () => {
  const api = useAxiosPrivate();
  const [notaId, setNotaId] = useState("");
  const { paramId } = useParams();

  const handleInputChange = (event) => {
    setNotaId(event.target.value);
  };

  useEffect(() => {
    if (paramId) {
      setNotaId(paramId);
    } else {
      setNotaId("");
    }
  }, [paramId]);

  const handleDelete = (event) => {
    event.preventDefault();

    // Realiza una solicitud DELETE para eliminar el Nota por ID
    api
      .delete(`/notas/${paramId}`)
      .then(() => {
        // Maneja el éxito, por ejemplo, mostrando un mensaje de éxito
        alert("Nota eliminado con éxito.");
        // Limpia el campo de entrada después de eliminar el Nota
        setNotaId("");
      })
      .catch((error) => {
        console.error("Error al eliminar el Nota por ID:", error);
        // Puedes manejar errores aquí, por ejemplo, mostrando un mensaje de error
      });
  };

  return (
    <div className="max-w-md p-6 mx-auto mt-10 bg-purple-400 rounded-lg shadow-lg">
      <h2 className="mb-4 text-2xl font-bold text-white">
        Eliminar Nota por ID
      </h2>
      <form className="space-y-4" onSubmit={handleDelete}>
        <div>
          <label className="block mb-1 text-sm font-medium text-white">
            ID de la Nota a Eliminar:
          </label>
          <input
            type="text"
            value={notaId}
            onChange={handleInputChange}
            disabled
            className="w-full p-2 bg-transparent border border-white rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
          />
        </div>
        <div>
          <button
            className="w-full p-2 text-white bg-purple-300  rounded-md hover:bg-[#F7A834]  focus:outline-none focus:ring focus:ring-gray-700"
            type="submit"
          >
            Eliminar Nota
          </button>
        </div>
      </form>
    </div>
  );
};

export default DeleteNotaById;
