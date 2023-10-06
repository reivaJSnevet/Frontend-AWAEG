import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import api from "../../services/api.config";

const UpdateGrupo = () => {
  const { seccion: encodedSeccion } = useParams();
  const seccion = decodeURIComponent(encodedSeccion);

  const [formData, setFormData] = useState({
    seccion: "",
    ciclo: "",
    grado: "",
    aula: "",
    cantAlumno: 0,
    turno: false,
  });
  const [funcionarios, setFuncionarios] = useState([]);
  const [selectedProfesorId, setSelectedProfesorId] = useState(null);

  useEffect(() => {
    const fetchFuncionarios = async () => {
      try {
        const response = await api.get("funcionarios");
        setFuncionarios(response.data);
      } catch (error) {
        console.error(
          "Error fetching funcionarios:",
          error.response?.data || error.message
        );
      }
    };
    fetchFuncionarios();
  }, []);

  useEffect(() => {
    if (seccion) {
      const fetchData = async () => {
        try {
          const response = await api.get(`grupos/${encodedSeccion}`);
          setFormData(response.data);
        } catch (error) {
          console.error(
            "Error fetching grupo:",
            error.response?.data || error.message
          );
        }
      };
      fetchData();
    }
  }, [seccion, encodedSeccion]);

  const handleChange = (e) => {
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
        `grupos/${encodeURIComponent(formData.seccion)}`,
        formData
      );
      console.log("Update successful:", response.data);
    } catch (error) {
      console.error(
        "Error updating grupo:",
        error.response?.data || error.message
      );
    }
  };

  return (
    <div className="update-grupo">
      <h2>Update Grupo</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Sección:</label>
          <input
            type="text"
            name="seccion"
            value={formData.seccion}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Ciclo:</label>
          <input
            type="text"
            name="ciclo"
            value={formData.ciclo}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Grado:</label>
          <input
            type="text"
            name="grado"
            value={formData.grado}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Aula:</label>
          <input
            type="text"
            name="aula"
            value={formData.aula}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Cantidad de Alumnos:</label>
          <input
            type="number"
            name="cantAlumno"
            value={formData.cantAlumno}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Turno:</label>
          <select name="turno" value={formData.turno} onChange={handleChange}>
            <option value={false}>Mañana</option>
            <option value={true}>Tarde</option>
          </select>
        </div>
        <div>
          <label>Profesor:</label>
          <select
            name="profesor"
            value={selectedProfesorId}
            onChange={(e) => setSelectedProfesorId(e.target.value)}
          >
            <option value="" disabled>
              Seleccione un profesor
            </option>
            {funcionarios.map((funcionario) => (
              <option key={funcionario.id} value={funcionario.id}>
                {funcionario.nombre} {funcionario.apellido1}{" "}
                {funcionario.apellido2}
              </option>
            ))}
          </select>
        </div>
        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default UpdateGrupo;
