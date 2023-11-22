import { useEffect, useState } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { generarContraseña } from "../../services/generadorContraseña.js";
import { generarNombreUsuario } from "../../services/generadorNombreUsuario.js";
import Swal from "sweetalert2";

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

      Swal.fire({
        icon: "success",
        title: "Éxito",
        text: "El funcionario se agregó exitosamente.",
      });
    } catch (error) {
      await api.delete(`/funcionarios/${funcionarioData.id}`);
      console.log(funcionarioData);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Hubo un error al agregar el funcionario. Por favor, inténtelo de nuevo.",
      });
    }
  };

  return (
    <div className="max-w-md p-8 mx-auto mt-10 bg-purple-600 rounded-lg shadow-lg">
      <h2 className="mb-6 text-2xl font-bold text-white">Agregar Funcionario</h2>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label className="block mb-1 text-sm font-medium text-white" >Id:</label>
          <input
            type="text"
            name="id"
            value={funcionarioData.id}
            onChange={handleInputChange}
            className="w-full p-2 bg-white border border-purple-600 rounded-md focus:outline-none focus:ring focus:ring-purple-600" 
          />
        </div>
        <div>
          <label className="block mb-1 text-sm font-medium text-white" >Nombre:</label>
          <input
            type="text"
            name="nombre"
            value={funcionarioData.nombre}
            onChange={handleInputChange}
            className="w-full p-2 bg-white border border-purple-600 rounded-md focus:outline-none focus:ring focus:ring-purple-600" 
          />
        </div>
        <div>
          <label className="block mb-1 text-sm font-medium text-white" >Primer Apellido:</label>
          <input
            type="text"
            name="apellido1"
            value={funcionarioData.apellido1}
            onChange={handleInputChange}
            className="w-full p-2 bg-white border border-purple-600 rounded-md focus:outline-none focus:ring focus:ring-purple-600" 
          />
        </div>
        <div>
          <label className="block mb-1 text-sm font-medium text-white" >Segundo Apellido:</label>
          <input
            type="text"
            name="apellido2"
            value={funcionarioData.apellido2}
            onChange={handleInputChange}
            className="w-full p-2 bg-white border border-purple-600 rounded-md focus:outline-none focus:ring focus:ring-purple-600" 
          />
        </div>
        <div>
          <label className="block mb-1 text-sm font-medium text-white" >Fecha Nacimiento:</label>
          <input
            type="date"
            name="fechaNacimiento"
            value={funcionarioData.fechaNacimiento}
            onChange={handleInputChange}
            className="w-full p-2 bg-white border border-purple-600 rounded-md focus:outline-none focus:ring focus:ring-purple-600" 
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 text-sm font-semibold text-white">
            Sexo:
          </label>
          <select
            name="sexo"
            value={funcionarioData.sexo.toString()}
            onChange={handleInputChange}
            className="w-full p-2 bg-white border border-purple-600 rounded-md focus:outline-none focus:ring focus:ring-purple-600" 
          >
            <option value="true">Hombre</option>
            <option value="false">Mujer</option>
          </select>
          <label className="block mb-2 text-sm font-semibold text-white">
            Correo Funcionario:
          </label>
          <input
            type="text"
            name="correo"
            value={usuario.correo}
            onChange={(e) => {
              handleInputChange(e, "usuario");
            }}
            
            className="w-full p-2 bg-white border border-purple-600 rounded-md focus:outline-none focus:ring focus:ring-purple-600" 
          />
        </div>

        <div>
          <button className="w-full p-2 text-white bg-purple-300  rounded-md hover:bg-[#F7A834]  focus:outline-none focus:ring focus:ring-gray-700" type="submit">Agregar Funcionario</button>
        </div>
      </form>
    </div>
  );
};

export default AddFuncionario;
