import { useState } from "react";
import api from "../../services/api.config.js";

function SubirArchivo() {
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = () => {
    const formData = new FormData();
    formData.append("file", file);

    api
      .post("/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        // Manejar la respuesta de la API después de subir el archivo
        console.log(response.data.message); // Esto debería imprimir "Archivo subido correctamente" si la subida es exitosa
      })
      .catch((error) => {
        // Manejar errores
        console.error(error);
      });
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Subir Archivo</button>
    </div>
  );
}

export default SubirArchivo;
