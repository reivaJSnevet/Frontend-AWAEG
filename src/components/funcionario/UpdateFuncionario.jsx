import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import api from "../../services/api.config";

const UpdateFuncionario = () => {
  const { id } = useParams();

  const [formData, setFormData] = useState({
    id: "",
    nombre: "",
    apellido1: "",
    apellido2: "",
    fechaNacimiento: "",
    sexo: 0,
  });

  useEffect(() => {
    if (id) {
      // Fetch the data for the Funcionario with the given ID
      const fetchData = async () => {
        try {
          const response = await api.get(`funcionarios/${id}`);
          setFormData(response.data);
        } catch (error) {
          console.error(
            "Error fetching funcionario:",
            error.response?.data || error.message
          );
        }
      };
      fetchData();
    }
  }, [id]);

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
      const response = await api.put(
        `funcionarios/${id || formData.id}`,
        formData
      );
      console.log("Update successful:", response.data);
    } catch (error) {
      console.error(
        "Error updating funcionario:",
        error.response?.data || error.message
      );
    }
  };

  return (
    <div className="update-funcionario">
      <h2>Update Funcionario</h2>
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
        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default UpdateFuncionario;
