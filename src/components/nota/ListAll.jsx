import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

const ListNotas = () => {
    const api = useAxiosPrivate();
  const [notas, setNotas] = useState([]);

  useEffect(() => {
    api
      .get("/notas")
      .then((response) => {
        setNotas(response.data);
      })
      .catch((error) => {
        console.error("Error fetching roles:", error);
      });
  }, []);

  return (
    <div>
      <table className="list-roles-table">
        <thead>
          <tr className="list-roles-tr">
            <th className="roles-th">ID</th>
            <th className="roles-th">Calificacion</th>
            <th className="roles-th">Periodo</th>
            <th className="roles-th">Fecha de Subida</th>
            <th className="roles-th">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {notas.map((nota) => (
            <tr key={nota.id} className="list-roles-tr">
              <td className="list-roles-td">{nota.id}</td>
              <td className="list-roles-td">{nota.calificacion}</td>
              <td className="list-roles-td">{nota.periodo}</td>
              <td className="list-roles-td">{nota.fechaSubida}</td>
              <td className="list-roles-td">
                <Link to={`../actualizar/${nota.id}`}>Actualizar</Link>
                &nbsp;|&nbsp;
                <Link to={`../borrar/${nota.id}`}>Borrar</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListNotas;