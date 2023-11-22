import { useState } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

function GetEstudiantilById() {
    const api = useAxiosPrivate();
    const [id, setId] = useState("");
    const [estudiantil, setEstudiantil] = useState(null);

    const handleInputChange = (event) => {
        setId(event.target.value);
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        api
            .get(`insumoEst/${id}`)
            .then((response) => {
                setEstudiantil(response.data);
            })
            .catch((error) => {
                console.error(
                    "Error al obtener el insumo estudiantil por ID:",
                    error
                );
            });
    }


  return (
    <div className="relative max-w-md p-6 mx-auto mt-10 overflow-hidden bg-purple-600 rounded-lg shadow-lg">
        <h2 className="relative mb-4 text-2xl font-bold text-white">Obtener insumo estudiantil por ID</h2>
        <form onSubmit={handleSubmit} className="relative space-y-4">
            <div>
                <label className="block mb-1 text-sm font-medium text-white">ID del insumo estudiantil:</label>
                <input  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-200" type="text" value={id} onChange={handleInputChange} />
            </div>
            <div>
                <button  className="w-full p-2 text-white bg-purple-300  rounded-md hover:bg-[#F7A834]  focus:outline-none focus:ring focus:ring-gray-700" type="submit">Obtener insumo estudiantil</button>
            </div>
        </form>
        {estudiantil && (
            <div className="mt-4">
                <h3 className="mb-2 text-lg font-semibold text-white">Información del insumo estudiantil</h3>
                <p className="text-white">id: {estudiantil.id}</p>
                <p className="text-white">Nombre: {estudiantil.nombreInsumoEst}</p>
                <p className="text-white">Descripcion: {estudiantil.descripcion}</p>
                <p className="text-white">Cantidad: {estudiantil.cantidad}</p>
                <p className="text-white">Disponible: {estudiantil.disponible ? "Disponible" : "No Disponible"}</p>
                <p className="text-white">Categoria: {estudiantil.cateInsumoId}</p>
            </div>
        )}
    </div>
  )
}

export default GetEstudiantilById