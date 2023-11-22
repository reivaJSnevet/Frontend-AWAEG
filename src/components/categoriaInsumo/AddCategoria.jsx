import { useState } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

function AddCategoria() {
  const api = useAxiosPrivate();
  const [categoria, setCategoria] = useState({
    nombreCateInsumo: "",
    descripcionCateInsumo: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCategoria((prevCategoria) => ({
      ...prevCategoria,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("cateInsumo", categoria);
      console.log("Categoria añadida con éxito:", response.data);
      // Puedes hacer algo con la respuesta, como redirigir a otra página o mostrar un mensaje de éxito.
    } catch (error) {
      console.error("Error al añadir la categoría:", error);
      // Puedes manejar errores aquí, mostrar un mensaje de error al usuario, etc.
    }
  };

  return (
    <div className="max-w-md p-8 mx-auto mt-10 bg-purple-600 rounded-lg shadow-lg">
      <h2 className="mb-6 text-2xl font-bold text-white">Añadir Categoría</h2>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label className="block mb-1 text-sm font-medium text-white">
            Nombre:
          </label>
          <input
            type="text"
            name="nombreCateInsumo"
            value={categoria.nombreCateInsumo}
            onChange={handleChange}
            required
            className="w-full p-2 bg-white border border-purple-600 rounded-md focus:outline-none focus:ring focus:ring-purple-600"
          />
        </div>
        <div>
          <label className="block mb-1 text-sm font-medium text-white">
            Descripción:
          </label>
          <input
            type="text"
            name="descripcionCateInsumo"
            value={categoria.descripcionCateInsumo}
            onChange={handleChange}
            required
            className="w-full p-2 bg-white border border-purple-600 rounded-md focus:outline-none focus:ring focus:ring-purple-600"
          />
        </div>
        <button
          className="w-full p-2 text-white bg-purple-300  rounded-md hover:bg-[#F7A834]  focus:outline-none focus:ring focus:ring-gray-700"
          type="submit"
        >
          Añadir Categoría
        </button>
      </form>
    </div>
  );
}

export default AddCategoria;
