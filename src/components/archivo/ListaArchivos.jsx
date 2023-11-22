import { useEffect, useState } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

function ListaArchivos() {
  const [archivos, setArchivos] = useState([]);
  const api = useAxiosPrivate();

  useEffect(() => {
    // Hacer la solicitud a la API para obtener la lista de archivos
    api.get("/archivo")
      .then((response) => {
        console.log(response.data);
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
    <div className="max-w-md p-8 mx-auto mt-10 bg-purple-600 rounded-lg shadow-lg">
    <h2 className="mb-6 text-2xl font-bold text-white">Lista de Archivos</h2>
    {archivos.length === 0 ? (
        <div className="bg-purple-600 p-14 rounded-t-2xl">
      <p className="p-10 mb-8 text-2xl font-bold bg-white rounded-md rounded-tr-xl">Sin tarea</p>
      </div>
      
    ) : (
      <ul>
        {archivos.map((archivo, index) => (
          <li key={index} className="flex items-center justify-between py-2 border-b border-yellow-300">
            <span>{archivo}</span>
            <button 
              className="w-full p-2 text-white bg-purple-300  rounded-md hover:bg-[#F7A834]  focus:outline-none focus:ring focus:ring-gray-700"
              onClick={() => handleDescargarArchivo(archivo)}
            >
              Descargar
            </button>
          </li>
        ))}
      </ul>
    )}
  </div>
  );
}

export default ListaArchivos;
