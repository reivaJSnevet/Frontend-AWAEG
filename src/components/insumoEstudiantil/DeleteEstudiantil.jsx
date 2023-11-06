import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

function DeleteEstudiantil() {
    const api = useAxiosPrivate();
    const [estudiantilId, setEstudiantilId] = useState("");
    const { paramId } = useParams();

    const handleInputChange = (event) => {
        setEstudiantilId(event.target.value);
    }

    useEffect(() => {
        if (paramId) {
            setEstudiantilId(paramId);
        } else {
            setEstudiantilId("");
        }
    }, [paramId]);

    const handleDelete = (event) => {
        event.preventDefault();

        api
            .delete(`/insumoEst/${paramId}`)
            .then(() => {
                alert("Estudiantil eliminado con éxito.");
                setEstudiantilId("");
            })
            .catch((error) => {
                console.error("Error al eliminar el estudiantil por ID:", error);
            });
    }

  return (
    <div>
        <h2>Eliminar Estudiantil por ID</h2>
        <form onSubmit={handleDelete}>
            <div>
                <label>ID del estudiantil a Eliminar:</label>
                <input
                    type="text"
                    value={estudiantilId}
                    onChange={handleInputChange}
                />
            </div>
            <div>
                <button type="submit">Eliminar Estudiantil</button>
            </div>
        </form>
    </div>
  )
}

export default DeleteEstudiantil