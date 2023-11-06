import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

const UpdateGrupo = () => {
    const api = useAxiosPrivate();
    const {paramId} = useParams();
    
  const [formData, setFormData] = useState({
    seccion: "",
    ciclo: "",
    grado: "",
    aula: "",
    cantAlumno: "",
    turno: false,
    funcionarioId: "",
  });
  const [funcionarios, setFuncionarios] = useState([]);

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
    if (paramId) {
      const fetchData = async () => {
        try {
          const response = await api.get(`grupos/${paramId}`);
          setFormData(response.data[1]);
          console.log(response.data[1]);
        } catch (error) {
          console.error(
            "Error fetching grupo:",
            error.response?.data || error.message
          );
        }
      };
      fetchData();
    }
  }, [paramId]);

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
          <option value="" disabled>
                Seleccione un profesor
              </option>
            <option value={false}>Mañana</option>
            <option value={true}>Tarde</option>
          </select>
        </div>
        <div>
        <label>Profesor:</label>
            <select
              name="funcionarioId"
              value={formData.funcionarioId}
              onChange={handleChange}
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
