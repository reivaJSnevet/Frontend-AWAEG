import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import Swal from "sweetalert2";

const UpdateEstudiante = () => {
  const api = useAxiosPrivate();
  const { paramId } = useParams();

  const [formData, setFormData] = useState({
    id: "",
    nombre: "",
    apellido1: "",
    apellido2: "",
    fechaNacimiento: "",
    sexo: true,
    direccion: "",
    seccion: "",
    encargadoId: "",
    usuarioId: "",
  });
  const [encargado, setEncargado] = useState([]);
  const [secciones, setSecciones] = useState([]);

  useEffect(() => {
    if (paramId) {
      const fetchData = async () => {
        try {
          const response = await api.get(`estudiantes/${paramId}`);
          const {
            id,
            nombre,
            apellido1,
            apellido2,
            fechaNacimiento,
            sexo,
            direccion,
            seccion,
            encargadoId,
          } = response.data;
          setFormData({
            id,
            nombre,
            apellido1,
            apellido2,
            fechaNacimiento,
            sexo,
            direccion,
            seccion,
            encargadoId,
          });
          setEncargado(response.data.encargado);
        } catch (error) {
          console.error(
            "Error fetching estudiante:",
            error.response?.data || error.message
          );
        }
      };
      fetchData();
    }
    /* console.log(formData);
    console.log(encargado); */
  }, [paramId]);

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
    fetchSecciones();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleChangeEncargado = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.put(`estudiantes/${paramId || formData.id}`, formData);
      await api.put(`encargados/${encargado.id}`, encargado);

      Swal.fire({
        icon: "success",
        title: "Éxito",
        text: "El estudiante se actualizó exitosamente.",
      });
    } catch (error) {
     
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Hubo un error al actualizar el estudiante. Por favor, inténtelo de nuevo.",
      });
    }
  };

  return (
    <div className="p-8 bg-purple-400 rounded shadow-lg">
      <h2 className="mb-6 text-3xl font-semibold text-white">
        Update Estudiante
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block mb-2 text-sm font-semibold text-white">
            ID:{" "}
          </label>
          <input
            type="text"
            name="id"
            value={formData.id}
            onChange={handleChange}
            className="w-full p-2 border rounded focus:outline-none focus:border-purple-400"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 text-sm font-semibold text-white">
            Nombre:{" "}
          </label>
          <input
            type="text"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            className="w-full p-2 border rounded focus:outline-none focus:border-purple-400"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 text-sm font-semibold text-white">
            Pimer Apellido:{" "}
          </label>
          <input
            type="text"
            name="apellido1"
            value={formData.apellido1}
            onChange={handleChange}
            className="w-full p-2 border rounded focus:outline-none focus:border-purple-400"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 text-sm font-semibold text-white">
            Segundo Apellido:{" "}
          </label>
          <input
            type="text"
            name="apellido2"
            value={formData.apellido2}
            onChange={handleChange}
            className="w-full p-2 border rounded focus:outline-none focus:border-purple-400"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 text-sm font-semibold text-white">
            Fecha Nacimiento:{" "}
          </label>
          <input
            type="date"
            name="fechaNacimiento"
            value={formData.fechaNacimiento}
            onChange={handleChange}
            className="w-full p-2 border rounded focus:outline-none focus:border-purple-400"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 text-sm font-semibold text-white">
            Sexo:{" "}
          </label>
          <select
            name="sexo"
            value={formData.sexo}
            onChange={handleChange}
            className="w-full p-2 border rounded focus:outline-none focus:border-purple-400"
          >
            <option value={0} disabled>
              Select one
            </option>
            <option value={false}>Mujer</option>
            <option value={true}>Hombre</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block mb-2 text-sm font-semibold text-white">
            Dirección:{" "}
          </label>
          <input
            type="text"
            name="direccion"
            value={formData.direccion}
            onChange={handleChange}
            className="w-full p-2 border rounded focus:outline-none focus:border-purple-400"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 text-sm font-semibold text-white">
            Sección:{" "}
          </label>
          <select
            name="seccion"
            value={formData.seccion}
            onChange={handleChange}
            className="w-full p-2 border rounded focus:outline-none focus:border-purple-400"
            required
          >
            s
            <option value="" disabled>
              Seleciona una sección
            </option>
            {secciones.map((seccion, index) => (
              <option key={index} value={seccion}>
                {seccion}
              </option>
            ))}
          </select>
        </div>
        <h3 className="text-white mb-2">Encargado</h3>
        <div className="mb-4">
          <label className="block mb-2 text-sm font-semibold text-white">
            Nombre:{" "}
          </label>
          <input
            type="text"
            name="nombreEncargado"
            value={encargado.nombre}
            onChange={handleChangeEncargado}
            className="w-full p-2 border rounded focus:outline-none focus:border-purple-400"
            required
          />
        </div>
        <button
          className="w-full p-2 text-white bg-purple-300  rounded-md hover:bg-[#F7A834]  focus:outline-none focus:ring focus:ring-gray-700"
          type="submit"
        >
          Update
        </button>
      </form>

      <div className="md:w-1/2">
        <h2>Usuario</h2>
        <div className="mb-4">
          <label className="block mb-2 text-sm font-semibold text-white">
            ID:{" "}
          </label>
          <input
            type="text"
            name="id"
            value={formData.encargadoId}
            onChange={handleChangeEncargado}
            className="w-full p-2 border rounded focus:outline-none focus:border-purple-400"
            required
          />
        </div>
      </div>
    </div>
  );
};

export default UpdateEstudiante;
