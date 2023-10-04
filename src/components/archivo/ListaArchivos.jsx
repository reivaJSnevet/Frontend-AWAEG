import { useEffect, useState } from "react";
import api from "../../services/api.config.js";

function ListaArchivos() {
  const [archivos, setArchivos] = useState([]);

  useEffect(() => {
    // Hacer la solicitud a la API para obtener la lista de archivos
    api.get("/archivos")
      .then((response) => {
        setArchivos(response.data.archivos);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []); 

  const handleDescargarArchivo = (nombreArchivo) => {
    // Hacer la solicitud GET para descargar el archivo con el nombre `nombreArchivo`
    // La URL de descarga debe incluir el nombre del archivo
    api.get(`/archivo/${nombreArchivo}`, { responseType: 'blob' })
      .then((response) => {
        // Crear un objeto URL para el blob y crear un enlace para descargar el archivo
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', nombreArchivo);
        // Agregar el enlace al documento y hacer clic en él para iniciar la descarga
        document.body.appendChild(link);
        link.click();
        // Liberar el objeto URL y remover el enlace del documento
        window.URL.revokeObjectURL(url);
        document.body.removeChild(link);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div>
      <h2>Lista de Archivos</h2>
      <ul>
        {archivos.map((archivo, index) => (
          <li key={index}>
            {archivo}
            <button onClick={() => handleDescargarArchivo(archivo)}>Descargar</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ListaArchivos;
