import { useState, useEffect } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

function AddInstitucional() {
    const api = useAxiosPrivate();
    const [categorias, setCategorias] = useState([]);
    const [institucional, setInstitucional] = useState({
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

        fetchCategorias();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInstitucional((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log(institucional);
            const response = await api.post("insumoInst", institucional);
            console.log("Insumo Institucional añadido con éxito:", response.data);
        } catch (error) {
            console.error("Error al añadir el insumo institucional:", error);
        }
    }


  return (
    <div  className="max-w-md p-8 mx-auto mt-10 bg-purple-600 rounded-lg shadow-lg">
        <h2 className="mb-6 text-2xl font-bold text-white">Añadir Insumo Institucional</h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
                <label className="block mb-1 text-sm font-medium text-white">Nombre:</label>
                <input
                    type="text"
                    name="nombreInsumoInst"
                    value={institucional.nombreInsumoInst}
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
                    type="text"
                    name="cantidad"
                    value={institucional.cantidad}
                    onChange={handleChange}
                    required
                    className="w-full p-2 bg-white border border-purple-600 rounded-md focus:outline-none focus:ring focus:ring-purple-600"
                />
            </div>
            <div>
                <label className="block mb-1 text-sm font-medium text-white">Descripción:</label>
                <input
                    type="text"
                    name="descripcion"
                    value={institucional.descripcion}
                    onChange={handleChange}
                    required
                    className="w-full p-2 bg-white border border-purple-600 rounded-md focus:outline-none focus:ring focus:ring-purple-600"
                />
            </div>
            <div>
                <label className="block mb-1 text-sm font-medium text-white">Categoría:</label>
                <select name="cateInsumoId" onChange={handleChange}
                className="w-full p-2 bg-white border border-purple-600 rounded-md focus:outline-none focus:ring focus:ring-purple-600">
                    <option value="">Selecciona una categoría</option>
                    {categorias.map((categoria) => (
                        <option key={categoria.id} value={categoria.id}>
                            {categoria.nombreCateInsumo}
                        </option>
                    ))}
                </select>
            </div>
            <button className="w-full p-2 text-white bg-purple-300  rounded-md hover:bg-[#F7A834]  focus:outline-none focus:ring focus:ring-gray-700" type="submit">Añadir Insumo Institucional</button>
        </form>
    </div>
  )
}

export default AddInstitucional