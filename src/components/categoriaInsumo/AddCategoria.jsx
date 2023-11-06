import { useState } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

function AddCategoria() {
    const api = useAxiosPrivate();
    const [categoria, setCategoria] = useState({
        nombreCateInsumo: "",
        descripcionCateInsumo: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCategoria((prevCategoria) => ({
            ...prevCategoria,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post("cateInsumo", categoria);
            console.log("Categoria añadida con éxito:", response.data);
            // Puedes hacer algo con la respuesta, como redirigir a otra página o mostrar un mensaje de éxito.
        } catch (error) {
            console.error("Error al añadir la categoría:", error);
            // Puedes manejar errores aquí, mostrar un mensaje de error al usuario, etc.
        }
    };

    return (
        <div>
            <h2>Añadir Categoría</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Nombre:</label>
                    <input
                        type="text"
                        name="nombreCateInsumo"
                        value={categoria.nombreCateInsumo}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Descripción:</label>
                    <input
                        type="text"
                        name="descripcionCateInsumo"
                        value={categoria.descripcionCateInsumo}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit">Añadir Categoría</button>
            </form>
        </div>
    );
}

export default AddCategoria;
