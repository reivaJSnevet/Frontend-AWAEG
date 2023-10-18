import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

const ListHorarios = () => {
    const api = useAxiosPrivate();
  const [horarios, setHorarios] = useState([]);

  useEffect(() => {
    api
      .get("/horarios")
      .then((response) => {
        setHorarios(response.data);
      })
      .catch((error) => {
        console.error("Error fetching horarios:", error);
      });
  }, []);

  return (
    <div>
      <table className="list-roles-table">
        <thead>
          <tr className="list-roles-tr">
            <th className="roles-th">ID</th>
            <th className="roles-th">Horario Provisional</th>
            <th className="roles-th">Estado del Horarios</th>
            <th className="roles-th">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {horarios.map((horario) => (
            <tr key={horario.id} className="list-roles-tr">
              <td className="list-roles-td">{horario.id}</td>
              <td className="list-roles-td">{horario.provisional === false ? 'No' : 'Sí'}</td>
              <td className="list-roles-td">{horario.habilitado === false ? 'Deshabilitado' : 'Habilitado'}</td>
              <td className="list-roles-td">
                <Link to={`../actualizar/${horario.id}`}>Actualizar</Link>
                &nbsp;|&nbsp;
                <Link to={`../borrar/${horario.id}`}>Borrar</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListHorarios;