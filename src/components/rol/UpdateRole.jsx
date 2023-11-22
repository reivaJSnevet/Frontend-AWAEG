import { useState, useEffect } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";

const UpdateRol = () => {
  const api = useAxiosPrivate();
  const { paramId } = useParams();
  const [rol, setRol] = useState({
    id: "",
    nombre: "",
    nivelPrivilegio: 0,
    descripcion: "",
  });

  useEffect(() => {
    if (!paramId) return;
    const fetchRol = async () => {
      try {
        const response = await api.get(`/roles/${paramId}`);
        setRol(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchRol();
  }, [paramId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRol((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/roles/${paramId}`, rol);

      Swal.fire({
        icon: "success",
        title: "Éxito",
        text: "El rol se actualizó exitosamente.",
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Hubo un error al actualizar el rol. Por favor, inténtelo de nuevo.",
      });
    }
  };

  return (
    <div className="p-8 bg-purple-400 rounded shadow-lg">
      <h2 className="mb-6 text-3xl font-semibold text-white">Actualizar Rol</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block mb-2 text-sm font-semibold text-white">
            Nombre del Rol:
          </label>
          <input
            type="text"
            name="nombre"
            value={rol.nombre}
            onChange={handleInputChange}
            className="w-full p-2 border rounded focus:outline-none focus:border-purple-400"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2 text-sm font-semibold text-white">
            Nivel de Privilegio:
          </label>
          <input
            type="number"
            name="nivelPrivilegio"
            value={rol.nivelPrivilegio}
            onChange={handleInputChange}
            className="w-full p-2 border rounded focus:outline-none focus:border-purple-400"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2 text-sm font-semibold text-white">
            Descripción:
          </label>
          <textarea
            name="descripcion"
            value={rol.descripcion}
            onChange={handleInputChange}
            className="w-full p-2 border rounded focus:outline-none focus:border-purple-400"
            rows="4"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full p-2 text-white bg-purple-300  rounded-md hover:bg-[#F7A834]  focus:outline-none focus:ring focus:ring-gray-700"
        >
          Actualizar
        </button>
      </form>
    </div>
  );
};

export default UpdateRol;
