import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

function UpdateCategoria() {
    const api = useAxiosPrivate();
    const { paramId } = useParams();
    const [formData, setFormData] = useState({
        id: "",
        nombreCateInsumo: "",
        descripcionCateInsumo: "",
    });

useEffect(() => {
    if (paramId) {
        const fetchData = async () => {
            try {
                const response = await api.get(`cateInsumo/${paramId}`);
                const { id, nombreCateInsumo, descripcionCateInsumo } = response.data;
                setFormData({
                    id,
                    nombreCateInsumo,
                    descripcionCateInsumo,
                });
            } catch (error) {
                console.error(
                    "Error fetching categoria:",
                    error.response?.data || error.message
                );
            }
        };
        fetchData();
    }
}, [paramId]);

const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
        ...prevState,
        [name]: value,
    }));
};

const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const response = await api.put(`cateInsumo/${paramId}`, formData);
        console.log("Categoria actualizada con éxito:", response.data);
        // Puedes hacer algo con la respuesta, como redirigir a otra página o mostrar un mensaje de éxito.
    } catch (error) {
        console.error("Error al actualizar la categoria:", error);
        // Puedes manejar errores aquí, mostrar un mensaje de error al usuario, etc.
    }
}



  return (
    <div className="p-8 bg-purple-400 rounded shadow-lg">
        <h2 className="mb-6 text-3xl font-semibold text-white">Actualizar Categoría</h2>
        <form onSubmit={handleSubmit}>
            <div className="mb-4">
            <label className="block mb-2 text-sm font-semibold text-white">Nombre:</label>
            <input
                type="text"
                name="nombreCateInsumo"
                value={formData.nombreCateInsumo}
                onChange={handleChange}
                required
                 className="w-full p-2 border rounded focus:outline-none focus:border-purple-400"
            />
            </div>
            <div className="mb-4">
            <label className="block mb-2 text-sm font-semibold text-white">Descripción:</label>
            <input
                type="text"
                name="descripcionCateInsumo"
                value={formData.descripcionCateInsumo}
                onChange={handleChange}
                required
                 className="w-full p-2 border rounded focus:outline-none focus:border-purple-400"
            />
            </div>
            <button className="w-full p-2 text-white bg-purple-300  rounded-md hover:bg-[#F7A834]  focus:outline-none focus:ring focus:ring-gray-700" type="submit">Actualizar Categoría</button>
        </form>
    </div>
  )
}

export default UpdateCategoria