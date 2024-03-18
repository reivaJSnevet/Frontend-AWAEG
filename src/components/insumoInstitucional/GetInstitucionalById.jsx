import { useState } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

function GetInstitucionalById() {
  const api = useAxiosPrivate();
  const [id, setId] = useState("");
  const [institucional, setInstitucional] = useState(null);

  const handleInputChange = (event) => {
    setId(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    api
      .get(`insumoInst/${id}`)
      .then((response) => {
        setInstitucional(response.data);
      })
      .catch((error) => {
        console.error(
          "Error al obtener el insumo institucional por ID:",
          error
        );
      });
  };

  return (
    <div className="relative max-w-md p-6 mx-auto mt-10 overflow-hidden bg-purple-600 rounded-lg shadow-lg">
      <h2 className="relative mb-4 text-2xl font-bold text-white">Obtener insumo institucional por ID</h2>
      <form className="relative space-y-4" onSubmit={handleSubmit}>
        <div>
          <label className="block mb-1 text-sm font-medium text-white">ID del insumo institucional:</label>
          <input className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-200" type="text" value={id} onChange={handleInputChange} />
        </div>
        <div>
          <button className="w-full p-2 text-white bg-purple-300  rounded-md hover:bg-[#F7A834]  focus:outline-none focus:ring focus:ring-gray-700" type="submit">Obtener insumo institucional</button>
        </div>
      </form>
      {institucional && (
        <div>
          <h3 className="mb-2 text-lg font-semibold text-white">Información del insumo institucional</h3>
          <p className="text-white">id: {institucional.id}</p>
          <p className="text-white">Nombre: {institucional.nombreInsumoInst}</p>
          <p className="text-white">Descripcion: {institucional.descripcion}</p>
          <p className="text-white">Cantidad: {institucional.cantidad}</p>
          <p className="text-white">Disponible: {institucional.disponible ? "Disponible" : "No Disponible"}</p>
          <p className="text-white">Categoria: {institucional.cateInsumoId}</p>
        </div>
      )}
    </div>
  );
}

export default GetInstitucionalById;
