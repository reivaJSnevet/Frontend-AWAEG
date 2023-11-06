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
    <div>
        <table className="list-roles-table">
            <thead>
                <tr>
                    <th className="roles-th">ID</th>
                    <th className="roles-th">Nombre</th>
                    <th className="roles-th">Disponible</th>
                    <th className="roles-th">Cantidad</th>
                    <th className="roles-th">Descripción</th>
                    <th className="roles-th">Categoría</th>
                    <th className="roles-th">Acciones</th>
                </tr>
            </thead>
            <tbody>
                {insumoEstudiantil.map((insumo) => (
                    <tr key={insumo.id} className="list-roles-tr">
                        <td className="list-roles-td">{insumo.id}</td>
                        <td className="list-roles-td">{insumo.nombreInsumoEst}</td>
                        <td className="list-roles-td">{insumo.disponible ? "Disponible" : "No Disponible"}</td>
                        <td className="list-roles-td">{insumo.cantidad}</td>
                        <td className="list-roles-td">{insumo.descripcion}</td>
                        <td className="list-roles-td">{insumo.cateInsumo.nombreCateInsumo}</td>
                        <td className="list-roles-td">
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