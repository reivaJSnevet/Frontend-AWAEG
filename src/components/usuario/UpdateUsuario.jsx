import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import Swal from "sweetalert2";

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

      Swal.fire({
        icon: "success",
        title: "Éxito",
        text: "El usuario se actualizó exitosamente.",
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Hubo un error al actualizar el usuario. Por favor, inténtelo de nuevo.",
      });
    }
  };

  return (

    <div className="p-8 bg-purple-400 rounded shadow-lg">
      <h2 className="mb-6 text-3xl font-semibold text-white">Actualizar Usuario</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block mb-2 text-sm font-semibold text-white">Nombre del Usuario:</label>
          <input
            type="text"
            name="nombre"
            value={usuarioData.nombre}
            onChange={handleInputChange}
            className="w-full p-2 border rounded focus:outline-none focus:border-purple-400"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2 text-sm font-semibold text-white">Correo:</label>
          <input
            type="email"
            name="correo"
            value={usuarioData.correo}
            onChange={handleInputChange}
            className="w-full p-2 border rounded focus:outline-none focus:border-purple-400"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2 text-sm font-semibold text-white">Contraseña:</label>
          <input
           type="password"
           name="contraseña"
           value={usuarioData.contraseña}
           onChange={handleInputChange}
           className="w-full p-2 border rounded focus:outline-none focus:border-purple-400"
         />
        </div>
        <div>
         <label className="text-white">Rol:</label>
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

        <button type="submit" className="w-full p-2 text-white bg-purple-300  rounded-md hover:bg-[#F7A834]  focus:outline-none focus:ring focus:ring-gray-700">
          Actualizar
        </button>
      </form>
    </div>
   
  );
};

export default UpdateUsuario;
