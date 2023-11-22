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
    <div className="max-w-md p-6 mx-auto mt-10 bg-purple-400 rounded-lg shadow-lg">
        <h2 className="mb-4 text-2xl font-bold text-white">Eliminar Estudiantil por ID</h2>
        <form className="space-y-4" onSubmit={handleDelete}>
            <div>
                <label className="block mb-1 text-sm font-medium text-white">ID del estudiantil a Eliminar:</label>
                <input
                    type="text"
                    value={estudiantilId}
                    onChange={handleInputChange}
                    disabled
                    className="w-full p-2 bg-transparent border border-white rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
                />
            </div>
            <div>
                <button  className="w-full p-2 text-white bg-purple-300  rounded-md hover:bg-[#F7A834]  focus:outline-none focus:ring focus:ring-gray-700" type="submit">Eliminar Estudiantil</button>
            </div>
        </form>
    </div>
  )
}

export default DeleteEstudiantil