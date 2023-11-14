import { useEffect, useState } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { generarContraseña } from "../../services/generadorContraseña.js";
import { generarNombreUsuario } from "../../services/generadorNombreUsuario.js";

const AddFuncionario = () => {
  const api = useAxiosPrivate();
  const [nombres, setNombres] = useState([""]);
  const [funcionarioData, setFuncionarioData] = useState({
    id: "",
    nombre: "",
    apellido1: "",
    apellido2: "",
    fechaNacimiento: "",
    sexo: true,
  });

  const [usuario, setUsuario] = useState({
    nombre: "",
    correo: "",
    contraseña: "",
    roleId: 3,
    id: "",
  });

  useEffect(() => {
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
  }, []);

  const handleInputChange = (event, target) => {
    const { name, value } = event.target;

    if (target === "usuario") {
      setUsuario((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    } else {
      setFuncionarioData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const asignarUsuario = async () => {
    const nombreUsuario = await generarNombreUsuario(
      funcionarioData.nombre,
      nombres
    );
    const contraseña = generarContraseña();

    setUsuario({
      ...usuario,
      nombre: nombreUsuario,
      contraseña: contraseña,
      id: funcionarioData.id,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Verificar que los campos estén completos
    const { id, nombre, apellido1, apellido2, fechaNacimiento } =
      funcionarioData;
    if (!id || !nombre || !apellido1 || !apellido2 || !fechaNacimiento) {
      alert("Por favor, complete todos los campos.");
      return;
    }

    try {
      // Realizar la solicitud POST a través de la instancia de Axios
      await api.post("/funcionarios", funcionarioData);

      // Asignar el usuario
      await asignarUsuario();

      // Agregar el usuario
      await api.post("/usuarios", usuario);

      // Limpiar el formulario después de enviar los datos
      setFuncionarioData({
        id: "",
        nombre: "",
        apellido1: "",
        apellido2: "",
        fechaNacimiento: "",
        sexo: true,
      });

      setUsuario({
        nombre: "",
        correo: "",
        contraseña: "",
        roleId: 3,
        id: "",
      });

      alert("Funcionario agregado exitosamente.");
    } catch (error) {
      await api.delete(`/funcionarios/${funcionarioData.id}`);
      console.error("Error al agregar el funcionario:", error);
      alert(
        "Hubo un error al agregar el funcionario. Por favor, inténtelo de nuevo."
      );
    }
  };

  return (
    <div>
      <h2>Agregar Funcionario</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Id:</label>
          <input
            type="text"
            name="id"
            value={funcionarioData.id}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Nombre:</label>
          <input
            type="text"
            name="nombre"
            value={funcionarioData.nombre}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Primer Apellido:</label>
          <input
            type="text"
            name="apellido1"
            value={funcionarioData.apellido1}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Segundo Apellido:</label>
          <input
            type="text"
            name="apellido2"
            value={funcionarioData.apellido2}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Fecha Nacimiento:</label>
          <input
            type="date"
            name="fechaNacimiento"
            value={funcionarioData.fechaNacimiento}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 text-sm font-semibold text-gray-600">
            Sexo:
          </label>
          <select
            name="sexo"
            value={funcionarioData.sexo.toString()}
            onChange={handleInputChange}
          >
            <option value="true">Hombre</option>
            <option value="false">Mujer</option>
          </select>
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

        <div>
          <button type="submit">Agregar Funcionario</button>
        </div>
      </form>
    </div>
  );
};

export default AddFuncionario;
