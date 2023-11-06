import React, { useState, useEffect } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

const UpdateUsuario = () => {
    const api = useAxiosPrivate();
  const [usuarioData, setUsuarioData] = useState({
    usuarioId: "",
    nombre: "",
    correo: "",
    contraseña: "",
    roleId: 0,
    showPassword: false,
    idError: false,
    usuarioEncontrado: null,
    roles: [],
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === "usuarioId" && !/^\d+$/.test(value)) {
      setUsuarioData({
        ...usuarioData,
        idError: true,
      });
    } else {
      setUsuarioData({
        ...usuarioData,
        [name]: name === "roleId" ? Number(value) : value,
        idError: false,
      });
    }
  };

  useEffect(() => {
    api.get("/roles")
      .then((response) => {
        setUsuarioData({
          ...usuarioData,
          roles: response.data,
        });
      })
      .catch((error) => {
        console.error("Error al obtener los roles:", error);
      });
  }, []); // Este efecto se ejecutará solo una vez al montar el componente

  const handleShowPasswordChange = () => {
    setUsuarioData({
      ...usuarioData,
      showPassword: !usuarioData.showPassword,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const {
      usuarioId,
      nombre,
      correo,
      contraseña,
      roleId,
      usuarioEncontrado,
    } = usuarioData;

    if (!usuarioEncontrado) {
      alert("Por favor, introduzca un ID de usuario válido para buscar.");
      return;
    }

    try {
      await api.put(`/usuarios/${usuarioId}`, {
        nombre,
        correo,
        contraseña,
        roleId,
      });

      alert("Usuario actualizado con éxito");
      setUsuarioData({
        ...usuarioData,
        usuarioId: "",
        usuarioEncontrado: null,
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
    <div>
      <h2>Actualizar Usuario por ID</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>ID de Usuario:</label>
          <input
            type="text"
            name="usuarioId"
            value={usuarioData.usuarioId}
            onChange={handleInputChange}
          />
          {usuarioData.idError && (
            <p>Por favor, ingrese solo números.</p>
          )}
          <button
            type="button"
            onClick={() =>
              setUsuarioData({
                ...usuarioData,
                usuarioId: "",
                usuarioEncontrado: null,
                nombre: "",
                correo: "",
                contraseña: "",
                roleId: 0,
              })
            }
          >
            Limpiar
          </button>
        </div>
        {usuarioData.usuarioEncontrado === null && (
          <p>No existe un usuario con esa ID.</p>
        )}
        {usuarioData.usuarioEncontrado && (
          <>
            {/* Resto del formulario */}
          </>
        )}
      </form>
    </div>
  );
};

export default UpdateUsuario;
