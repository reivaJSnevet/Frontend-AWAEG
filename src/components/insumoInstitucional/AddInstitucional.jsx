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
    <div>
        <h2>Añadir Insumo Institucional</h2>
        <form onSubmit={handleSubmit}>
            <div>
                <label>Nombre:</label>
                <input
                    type="text"
                    name="nombreInsumoInst"
                    value={institucional.nombreInsumoInst}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label>Disponible:</label>
                <select name="disponible" onChange={handleChange}>
                    <option value="">Selecciona una opción</option>
                    <option value={true}>Disponible</option>
                    <option value={false}>No Disponible</option>
                </select>
            </div>
            <div>
                <label>Cantidad:</label>
                <input
                    type="text"
                    name="cantidad"
                    value={institucional.cantidad}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label>Descripción:</label>
                <input
                    type="text"
                    name="descripcion"
                    value={institucional.descripcion}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label>Categoría:</label>
                <select name="cateInsumoId" onChange={handleChange}>
                    <option value="">Selecciona una categoría</option>
                    {categorias.map((categoria) => (
                        <option key={categoria.id} value={categoria.id}>
                            {categoria.nombreCateInsumo}
                        </option>
                    ))}
                </select>
            </div>
            <button type="submit">Añadir Insumo Institucional</button>
        </form>
    </div>
  )
}

export default AddInstitucional