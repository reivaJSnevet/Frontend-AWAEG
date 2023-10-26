import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

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
  });
  const [encargado, setEncargado] = useState([]);
  const [secciones, setSecciones] = useState([]);

  useEffect(() => {
    if (paramId) {
      const fetchData = async () => {
        try {
          const response = await api.get(`estudiantes/${paramId}`);
          const { id, nombre, apellido1, apellido2, fechaNacimiento, sexo, direccion, seccion, encargadoId } = response.data;
          setFormData({
            id,
            nombre,
            apellido1,
            apellido2,
            fechaNacimiento,
            sexo,
            direccion,
            seccion,
            encargadoId
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
    console.log(formData);
    console.log(encargado);
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
      const response = await api.put(
        `estudiantes/${paramId || formData.id}`,
        formData
      );
      const responseEncargado = await api.put(
        `encargados/${encargado.id}`,
        encargado
        );

      console.log("Update successful:", response.data);
      console.log("Update successful:", responseEncargado.data);

    } catch (error) {
      console.error(
        "Error during operation:",
        error.response?.data || error.message
      );
    }
  };

  return (
    <div className="update-estudiante">
      <h2>Update Estudiante</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>ID: </label>
          <input
            type="text"
            name="id"
            value={formData.id}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Nombre: </label>
          <input
            type="text"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Pimer Apellido: </label>
          <input
            type="text"
            name="apellido1"
            value={formData.apellido1}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Segundo Apellido: </label>
          <input
            type="text"
            name="apellido2"
            value={formData.apellido2}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Fecha Nacimiento: </label>
          <input
            type="date"
            name="fechaNacimiento"
            value={formData.fechaNacimiento}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Sexo: </label>
          <select 
            name="sexo" 
            value={formData.sexo} 
            onChange={handleChange}>
            <option value={0} disabled>
              Select one
            </option>
            <option value={false}>Mujer</option>
            <option value={true}>Hombre</option>
          </select>
        </div>

        <div>
          <label>Dirección: </label>
          <input
            type="text"
            name="direccion"
            value={formData.direccion}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Sección: </label>
          <select
            name="seccion"
            value={formData.seccion}
            onChange={handleChange}
            required
          >s
            <option value="" disabled>
              Select one
            </option>
            {secciones.map((seccion, index) => (
              <option key={index} value={seccion}>
                {seccion}
              </option>
            ))}
          </select>
        </div>
        <h3>Encargado</h3>
        <div>
          <label>Nombre: </label>
          <input
            type="text"
            name="nombreEncargado"
            value={encargado.nombre}
            onChange={handleChangeEncargado}
            required
          />
        </div>
        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default UpdateEstudiante;
