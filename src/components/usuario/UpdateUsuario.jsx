import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

const UpdateUsuario = () => {
  const api = useAxiosPrivate();
  const { paramId } = useParams();

  const [usuarioData, setUsuarioData] = useState({
    usuarioId: "",
    nombre: "",
    correo: "",
    contraseña: "",
    roleId: 0,
  });

  const [roles, setRoles] = useState([]);

  useEffect(() => {
    // Cargar roles
    api
      .get("/roles")
      .then((response) => {
        setRoles(response.data);
      })
      .catch((error) => {
        console.error("Error al obtener los roles:", error);
      });
  }, []); // Dependencia vacía para cargar roles solo una vez al montar el componente

  useEffect(() => {
    // Cargar datos del usuario si paramId está presente
    if (paramId) {
      api
        .get(`/usuarios/${paramId}`)
        .then((response) => {
          setUsuarioData(response.data);
        })
        .catch((error) => {
          console.error("Error al obtener el usuario:", error);
        });
    }
  }, [paramId]); // Cargar datos del usuario cuando paramId cambia

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUsuarioData({
      ...usuarioData,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // Enviar solicitud de actualización
      await api.put(`/usuarios/${paramId}`, usuarioData);

      console.log(usuarioData);

      // Resetear el estado después de una actualización exitosa
      alert("Usuario actualizado con éxito");
      setUsuarioData({
        usuarioId: "",
        nombre: "",
        correo: "",
        contraseña: "",
        roleId: 0,
      });
    } catch (error) {
      console.error("Error al actualizar el usuario:", error);
      alert(
        "Hubo un error al actualizar el usuario. Por favor, inténtelo de nuevo."
      );
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Nombre:</label>
        <input
          type="text"
          name="nombre"
          value={usuarioData.nombre}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label>Correo:</label>
        <input
          type="email"
          name="correo"
          value={usuarioData.correo}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label>Contraseña:</label>
        <input
          type="password"
          name="contraseña"
          value={usuarioData.contraseña}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label>Rol:</label>
        <select
          name="roleId"
          value={usuarioData.roleId}
          onChange={handleInputChange}
        >
          <option value={0}>Seleccionar Rol</option>
          {roles.map((rol) => (
            <option key={rol.id} value={rol.id}>
              {rol.nombre}
            </option>
          ))}
        </select>
      </div>
      <button type="submit">Actualizar Usuario</button>
    </form>
  );
};

export default UpdateUsuario;
