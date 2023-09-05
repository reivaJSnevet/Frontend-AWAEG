import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import api from "../../services/api.config.js";

const ListRoles = () => {
  const [roles, setRoles] = useState([]);

  useEffect(() => {
    api
      .get("/roles")
      .then((response) => {
        setRoles(response.data);
      })
      .catch((error) => {
        console.error("Error fetching roles:", error);
      });
  }, []);

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <h2>Roles</h2>
        <button className="list-roles-button">
          <Link to="/roles/crear">Crear</Link>
        </button>
        <button className="list-roles-button">
          <Link to="/roles/buscar">Buscar</Link>
        </button>
      </div>

      <table className="list-roles-table">
        <thead>
          <tr className="list-roles-tr">
            <th className="roles-th">ID</th>
            <th className="roles-th">Nombre</th>
            <th className="roles-th">Nivel de Privilegio</th>
            <th className="roles-th">Descripción</th>
            <th className="roles-th">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {roles.map((rol) => (
            <tr key={rol.id} className="list-roles-tr">
              <td className="list-roles-td">{rol.id}</td>
              <td className="list-roles-td">{rol.nombre}</td>
              {/* Para esto les recomiendo que hagan un enum en el backend */}
              <td className="list-roles-td">{rol.nivelPrivilegio}</td>
              <td className="list-roles-td">{rol.descripcion}</td>
              <td className="list-roles-td">
                {/* Esto tienen que cambiarlo en los 
                componentes para que reciba el 
                id como parametro o 
                crear la accion y llamado a la base 
                de datos desde aqui*/}
                <Link to={`roles/actualizar/${rol.id}`}>Actualizar</Link>
                &nbsp;|&nbsp;
                <Link to={`roles/borrar/${rol.id}`}>borrar</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListRoles;
