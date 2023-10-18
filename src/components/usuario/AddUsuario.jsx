import { useState, useEffect } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

const AddUsuario = () => {
  const api = useAxiosPrivate();
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [contraseña, setContraseña] = useState("");
  const [roleId, setRoleId] = useState("");
  const [roles, setRoles] = useState([]); // Aquí almacenaremos la lista de roles
  const [showPassword, setShowPassword] = useState(false); // Estado para mostrar/ocultar la contraseña

  const [errorMessages, setErrorMessages] = useState({});

  // Función para cargar los roles desde la API
  const loadRoles = async () => {
    try {
      const response = await api.get("/roles");
      setRoles(response.data); // Supongamos que la respuesta contiene una lista de roles
    } catch (error) {
      console.error("Error al cargar los roles:", error);
    }
  };

  useEffect(() => {
    loadRoles(); // Cargar los roles al montar el componente
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === "nombre") {
      setNombre(value);
    } else if (name === "correo") {
      setCorreo(value);
    } else if (name === "contraseña") {
      setContraseña(value);
    } else if (name === "roleId") {
      setRoleId(value);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const validateForm = () => {
    const errors = {};

    if (!nombre) {
      errors.nombre = "El nombre es obligatorio";
    }

    if (!correo) {
      errors.correo = "El correo es obligatorio";
    } else if (!/^\S+@\S+\.\S+$/.test(correo)) {
      errors.correo = "El correo electrónico no es válido";
    }

    if (!contraseña) {
      errors.contraseña = "La contraseña es obligatoria";
    } else if (contraseña.length < 8) {
      errors.contraseña = "La contraseña debe tener al menos 8 caracteres";
    }

    if (!roleId) {
      errors.roleId = "Seleccione un rol válido";
    }

    setErrorMessages(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      // Realizar POST mediante axios
      await api.post("/usuarios", {
        nombre,
        correo,
        contraseña,
        roleId,
      });

      // Limpiar campos
      setNombre("");
      setCorreo("");
      setContraseña("");
      setRoleId("");

      alert("Usuario creado con éxito");
    } catch (error) {
      console.error("Error al crear el usuario:", error);
      alert(
        "Hubo un error al crear el usuario. Por favor, inténtelo de nuevo."
      );
    }
  };

  return (
    <div className="p-8 bg-purple-500 rounded-lg shadow-lg">
      <h2 className="mb-4 text-2xl text-white">Agregar Usuario</h2>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div className="flex flex-col">
          <label className="text-white">Nombre:</label>
          <input
            type="text"
            name="nombre"
            value={nombre}
            onChange={handleInputChange}
            className="p-2 border border-white rounded"
          />
          {errorMessages.nombre && (
            <p className="text-yellow-500">{errorMessages.nombre}</p>
          )}
        </div>
        <div className="flex flex-col">
          <label className="text-white">Correo:</label>
          <input
            type="text"
            name="correo"
            value={correo}
            onChange={handleInputChange}
            className="p-2 border border-white rounded"
          />
          {errorMessages.correo && (
            <p className="text-yellow-500">{errorMessages.correo}</p>
          )}
        </div>
        <div className="flex flex-col">
          <label className="text-white">Contraseña:</label>
          <input
            type="text"
            name="contraseña"
            value={contraseña}
            onChange={handleInputChange}
            className="p-2 border border-white rounded"
          />
          {errorMessages.contraseña && (
            <p className="text-yellow-500">{errorMessages.contraseña}</p>
          )}
        </div>
        <div className="flex flex-col">
          <label className="text-white">Rol:</label>
          <select
            name="roleId"
            value={roleId}
            onChange={handleInputChange}
            className="p-2 border border-white rounded"
          >
            <option value="">Seleccione un rol</option>
            {roles.map((role) => (
              <option key={role.id} value={role.id}>
                {role.nombre}
              </option>
            ))}
          </select>
          {errorMessages.roleId && (
            <p className="text-yellow-500">{errorMessages.roleId}</p>
          )}
        </div>
        <div className="flex items-center">
          <input
            type="checkbox"
            id="showPasswordCheckbox"
            onChange={togglePasswordVisibility}
            checked={showPassword}
            className="mr-2"
          />
          <label className="text-white" htmlFor="showPasswordCheckbox">
            Mostrar Contraseña
          </label>
        </div>
        <button
          type="submit"
          className="px-4 py-2 text-purple-800 bg-yellow-500 rounded hover:bg-yellow-400"
        >
          Agregar Usuario
        </button>
      </form>
    </div>
  );
};

export default AddUsuario;
