import { useState } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

const GetUsuarioById = () => {
  const api = useAxiosPrivate();
  const [formData, setFormData] = useState({
    usuarioId: '',
    usuarioInfo: null,
    errorMessage: ''
  });

  const handleInputChange = (event) => {
    const inputValue = event.target.value;

    // Verifica si el valor ingresado es un número
    if (/^\d+$/.test(inputValue) || inputValue === '') {
      setFormData({
        ...formData,
        usuarioId: inputValue,
        errorMessage: '' // Limpia el mensaje de error si es válido
      });
    } else {
      setFormData({
        ...formData,
        errorMessage: 'Ingrese solo números'
      });
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    // Realiza una solicitud GET para obtener el usuario por ID
    api.get(`/usuarios/${formData.usuarioId}`)
      .then((response) => {
        // Actualiza el estado con la información del usuario
        setFormData({
          ...formData,
          usuarioInfo: response.data,
          errorMessage: '' // Limpia el mensaje de error si se encuentra el usuario
        });
      })
      .catch((error) => {
        console.error('Error al obtener el usuario por ID:', error);
        // Puedes manejar errores aquí, por ejemplo, mostrar un mensaje de error
        setFormData({
          ...formData,
          usuarioInfo: null, // Limpia la información del usuario si no se encuentra
          errorMessage: 'No se encontró un usuario con esa ID.'
        });
      });
  }

  return (
    <div className="relative max-w-md p-6 mx-auto mt-10 overflow-hidden bg-purple-600 rounded-lg shadow-lg">
      <h2 className="relative mb-4 text-2xl font-bold text-white">Obtener Usuario por ID</h2>
      {formData.errorMessage && <p style={{ color: 'red' }}>{formData.errorMessage}</p>}
      <form onSubmit={handleSubmit} className="relative space-y-4">
        <div>
          <label className="block mb-1 text-sm font-medium text-white">ID del Usuario:</label>
          <input
            type="text"
            value={formData.usuarioId}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
          />
        </div>
        <div>
          <button
            type="submit"
            className="w-full p-2 text-white bg-purple-300  rounded-md hover:bg-[#F7A834]  focus:outline-none focus:ring focus:ring-gray-700"
          >
            Obtener Usuario
          </button>
        </div>
      </form>
      {formData.usuarioInfo && (
        <div className="mt-4">
          <h3 className="mb-2 text-lg font-semibold text-white">Información del Usuario</h3>
          <p className="text-slate-950">Nombre: {formData.usuarioInfo.nombre}</p>
          <p className="text-slate-950">Correo: {formData.usuarioInfo.correo}</p>
          <p className="text-slate-950">Rol: {formData.usuarioInfo.role.nombre}</p>
        </div>
      )}
    </div>
  );
};

export default GetUsuarioById;