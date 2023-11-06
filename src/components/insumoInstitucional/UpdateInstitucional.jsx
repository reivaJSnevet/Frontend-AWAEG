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
    <div>
        <h2>Actualizar Insumo Institucional</h2>
        <form onSubmit={handleSubmit}>
            <div>
                <label>Nombre:</label>
                <input
                    type="text"
                    name="nombreInsumoInst"
                    value={formData.nombreInsumoInst}
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
                <label>Descripción:</label>
                <input
                    type="text"
                    name="descripcion"
                    value={formData.descripcion}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label>Categoría:</label>
                <select
                    name="cateInsumoId"
                    value={formData.cateInsumoId}
                    onChange={handleChange}
                    required
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
                <button type="submit" className="">Actualizar Insumo Institucional</button>
            </div>
        </form>
    </div>
  )
}

export default UpdateInstitucional