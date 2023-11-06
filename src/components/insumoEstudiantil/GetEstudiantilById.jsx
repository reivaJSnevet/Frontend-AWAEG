import { useState } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

function GetEstudiantilById() {
    const api = useAxiosPrivate();
    const [id, setId] = useState("");
    const [estudiantil, setEstudiantil] = useState({});

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
    <div>
        <h2>Obtener insumo estudiantil por ID</h2>
        <form onSubmit={handleSubmit}>
            <div>
                <label>ID del insumo estudiantil:</label>
                <input type="text" value={id} onChange={handleInputChange} />
            </div>
            <div>
                <button type="submit">Obtener insumo estudiantil</button>
            </div>
        </form>
        {estudiantil && (
            <div>
                <h3>Información del insumo estudiantil</h3>
                <p>id: {estudiantil.id}</p>
                <p>Nombre: {estudiantil.nombreInsumoEst}</p>
                <p>Descripcion: {estudiantil.descripcion}</p>
                <p>Cantidad: {estudiantil.cantidad}</p>
                <p>Disponible: {estudiantil.disponible ? "Disponible" : "No Disponible"}</p>
                <p>Categoria: {estudiantil.cateInsumoId}</p>
            </div>
        )}
    </div>
  )
}

export default GetEstudiantilById