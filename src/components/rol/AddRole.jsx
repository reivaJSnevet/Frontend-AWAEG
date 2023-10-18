import { useState } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

const AddRol = () => {
    const api = useAxiosPrivate();
  const [nombre, setNombre] = useState("");
  const [nivelPrivilegio, setNivelPrivilegio] = useState(0);
  const [descripcion, setDescripcion] = useState("");
  const [mensaje, setMensaje] = useState(null);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === "nombre") {
      setNombre(value);
    } else if (name === "nivelPrivilegio") {
      setNivelPrivilegio(value);
    } else if (name === "descripcion") {
      setDescripcion(value);
    }
  };

  const handleValidation = () => {
    if (isNaN(nivelPrivilegio)) {
      setMensaje("El nivel de privilegio debe ser un número y estar entre 1 y 5");
      return false;
    } else if (nivelPrivilegio < 1 || nivelPrivilegio > 5) {
      setMensaje("El nivel de privilegio debe estar entre 1 y 5");
      return false;
    }
    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!handleValidation()) {
      return;
    }

    try {
      await api.post("/roles", {
        nombre,
        nivelPrivilegio,
        descripcion,
      });

      setNombre("");
      setNivelPrivilegio(0);
      setDescripcion("");
      setMensaje("Rol agregado exitosamente.");
    } catch (error) {
      console.error("Error al agregar el rol:", error);
      setMensaje("Hubo un error al agregar el rol. Por favor, inténtelo de nuevo.");
    }
  };

  return (
    <div className="max-w-md p-8 mx-auto mt-10 bg-purple-500 rounded-lg shadow-lg">
      <h2 className="mb-6 text-2xl font-bold text-white">Agregar Rol</h2>
      {mensaje && <div className="mb-4 text-gray-200">{mensaje}</div>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 text-sm font-medium text-white">Nombre:</label>
          <input
            type="text"
            name="nombre"
            value={nombre}
            onChange={handleInputChange}
            className="w-full p-2 bg-transparent border border-white rounded-md focus:outline-none focus:ring focus:ring-white"
          />
        </div>
        <div>
          <label className="block mb-1 text-sm font-medium text-white">Nivel de Privilegio:</label>
          <input
            type="number"
            name="nivelPrivilegio"
            value={nivelPrivilegio}
            onChange={handleInputChange}
            className="w-full p-2 bg-transparent border border-white rounded-md focus:outline-none focus:ring focus:ring-white"
          />
        </div>
        <div>
          <label className="block mb-1 text-sm font-medium text-white">Descripción:</label>
          <input
            type="text"
            name="descripcion"
            value={descripcion}
            onChange={handleInputChange}
            className="w-full p-2 bg-transparent border border-white rounded-md focus:outline-none focus:ring focus:ring-white"
          />
        </div>
        <div>
          <button
            type="submit"
            className="w-full p-2 text-purple-500 bg-white rounded-md hover:bg-gray-100 focus:outline-none focus:ring focus:ring-gray-200"
          >
            Agregar Rol
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddRol;
