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
    <div className="max-w-md p-8 mx-auto mt-10 bg-purple-600 rounded-lg shadow-lg">
      <h2 className="mb-6 text-2xl font-bold text-white">Agregar Usuario</h2>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label className="block mb-1 text-sm font-medium text-white">
            Nombre:
          </label>
          <input
            type="text"
            name="nombre"
            value={nombre}
            onChange={handleInputChange}
            className="w-full p-2 bg-white border border-purple-600 rounded-md focus:outline-none focus:ring focus:ring-purple-600"
          />
          {errorMessages.nombre && (
            <p className="text-yellow-500">{errorMessages.nombre}</p>
          )}
        </div>
        <div>
          <label className="block mb-1 text-sm font-medium text-white">
            Correo:
          </label>
          <input
            type="text"
            name="correo"
            value={correo}
            onChange={handleInputChange}
            className="w-full p-2 bg-white border border-purple-600 rounded-md focus:outline-none focus:ring focus:ring-purple-600"
          />
          {errorMessages.correo && (
            <p className="text-yellow-500">{errorMessages.correo}</p>
          )}
        </div>
        <div>
          <label className="block mb-1 text-sm font-medium text-white">
            Contraseña:
          </label>
          <input
            type="text"
            name="contraseña"
            value={contraseña}
            onChange={handleInputChange}
            className="w-full p-2 bg-white border border-purple-600 rounded-md focus:outline-none focus:ring focus:ring-purple-600"
          />
          {errorMessages.contraseña && (
            <p className="text-yellow-500">{errorMessages.contraseña}</p>
          )}
        </div>
        <div>
          <label className="block mb-1 text-sm font-medium text-white">
            Rol:
          </label>
          <select
            name="roleId"
            value={roleId}
            onChange={handleInputChange}
            className="w-full p-2 bg-white border border-purple-600 rounded-md focus:outline-none focus:ring focus:ring-purple-600"
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
          className="w-full p-2 text-white bg-slate-950 rounded-md hover:bg-slate-950 focus:outline-none focus:ring focus:ring-gray-700"
        >
          Agregar Usuario
        </button>
      </form>
    </div>
  );
};

export default AddUsuario;