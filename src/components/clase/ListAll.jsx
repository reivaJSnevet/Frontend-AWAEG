import { useState, useEffect } from "react";
import api from "../../services/api.config.js";
import { Link } from "react-router-dom";

const ListAll = () => {
  const [clases, setClases] = useState([]);

  useEffect(() => {
    const fetchClases = async () => {
      try {
        const response = await api.get("/clases");
        setClases(response.data);
      } catch (error) {
        console.error("Error fetching clases:", error);
      }
    };

    fetchClases();
  }, []);

  return (
    <div>
      <table className="list-roles-table">
        <thead>
          <tr className="list-roles-tr">
            <th className="roles-th">ID</th>
            <th className="roles-th">Día</th>
            <th className="roles-th">Hora Inicio</th>
            <th className="roles-th">Hora Salida</th>
            <th className="roles-th">Lección</th>
            <th className="roles-th">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {clases.map((clase) => (
            <tr key={clase.id} className="list-roles-tr">
              <td className="list-roles-td">{clase.id}</td>
              <td className="list-roles-td">{clase.dia}</td>
              <td className="list-roles-td">{clase.horaInicio}</td>
              <td className="list-roles-td">{clase.horaSalida}</td>
              <td className="list-roles-td">{clase.leccion}</td>
              <td className="list-roles-td">
                <Link to={`../actualizar/${clase.id}`}>Actualizar</Link>
                &nbsp;|&nbsp;
                <Link to={`../borrar/${clase.id}`}>Borrar</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListAll;
