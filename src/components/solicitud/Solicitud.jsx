import { useState, useEffect } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

function Solicitud() {
  const api = useAxiosPrivate();
  const [solicitudesData, setSolicitudesData] = useState([]);

  useEffect(() => {
    // Llama a la API y actualiza el estado con los datos
    api
      .get("/solicitudes")
      .then((response) => {
        setSolicitudesData(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error al obtener datos de la API:", error);
      });
  }, []);

  if (!solicitudesData) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-purple-600">
      <div className="w-full max-w-md p-6 m-4 bg-purple-200 rounded-lg shadow-md">
        <h1 className="mb-4 text-2xl font-bold">Solicitudes</h1>

        {solicitudesData.notas && solicitudesData.notas.length > 0 ? (
          <div>
            <h2 className="mb-2 text-xl font-semibold">Tabla de Notas</h2>
            <table className="w-full text-left border-collapse">
              <thead>
                <tr>
                  <th className="px-4 py-2 text-white bg-purple-400">ID</th>
                  <th className="px-4 py-2 text-white bg-purple-400">
                    Calificación
                  </th>
                  {/* Agrega más encabezados según tus necesidades */}
                </tr>
              </thead>
              <tbody>
                {solicitudesData.notas.map((nota) => (
                  <tr key={nota.id} className="bg-white">
                    <td className="px-4 py-2 border-t">{nota.id}</td>
                    <td className="px-4 py-2 border-t">{nota.calificacion}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="mt-4">Sin solicitudes de notas.</p>
        )}

        {/* <div className="w-full max-w-md p-6 m-4 bg-purple-200 rounded-lg shadow-md"> */}
          {solicitudesData.archivos && solicitudesData.archivos.length > 0 ? (
            <div className="mt-8">
              <h2 className="mb-2 text-xl font-semibold">Tabla de Archivos</h2>
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr>
                    <th className="px-4 py-2 text-white bg-purple-400">ID</th>
                    <th className="px-4 py-2 text-white bg-purple-400">Nombre</th>
                    {/* Agrega más encabezados según tus necesidades */}
                  </tr>
                </thead>
                <tbody>
                  {solicitudesData.archivos.map((archivo) => (
                    <tr key={archivo.id} className="bg-white">
                      <td className="px-4 py-2 border-t">{archivo.id}</td>
                      <td className="px-4 py-2 border-t">{archivo.nombre}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="mt-4">Sin solicitudes de archivos.</p>
          )}
        {/* </div> */}

        {solicitudesData.prematriculas &&
        solicitudesData.prematriculas.length > 0 ? (
          <div className="mt-8">
            <h2 className="mb-2 text-xl font-semibold">Tabla de Prematrículas</h2>
            <table className="w-full text-left border-collapse">
              <thead>
                <tr>
                  <th className="px-4 py-2 text-white bg-purple-400">ID</th>
                  <th className="px-4 py-2 text-white bg-purple-400">Estado</th>
                </tr>
              </thead>
              <tbody>
                {solicitudesData.prematriculas.map((prematricula) => (
                  <tr key={prematricula.id} className="bg-white">
                    <td className="px-4 py-2 border-t">{prematricula.id}</td>
                    <td className="px-4 py-2 border-t">{prematricula.estado ? "Aceptada" : "Esperando"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="mt-4">Sin solicitudes de prematrículas.</p>
        )}
      </div>
    </div>
  );
}

export default Solicitud;
