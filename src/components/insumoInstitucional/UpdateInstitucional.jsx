import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

function UpdateInstitucional() {
    const api = useAxiosPrivate();
    const { paramId } = useParams();
    const [categorias, setCategorias] = useState([]);
    const [formData, setFormData] = useState({
        id: "",
        nombreInsumoInst: "",
        disponible: false,
        cantidad: "",
        descripcion: "",
        cateInsumoId: "",
    });

    useEffect(() => {
        const fetchCategorias = async () => {
            try {
                const response = await api.get("cateInsumo");
                setCategorias(response.data);
            } catch (error) {
                console.log(error);
            }
        }

        const fetchInstitucional = async () => {
            try {
                const response = await api.get(`insumoInst/${paramId}`);
                setFormData(response.data);
            } catch (error) {
                console.log(error);
            }
        }

        fetchCategorias();
        fetchInstitucional();
    }, [paramId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await api.put(`insumoInst/${paramId}`, formData);
            console.log("Insumo Institucional actualizado con éxito:", response.data);
        } catch (error) {
            console.error("Error al actualizar el insumo institucional:", error);
        }
    }


  return (
    <div className="p-8 bg-purple-400 rounded shadow-lg">
        <h2 className="mb-6 text-3xl font-semibold text-white">Actualizar Insumo Institucional</h2>
        <form onSubmit={handleSubmit}>
            <div  className="mb-4">
                <label className="block mb-2 text-sm font-semibold text-white">Nombre:</label>
                <input
                    type="text"
                    name="nombreInsumoInst"
                    value={formData.nombreInsumoInst}
                    onChange={handleChange}
                    required
                    className="w-full p-2 border rounded focus:outline-none focus:border-purple-400"
                />
            </div>
            <div className="mb-4">
                <label className="block mb-2 text-sm font-semibold text-white">Disponible:</label>
                <select
                className="w-full p-2 border rounded focus:outline-none focus:border-purple-400" name="disponible" value={formData.disponible} onChange={handleChange}>
                    <option value="">Selecciona una opción</option>
                    <option value={true}>Disponible</option>
                    <option value={false}>No Disponible</option>
                </select>
            </div>
            <div className="mb-4">
                <label className="block mb-2 text-sm font-semibold text-white">Cantidad:</label>
                <input
                    type="number"
                    name="cantidad"
                    value={formData.cantidad}
                    onChange={handleChange}
                    required
                    className="w-full p-2 border rounded focus:outline-none focus:border-purple-400"
                />
            </div>
            <div className="mb-4">
                <label className="block mb-2 text-sm font-semibold text-white">Descripción:</label>
                <input
                    type="text"
                    name="descripcion"
                    value={formData.descripcion}
                    onChange={handleChange}
                    required
                    className="w-full p-2 border rounded focus:outline-none focus:border-purple-400"
                />
            </div>
            <div className="mb-4">
                <label className="block mb-2 text-sm font-semibold text-white">Categoría:</label>
                <select
                    name="cateInsumoId"
                    value={formData.cateInsumoId}
                    onChange={handleChange}
                    required
                    className="w-full p-2 border rounded focus:outline-none focus:border-purple-400"
                >
                    <option value="">--Seleccione una categoría--</option>
                    {categorias.map((categoria) => (
                        <option key={categoria.id} value={categoria.id}>
                            {categoria.nombreCateInsumo}
                        </option>
                    ))}
                </select>
            </div>
            <div>
                <button  type="submit" className="w-full p-2 text-white bg-purple-300  rounded-md hover:bg-[#F7A834]  focus:outline-none focus:ring focus:ring-gray-700">Actualizar Insumo Institucional</button>
            </div>
        </form>
    </div>
  )
}

export default UpdateInstitucional