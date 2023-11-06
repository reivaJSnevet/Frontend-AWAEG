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
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Subir Archivo</button>
    </div>
  );
}

export default SubirArchivo;
