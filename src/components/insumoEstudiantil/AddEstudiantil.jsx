import { useState, useEffect } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

function AddEstudiantil() {
    const api = useAxiosPrivate();
    const [categorias, setCategorias] = useState([]);
    const [estudiantil, setEstudiantil] = useState({
        nombreInsumoEst: "",
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

        fetchCategorias();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEstudiantil((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log(estudiantil);
            const response = await api.post("insumoEst", estudiantil);
            console.log("Insumo Estudiantil añadido con éxito:", response.data);
        } catch (error) {
            console.error("Error al añadir el insumo estudiantil:", error);
        }
    }



  return (
    <div className="max-w-md p-8 mx-auto mt-10 bg-purple-600 rounded-lg shadow-lg">
        <h2 className="mb-6 text-2xl font-bold text-white">Añadir Insumo Estudiantil</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label className="block mb-1 text-sm font-medium text-white">Nombre:</label>
                <input
                    type="text"
                    name="nombreInsumoEst"
                    value={estudiantil.nombreInsumoEst}
                    onChange={handleChange}
                    required
                     className="w-full p-2 bg-white border border-purple-600 rounded-md focus:outline-none focus:ring focus:ring-purple-600"
                />
            </div>
            <div>
                <label className="block mb-1 text-sm font-medium text-white">Disponible:</label>
                <select name="disponible" onChange={handleChange}
                 className="w-full p-2 bg-white border border-purple-600 rounded-md focus:outline-none focus:ring focus:ring-purple-600">
                    <option value="">Selecciona una opción</option>
                    <option value={true}>Disponible</option>
                    <option value={false}>No Disponible</option>
                </select>
            </div>
            <div>
                <label className="block mb-1 text-sm font-medium text-white">Cantidad:</label>
                <input
                    type="number"
                    name="cantidad"
                    value={estudiantil.cantidad}
                    onChange={handleChange}
                    required
                     className="w-full p-2 bg-white border border-purple-600 rounded-md focus:outline-none focus:ring focus:ring-purple-600"
                />
            </div>
            <div>
                <label className="block mb-1 text-sm font-medium text-white">Descripcion:</label>
                <input
                    type="text"
                    name="descripcion"
                    value={estudiantil.descripcion}
                    onChange={handleChange}
                    required
                     className="w-full p-2 bg-white border border-purple-600 rounded-md focus:outline-none focus:ring focus:ring-purple-600"
                />
            </div>
            <div>
                <label className="block mb-1 text-sm font-medium text-white">Categoria:</label>
                <select
                    name="cateInsumoId"
                    value={estudiantil.cateInsumoId}
                    onChange={handleChange}
                    required
                     className="w-full p-2 bg-white border border-purple-600 rounded-md focus:outline-none focus:ring focus:ring-purple-600"
                >
                    <option value="">-- Seleccione una categoria --</option>
                    {categorias.map((categoria) => (
                        <option key={categoria.id} value={categoria.id}>
                            {categoria.nombreCateInsumo}
                        </option>
                    ))}
                </select>
            </div>
            <div>
                <button className="w-full p-2 text-white bg-purple-300  rounded-md hover:bg-[#F7A834]  focus:outline-none focus:ring focus:ring-gray-700" type="submit">Añadir Insumo Estudiantil</button>
            </div>
        </form>
    </div>
  )
}

export default AddEstudiantil