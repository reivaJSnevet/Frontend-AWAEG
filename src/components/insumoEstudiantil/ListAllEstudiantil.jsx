import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

function ListAllEstudiantil() {
    const api = useAxiosPrivate();
    const [insumoEstudiantil, setInsumoEstudiantil] = useState([]);

    useEffect(() => {
        const fetchInsumoEstudiantil = async () => {
            try {
                const response = await api.get(`insumoEst`);
                setInsumoEstudiantil(response.data);
            } catch (error) {
                console.error(
                    "Error trayendo los insumos estudiantiles:",
                    error.response?.data || error.message
                );
            }
        };
        fetchInsumoEstudiantil();
    }, []);




  return (
    <div className="h-[60vh] p-4 overflow-y-auto bg-purple-300 rounded-lg shadow-lg">
        <table className="w-full bg-white rounded-lg font-serif font-thin border-collapse overflow-hidden shadow text-left">
            <thead className="text-white bg-purple-600">
                <tr>
                    <th className="p-2">ID</th>
                    <th className="p-2">Nombre</th>
                    <th className="p-2">Disponible</th>
                    <th className="p-2">Cantidad</th>
                    <th className="p-2">Descripción</th>
                    <th className="p-2">Categoría</th>
                    <th className="p-2">Acciones</th>
                </tr>
            </thead>
            <tbody>
                {insumoEstudiantil.map((insumo) => (
                    <tr key={insumo.id} className="text-gray-700 border-b hover:bg-purple-100 text-left">
                        <td className="p-[15px]">{insumo.id}</td>
                        <td className="p-[15px]">{insumo.nombreInsumoEst}</td>
                        <td className="p-[15px]">{insumo.disponible ? "Disponible" : "No Disponible"}</td>
                        <td className="p-[15px]">{insumo.cantidad}</td>
                        <td className="p-[15px]">{insumo.descripcion}</td>
                        <td className="p-[15px]">{insumo.cateInsumo.nombreCateInsumo}</td>
                        <td className="p-[15px]">
                            <Link to={`actualizar/${insumo.id}`} className="mr-4 text-purple-500 hover:text-yellow-500">
                                Actualizar
                            </Link>
                            <Link to={`borrar/${insumo.id}`} className="text-purple-500 hover:text-yellow-500">
                                Borrar
                            </Link>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
  )
}

export default ListAllEstudiantil