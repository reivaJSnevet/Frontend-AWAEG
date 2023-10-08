import React, { useState, useEffect } from "react";
import api from "../../services/api.config";

const UpdateUsuario = () => {
  const [usuarioId, setUsuarioId] = useState("");
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [contraseña, setContraseña] = useState("");
  const [roleId, setRoleId] = useState(0);
  const [usuarioEncontrado, setUsuarioEncontrado] = useState(null);
  const [roles, setRoles] = useState([]);
  const [showPassword, setShowPassword] = useState(false);
  const [idError, setIdError] = useState(false);

  // Cargar la lista de roles al montar el componente
  useEffect(() => {
    api.get("/roles")
      .then((response) => {
        // Actualizar el estado con los roles obtenidos
        setRoles(response.data);
      })
      .catch((error) => {
        console.error("Error al obtener los roles:", error);
      });
  }, []);

  useEffect(() => {
    if (usuarioId) {
      // Verificar si el valor ingresado es numérico
      if (!/^\d+$/.test(usuarioId)) {
        setIdError(true);
        return;
      } else {
        setIdError(false);
      }

      // Realiza una solicitud GET para obtener un usuario por su ID
      api.get(`/usuarios/${usuarioId}`)
        .then((response) => {
          // Actualiza el estado con el usuario encontrado
          setUsuarioEncontrado(response.data);
          setNombre(response.data.nombre);
          setCorreo(response.data.correo);
          setRoleId(response.data.roleId);
        })
        .catch((error) => {
          console.error("Error al obtener el usuario:", error);
          // Restablece el estado si no se encuentra el usuario
          setUsuarioEncontrado(null);
          setNombre("");
          setCorreo("");
          setRoleId(0);
        });
    }
  }, [usuarioId]);

  const getRoleName = (roleId) => {
    const role = roles.find((r) => r.id === roleId);
    return role ? role.nombre : "Rol no encontrado";
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === "nombre") {
      setNombre(value);
    } else if (name === "correo") {
      setCorreo(value);
    } else if (name === "contraseña") {
      setContraseña(value);
    } else if (name === "roleId") {
      setRoleId(Number(value));
    }
  };

  const handleShowPasswordChange = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!usuarioEncontrado) {
      alert("Por favor, introduzca un ID de usuario válido para buscar.");
      return;
    }

    try {
      // Realizar una solicitud PUT para actualizar el usuario encontrado
      await api.put(`/usuarios/${usuarioId}`, {
        nombre,
        correo,
        contraseña,
        roleId,
      });

      alert("Usuario actualizado con éxito");
      // Restablecer campos y estado de usuario encontrado
      setUsuarioId("");
      setUsuarioEncontrado(null);
      setNombre("");
      setCorreo("");
      setContraseña("");
      setRoleId(0);
    } catch (error) {
      console.error("Error al actualizar el usuario:", error);
      alert("Hubo un error al actualizar el usuario. Por favor, inténtelo de nuevo.");
    }
  };

  return (
    <div>
      <h2>Actualizar Usuario por ID</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>ID de Usuario:</label>
          <input
            type="text"
            name="usuarioId"
            value={usuarioId}
            onChange={(e) => {
              const inputVal = e.target.value;
              // Verificar si el valor ingresado es numérico
              if (!/^\d+$/.test(inputVal)) {
                setIdError(true);
              } else {
                setIdError(false);
                setUsuarioId(inputVal);
              }
            }}
          />
          {idError && <p>Por favor, ingrese solo números.</p>}
          <button type="button" onClick={() => setUsuarioId("")}>
            Limpiar
          </button>
        </div>
        {usuarioEncontrado === null && <p>No existe un usuario con esa ID.</p>}
        {usuarioEncontrado && (
          <>
            <div>
              <label>Nombre:</label>
              <input
                type="text"
                name="nombre"
                value={nombre}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label>Correo:</label>
              <input
                type="text"
                name="correo"
                value={correo}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label>Contraseña:</label>
              <input
                type={showPassword ? "text" : "password"}
                name="contraseña"
                value={contraseña}
                onChange={handleInputChange}
              />
              <label>
                <input
                  type="checkbox"
                  onChange={handleShowPasswordChange}
                  checked={showPassword}
                />
                Mostrar Contraseña
              </label>
            </div>
            <div>
              <label>Rol:</label>
              <select
                name="roleId"
                value={roleId}
                onChange={handleInputChange}
              >
                <option value={0}>Seleccionar Rol</option>
                {roles.map((role) => (
                  <option key={role.id} value={role.id}>
                    {role.nombre}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <button type="submit">Actualizar Usuario</button>
            </div>
          </>
        )}
      </form>
    </div>
  );
};

export default UpdateUsuario;
