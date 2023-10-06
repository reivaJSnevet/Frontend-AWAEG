import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../../services/api.config";

const ListRoles = () => {
  const [roles, setRoles] = useState([]);

  useEffect(() => {
    try {
      const fetchRoles = async () => {
        const response = await api.get("/roles");
        setRoles(response.data);
      };
      fetchRoles();
    } catch (error) {
      //hay que agregar un manejo de errores
      console.log(error);
    }
  }, []);

  return (
    <div>
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
              <td className="list-roles-td">{rol.nivelPrivilegio}</td>
              <td className="list-roles-td">{rol.descripcion}</td>
              <td className="list-roles-td">
                <Link to={`../actualizar/${rol.id}`}>Actualizar</Link>
                &nbsp;|&nbsp;
                <Link to={`../borrar/${rol.id}`}>Borrar</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListRoles;
