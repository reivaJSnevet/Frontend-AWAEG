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
    <div className="max-w-xl p-4 bg-purple-400 rounded-lg shadow-lg md:max-w-2xl lg:max-w-3xl xl:max-w-4xl">
      <h2 className="p-4 mb-4 text-2xl text-center text-black fomax-w-xl mx-autont-bold">
        Datos del Estudiante
      </h2>
      <form className="grid grid-cols-2 gap-4 md:grid-cols-2">
        <div className="flex flex-col">
          <label className="mb-1 text-black">Cedula:</label>
          <input
            type="text"
            value={estudiante.id}
            readOnly
            className="px-3 py-2 text-black bg-purple-200 border-2 rounded"
          />
        </div>
        <div className="flex flex-col">
          <label className="mb-1 text-black">Nombre:</label>
          <input
            type="text"
            value={estudiante.nombre}
            readOnly
            className="px-3 py-2 text-black bg-purple-200 border-2 rounded"
          />
        </div>
        <div className="flex flex-col">
          <label className="mb-1 text-black">Apellido 1:</label>
          <input
            type="text"
            value={estudiante.apellido1}
            readOnly
            className="px-3 py-2 text-black bg-purple-200 border-2 rounded"
          />
        </div>
        <div className="flex flex-col">
          <label className="mb-1 text-black">Apellido 2:</label>
          <input
            type="text"
            value={estudiante.apellido2}
            readOnly
            className="px-3 py-2 text-black bg-purple-200 border-2 rounded"
          />
        </div>
        <div className="flex flex-col">
          <label className="py-1 mb-1 text-xs text-black xl:text-sm">Fecha de Nacimiento:</label>
          <input
            type="text"
            value={estudiante.fechaNacimiento}
            readOnly
            className="px-3 py-2 text-black bg-purple-200 border-2 rounded"
          />
        </div>
        <div className="flex flex-col">
          <label className="mb-1 text-black">Edad:</label>
          <input
            type="text"
            value={estudiante.edad}
            readOnly
            className="px-3 py-2 text-black bg-purple-200 border-2 rounded"
          />
        </div>
        <div className="flex flex-col">
          <label className="mb-1 text-black">Sexo:</label>
          <input
            type="text"
            value={estudiante.sexo ? "Femenino" : "Masculino"}
            readOnly
            className="px-3 py-2 text-black bg-purple-200 border-2 rounded"
          />
        </div>
        <div className="flex flex-col">
          <label className="mb-1 text-black">Sección Anterior:</label>
          <input
            type="text"
            value={estudiante.seccion}
            readOnly
            className="px-3 py-2 text-black bg-purple-200 border-2 rounded"
          />
        </div>
      </form>
      <div className="flex flex-col items-center justify-center mt-6 md:flex-row">
        <button
          type="submit"
          onClick={handlePrematricula}
          className="w-full px-4 py-2 text-lg font-bold text-black bg-yellow-500 rounded md:w-auto hover:bg-yellow-700"
        >
          Enviar Prematrícula
        </button>
      </div>
    </div>
  );
};

export default Prematricula;
