import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import Swal from "sweetalert2";

const UpdateFuncionario = () => {
  const api = useAxiosPrivate();
  const { paramId } = useParams();

  const [formData, setFormData] = useState({
    id: "",
    nombre: "",
    apellido1: "",
    apellido2: "",
    fechaNacimiento: "",
    sexo: true,
  });

  useEffect(() => {
    if (paramId) {
      // Fetch the data for the Funcionario with the given ID
      const fetchData = async () => {
        try {
          const response = await api.get(`funcionarios/${paramId}`);
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
  }, [paramId]);

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

    try {
      if (!validateForm()) {
        return;
      }

      await api.put(`funcionarios/${paramId || formData.id}`, formData);

      Swal.fire({
        icon: "success",
        title: "Éxito",
        text: "El funcionario se actualizó exitosamente.",
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Hubo un error al actualizar el funcionario. Por favor, inténtelo de nuevo.",
      });
    }
  };

  return (
    <div className="p-8 bg-purple-400 rounded shadow-lg">
      <h2 className="mb-6 text-3xl font-semibold text-white">
        Update Funcionario
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block mb-2 text-sm font-semibold text-white">
            ID:
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
            Nombre:
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
            Apellido 1:
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
            Apellido 2:
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
            Fecha Nacimiento:
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
            Sexo:
          </label>
          <select
            className="w-full p-2 border rounded focus:outline-none focus:border-purple-400"
            name="sexo"
            value={formData.sexo}
            onChange={handleChange}
          >
            <option value={null} disabled>
              Select one
            </option>
            <option value={true}>Male</option>
            <option value={false}>Female</option>
          </select>
        </div>
        <button
          className="w-full p-2 text-white bg-purple-300  rounded-md hover:bg-[#F7A834]  focus:outline-none focus:ring focus:ring-gray-700"
          type="submit"
        >
          Update
        </button>
      </form>
    </div>
  );
};

export default UpdateFuncionario;
