import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import api from "../../services/api.config";

const UpdateEstudiante = () => {
  const { id } = useParams();

  const [formData, setFormData] = useState({
    id: "",
    nombre: "",
    apellido1: "",
    apellido2: "",
    fechaNacimiento: "",
    sexo: 0,
    direccion: "",
  });
  const [secciones, setSecciones] = useState([]);

  useEffect(() => {
    if (id) {
      const fetchData = async () => {
        try {
          const response = await api.get(`estudiantes/${id}`);
          setFormData(response.data);
        } catch (error) {
          console.error(
            "Error fetching estudiante:",
            error.response?.data || error.message
          );
        }
      };
      fetchData();
    }
  }, [id]);

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

  const validateForm = () => {
    // Check if id is 9 digits
    if (!/^(\d{9})$/.test(formData.id)) {
      alert("Debe ingresar un ID de 9 dígitos.");
      return false;
    }

    const { id, nombre, apellido1, apellido2, fechaNacimiento, sexo } =
      formData;
    console.log(formData);
    if (
      !id ||
      !nombre ||
      !apellido1 ||
      !apellido2 ||
      !fechaNacimiento ||
      !sexo
    ) {
      alert("Por favor, complete todos los campos.");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!validateForm()) {
      return;
    }
  
    try {
      const oldSeccion = id ? (await api.get(`estudiantes/${id}`)).data.seccion : null;

      const response = await api.put(`estudiantes/${id || formData.id}`, formData);

      console.log("Update successful:", response.data);

      if (id && oldSeccion !== formData.seccion) {
        await api.put(`grupos/${oldSeccion}/decrement`);
        await api.put(`grupos/${formData.seccion}/increment`);
      } else if (!id) {
        await api.put(`grupos/${formData.seccion}/increment`);
      }
  
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
          <label>ID:</label>
          <input
            type="text"
            name="id"
            value={formData.id}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Nombre:</label>
          <input
            type="text"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Apellido 1:</label>
          <input
            type="text"
            name="apellido1"
            value={formData.apellido1}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Apellido 2:</label>
          <input
            type="text"
            name="apellido2"
            value={formData.apellido2}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Fecha Nacimiento:</label>
          <input
            type="date"
            name="fechaNacimiento"
            value={formData.fechaNacimiento}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Sexo:</label>
          <select name="sexo" value={formData.sexo} onChange={handleChange}>
            <option value={0} disabled>
              Select one
            </option>
            <option value={0}>Male</option>
            <option value={1}>Female</option>
          </select>
        </div>

        <div>
          <label>Dirección:</label>
          <input
            type="text"
            name="direccion"
            value={formData.direccion}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Sección:</label>
          <select
            name="seccion"
            value={formData.seccion}
            onChange={handleChange}
            required
          >
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

        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default UpdateEstudiante;
