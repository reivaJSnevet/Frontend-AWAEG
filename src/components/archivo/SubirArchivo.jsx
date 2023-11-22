import { useState } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import useAuth from "../../hooks/useAuth";

function SubirArchivo() {
  const { auth } = useAuth();
  const api = useAxiosPrivate();
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    try {
      const formData = new FormData();
      formData.append("archivo", file);
      formData.append("funcionarioId", auth.personaId);

      const response = await api.post("/archivo", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      // Manejar la respuesta de la API después de subir el archivo
      console.log(response.data.message); // Esto debería imprimir "Archivo subido correctamente" si la subida es exitosa
    } catch (error) {
      // Manejar errores
      console.error(error);
    }
  };

  return (
    <div className="max-w-md p-8 mx-auto mt-10 bg-purple-600 rounded-lg shadow-lg">
      <input
        className="w-full p-2 bg-white border border-purple-600 rounded-md focus:outline-none focus:ring focus:ring-purple-600"
        type="file"
        onChange={handleFileChange}
      />
      <button
        className="w-full p-2 text-white bg-purple-300  rounded-md hover:bg-[#F7A834]  focus:outline-none focus:ring focus:ring-gray-700"
        onClick={handleUpload}
      >
        Subir Archivo
      </button>
    </div>
  );
}

export default SubirArchivo;
