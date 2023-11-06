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
    <div>
        <h2>Añadir Insumo Estudiantil</h2>
        <form onSubmit={handleSubmit}>
            <div>
                <label>Nombre:</label>
                <input
                    type="text"
                    name="nombreInsumoEst"
                    value={estudiantil.nombreInsumoEst}
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
                    type="number"
                    name="cantidad"
                    value={estudiantil.cantidad}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label>Descripcion:</label>
                <input
                    type="text"
                    name="descripcion"
                    value={estudiantil.descripcion}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label>Categoria:</label>
                <select
                    name="cateInsumoId"
                    value={estudiantil.cateInsumoId}
                    onChange={handleChange}
                    required
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
                <button type="submit">Añadir Insumo Estudiantil</button>
            </div>
        </form>
    </div>
  )
}

export default AddEstudiantil