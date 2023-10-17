import React, { useState, useEffect } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import useAuth from "../../hooks/useAuth";

const Prematricula = () => {
  const api = useAxiosPrivate();
  const { auth } = useAuth();

  const [estudiante, setEstudiante] = useState({
    id: "",
    nombre: "",
    apellido1: "",
    apellido2: "",
    fechaNacimiento: "",
    edad: "",
    sexo: false,
    seccion: "",
  });

  const handlePrematricula = async () => {
    try {
      const nuevoGrado = parseInt(estudiante.seccion.charAt(0)) + 1;
      const prematriculaData = {
        grado: nuevoGrado,
        estudianteId: estudiante.id,
      };

      await api.post("prematriculas", prematriculaData);
      // Puedes agregar lógica adicional después de enviar la prematrícula si es necesario.
      console.log("Prematrícula enviada con éxito");
    } catch (error) {
      console.error("Error al enviar la prematrícula:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get(`estudiantes/${auth.personaId}`);
        setEstudiante(response.data);
      } catch (error) {
        console.error("Error al obtener datos del estudiante:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="max-w-2xl p-8 mx-auto my-4 bg-purple-700 rounded-lg shadow-lg">
      <h2 className="mb-4 text-3xl font-bold text-white">
        Datos del Estudiante
      </h2>
      <form className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="flex flex-col">
          <label className="mb-1 text-white">Cedula:</label>
          <input
            type="text"
            value={estudiante.id}
            readOnly
            className="px-3 py-2 text-white bg-purple-600 border-2 rounded"
          />
        </div>
        <div className="flex flex-col">
          <label className="mb-1 text-white">Nombre:</label>
          <input
            type="text"
            value={estudiante.nombre}
            readOnly
            className="px-3 py-2 text-white bg-purple-600 border-2 rounded"
          />
        </div>
        <div className="flex flex-col">
          <label className="mb-1 text-white">Apellido 1:</label>
          <input
            type="text"
            value={estudiante.apellido1}
            readOnly
            className="px-3 py-2 text-white bg-purple-600 border-2 rounded"
          />
        </div>
        <div className="flex flex-col">
          <label className="mb-1 text-white">Apellido 2:</label>
          <input
            type="text"
            value={estudiante.apellido2}
            readOnly
            className="px-3 py-2 text-white bg-purple-600 border-2 rounded"
          />
        </div>
        <div className="flex flex-col">
          <label className="mb-1 text-white">Fecha de Nacimiento:</label>
          <input
            type="text"
            value={estudiante.fechaNacimiento}
            readOnly
            className="px-3 py-2 text-white bg-purple-600 border-2 rounded"
          />
        </div>
        <div className="flex flex-col">
          <label className="mb-1 text-white">Edad:</label>
          <input
            type="text"
            value={estudiante.edad}
            readOnly
            className="px-3 py-2 text-white bg-purple-600 border-2 rounded"
          />
        </div>
        <div className="flex flex-col">
          <label className="mb-1 text-white">Sexo:</label>
          <input
            type="text"
            value={estudiante.sexo ? "Femenino" : "Masculino"}
            readOnly
            className="px-3 py-2 text-white bg-purple-600 border-2 rounded"
          />
        </div>
        <div className="flex flex-col">
          <label className="mb-1 text-white">Sección Anterior:</label>
          <input
            type="text"
            value={estudiante.seccion}
            readOnly
            className="px-3 py-2 text-white bg-purple-600 border-2 rounded"
          />
        </div>

      </form>
      <div className="flex justify-center">
          <button type="submit" onClick={handlePrematricula} className="px-4 py-2 mt-10 text-lg font-bold text-white bg-yellow-500 rounded hover:bg-yellow-700">
            Enviar Prematricula
          </button>
        </div>
    </div>
  );
};

export default Prematricula;
