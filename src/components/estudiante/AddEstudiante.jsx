import { useEffect, useState } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { generarContraseña } from "../../services/generadorContraseña.js";
import { generarNombreUsuario } from "../../services/generadorNombreUsuario.js";

const AddEstudiante = () => {
  const api = useAxiosPrivate();
  const [nombres, setNombres] = useState([""]);
  const [estudiante, setEstudiante] = useState({
    id: "",
    nombre: "",
    apellido1: "",
    apellido2: "",
    fechaNacimiento: "",
    sexo: true,
    direccion: "",
    seccion: "",
    encargadoId: "",
  });

  const [encargado, setEncargado] = useState({
    id: "",
    nombre: "",
    apellido1: "",
    apellido2: "",
  });

  const [usuario, setUsuario] = useState({
    nombre: "",
    correo: "",
    contraseña: "",
    roleId: 4,
    id: "",
  });

  const [secciones, setSecciones] = useState([]);

  useEffect(() => {
    const fetchSecciones = async () => {
      try {
        const response = await api.get("grupos");
        setSecciones(response.data.map((grupo) => grupo.seccion));
      } catch (error) {
        console.error(
          "Error fetching secciones:",
          error.response?.data || error.message
        );
      }
    };

    const fetchUsuarios = async () => {
      try {
        const response = await api.get("usuarios");
        setNombres(response.data.map((usuario) => usuario.nombre));
      } catch (error) {
        console.error(
          "Error fetching usuarios:",
          error.response?.data || error.message
        );
      }
    };
    fetchUsuarios();
    fetchSecciones();
  }, []);

  const handleInputChange = (event, target) => {
    const { name, value } = event.target;

    if (target === "estudiante") {
      setEstudiante({
        ...estudiante,
        [name]: value,
      });
    } else if (target === "encargado") {
      setEncargado({
        ...encargado,
        [name]: value,
      });

      if (name === "id") {
        setEstudiante({
          ...estudiante,
          encargadoId: value,
        });
      }
    } else if (target === "usuario") {
      setUsuario({
        ...usuario,
        [name]: value,
      });
    }
  };

  const asignarUsuario = async () => {
    const nombreUsuario = await generarNombreUsuario(
      estudiante.nombre,
      nombres
    );
    const contraseña = generarContraseña();

    setUsuario({
      ...usuario,
      nombre: nombreUsuario,
      contraseña: contraseña,
      id: estudiante.id,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // Realizar la creacion autmatica del usuario
      await asignarUsuario();

      console.log("Usuario: ", usuario);
      console.log("Encargado: ", encargado);
      console.log("Estudiante: ", estudiante);

      // Realizar la solicitud POST para el encargado
      await api.post("/encargados", encargado);

      // Realizar la solicitud POST para el estudiante
      await api.post("/estudiantes", estudiante);

      // Realizar la solicitud POST para el usuario

      await api.post("/usuarios", usuario);

      // Limpiar el formulario después de enviar los datos
      setEstudiante({
        id: "",
        nombre: "",
        apellido1: "",
        apellido2: "",
        fechaNacimiento: "",
        sexo: true,
        direccion: "",
        seccion: "",
        encargadoId: "",
      });

      setEncargado({
        id: "",
        nombre: "",
        apellido1: "",
        apellido2: "",
      });

      setUsuario({
        nombre: "",
        correo: "",
        contraseña: "",
        roleId: 4,
      });
    } catch (error) {
        api.delete(`/estudiantes/${estudiante.id}`);
        api.delete(`/encargados/${encargado.id}`);
      console.error("Error al agregar el Estudiante y Encargado:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center bg-purple-400">
      <div className="p-8 mt-5 mb-5 bg-white rounded-lg shadow-md">
        <h2 className="mb-2 text-2xl font-bold text-purple-400">
          Agregar Estudiante y Encargado
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="mb-6">
            <h3 className="mb-2 text-lg font-semibold text-purple-400">
              Estudiante
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <label className="block mb-2 text-sm font-semibold text-gray-600">
                Id Estudiante:
              </label>
              <input
                type="text"
                name="id"
                value={estudiante.id}
                onChange={(e) => {
                  handleInputChange(e, "estudiante");
                }}
                className="w-full p-2 border rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2 text-sm font-semibold text-gray-600">
                Nombre Estudiante:
              </label>
              <input
                type="text"
                name="nombre"
                value={estudiante.nombre}
                onChange={(e) => {
                  handleInputChange(e, "estudiante");
                }}
                className="w-full p-2 border rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2 text-sm font-semibold text-gray-600">
                Primer Apellido Estudiante:
              </label>
              <input
                type="text"
                name="apellido1"
                value={estudiante.apellido1}
                onChange={(e) => {
                  handleInputChange(e, "estudiante");
                }}
                className="w-full p-2 border rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2 text-sm font-semibold text-gray-600">
                Segundo Apellido Estudiante:
              </label>
              <input
                type="text"
                name="apellido2"
                value={estudiante.apellido2}
                onChange={(e) => {
                  handleInputChange(e, "estudiante");
                }}
                className="w-full p-2 border rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2 text-sm font-semibold text-gray-600">
                Fecha de Nacimiento Estudiante:
              </label>
              <input
                type="date"
                name="fechaNacimiento"
                value={estudiante.fechaNacimiento}
                onChange={(e) => {
                  handleInputChange(e, "estudiante");
                }}
                className="w-full p-2 border rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2 text-sm font-semibold text-gray-600">
                Dirección Estudiante:
              </label>
              <input
                type="text"
                name="direccion"
                value={estudiante.direccion}
                onChange={(e) => {
                  handleInputChange(e, "estudiante");
                }}
                className="w-full p-2 border rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2 text-sm font-semibold text-gray-600">
                Sexo Estudiante:
              </label>
              <select
                name="sexo"
                value={estudiante.sexo.toString()} // Convertir el valor booleano a cadena
                onChange={(e) => {
                  const valorSeleccionado = e.target.value === "true"; // Convertir la cadena de nuevo a booleano
                  handleInputChange(
                    { target: { name: "sexo", value: valorSeleccionado } },
                    "estudiante"
                  );
                }}
                className="w-full p-2 border rounded focus:outline-none focus:border-purple-400"
              >
                <option value={true.toString()}>Hombre</option>{" "}
                {/* Convertir true a cadena */}
                <option value={false.toString()}>Mujer</option>{" "}
                {/* Convertir false a cadena */}
              </select>
            </div>
            <div className="mb-4">
              <label className="block mb-2 text-sm font-semibold text-gray-600">
                Sección Estudiante:
              </label>
              <select
                name="seccion"
                value={estudiante.seccion}
                onChange={(e) => {
                  handleInputChange(e, "estudiante");
                }}
                className="w-full p-2 border rounded"
              >
                <option value="" disabled>
                  Seleccione una sección
                </option>
                {secciones.map((seccion, index) => (
                  <option key={index} value={seccion}>
                    {seccion}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="mb-6">
            <h3 className="mb-2 text-lg font-semibold text-purple-400">
              Encargado
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <label className="block mb-2 text-sm font-semibold text-gray-600">
                Id Encargado:
              </label>
              <input
                type="text"
                name="id"
                value={encargado.id}
                onChange={(e) => {
                  handleInputChange(e, "encargado");
                }}
                className="w-full p-2 border rounded"
              />
              <label className="block mb-2 text-sm font-semibold text-gray-600">
                Nombre Encargado:
              </label>
              <input
                type="text"
                name="nombre"
                value={encargado.nombre}
                onChange={(e) => {
                  handleInputChange(e, "encargado");
                }}
                className="w-full p-2 border rounded"
              />
              <div className="mb-4">
                <label className="block mb-2 text-sm font-semibold text-gray-600">
                  Primer Apellido Encargado:
                </label>
                <input
                  type="text"
                  name="apellido1"
                  value={encargado.apellido1}
                  onChange={(e) => {
                    handleInputChange(e, "encargado");
                  }}
                  className="w-full p-2 border rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2 text-sm font-semibold text-gray-600">
                  Segundo Apellido Encargado:
                </label>
                <input
                  type="text"
                  name="apellido2"
                  value={encargado.apellido2}
                  onChange={(e) => {
                    handleInputChange(e, "encargado");
                  }}
                  className="w-full p-2 border rounded"
                />
              </div>
            </div>
            <label className="block mb-2 text-sm font-semibold text-gray-600">
              Correo Encargado:
            </label>
            <input
              type="text"
              name="correo"
              value={usuario.correo}
              onChange={(e) => {
                handleInputChange(e, "usuario");
              }}
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className="px-4 py-2 text-white transition duration-300 bg-purple-400 rounded hover:bg-purple-200"
            >
              Agregar Estudiante y Encargado
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEstudiante;
