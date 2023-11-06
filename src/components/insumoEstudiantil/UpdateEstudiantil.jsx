import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

function UpdateEstudiantil() {
    const api = useAxiosPrivate();
    const { paramId } = useParams();
    const [categorias, setCategorias] = useState([]);
    const [formData, setFormData] = useState({
        id: "",
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

        const fetchEstudiantil = async () => {
            try {
                const response = await api.get(`insumoEst/${paramId}`);
                setFormData(response.data);
            } catch (error) {
                console.log(error);
            }
        }

        fetchCategorias();
        fetchEstudiantil();
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
            const response = await api.put(`insumoEst/${paramId}`, formData);
            console.log("Insumo Estudiantil actualizado con éxito:", response.data);
        } catch (error) {
            console.error("Error al actualizar el insumo estudiantil:", error);
        }
    }



  return (
    <div>
        <h2>Actualizar Insumo Estudiantil</h2>
        <form onSubmit={handleSubmit}>
            <div>
                <label>Nombre:</label>
                <input
                    type="text"
                    name="nombreInsumoEst"
                    value={formData.nombreInsumoEst}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
            <label>Disponible:</label>
                <select name="disponible" value={formData.disponible} onChange={handleChange}>
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
                    value={formData.cantidad}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label>Descripcion:</label>
                <input
                    type="text"
                    name="descripcion"
                    value={formData.descripcion}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label>Categoria:</label>
                <select
                    name="cateInsumoId"
                    value={formData.cateInsumoId}
                    onChange={handleChange}
                    required
                >
                    <option value="">--Seleccione una categoria--</option>
                    {categorias.map((categoria) => (
                        <option key={categoria.id} value={categoria.id}>
                            {categoria.nombreCateInsumo}
                        </option>
                    ))}
                </select>
            </div>
            <div>
                <button type="submit">Actualizar Insumo Estudiantil</button>
            </div>
        </form>
    </div>
  )
}

export default UpdateEstudiantil