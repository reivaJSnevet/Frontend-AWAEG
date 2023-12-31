import { useEffect, useState } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import useAuth from "../../hooks/useAuth";

const AddNota = () => {
  const api = useAxiosPrivate();
  const { auth } = useAuth();
  const personaId = auth?.personaId || null;
  const [secciones, setSecciones] = useState([]);
  const [materias, setMaterias] = useState([]);
  const [estudiantes, setEstudiantes] = useState([]);
  const [selectedSeccion, setSelectedSeccion] = useState("");
  const [selectedMateria, setSelectedMateria] = useState("");
  const [selectedPeriodo, setSelectedPeriodo] = useState("");
  const [notas, setNotas] = useState([]);

  /*   const [notas, setNotas] = useState({
    calificacion: "",
    periodo: selectedPeriodo,
    funcionarioId: personaId,
    estudianteId: "",
    materiaId: "",
  }); */

  useEffect(() => {
    const fetchSecciones = async () => {
      const responseSecciones = await api.get(
        `grupos/funcionario/${personaId}`
      );
      const responseMaterias = await api.get(
        `clases/funcionarios/${personaId}`
      );

      setSecciones(responseSecciones.data);
      setMaterias(responseMaterias.data);
    };

    fetchSecciones();
  }, [api, personaId]);

  // useEffect para imprimir   en la consola cuando la sección cambie
  useEffect(() => {
    const fetchEstudiantes = async () => {
      console.log("Hola, sección cambiada:", selectedSeccion);
      const responseEstudiantes = await api.get(`grupos/${selectedSeccion}`);
      setEstudiantes(responseEstudiantes.data[1].estudiantes);
    };


    setNotas([]);
    fetchEstudiantes();
  }, [selectedSeccion, api]);

  const handleSelectChange = (event) => {
    setSelectedMateria(event.target.value);
  };

  const handleNotaChange = (e, estudianteId) => {
    const nuevaNota = {
      estudianteId: estudianteId,
      calificacion: e.target.value,
      periodo: selectedPeriodo,
      materiaId: selectedMateria,
      funcionarioId: personaId,
    };

    const notaExistenteIndex = notas.findIndex(
      (nota) => nota.estudianteId === estudianteId
    );

    if (notaExistenteIndex !== -1) {
      const nuevasNotas = [...notas];
      nuevasNotas[notaExistenteIndex] = nuevaNota;
      setNotas(nuevasNotas);
    } else {
      setNotas([...notas, nuevaNota]);
    }
  };

  const handleEnviarNotas = async () => {
    try {
      const post = await api.post("notas", notas);
      console.log(post);
  
      // Limpiar el estado notas después de un envío exitoso
      setNotas([]);
  
      // Aquí puedes realizar cualquier otra operación con las notas, como enviarlas a través de una solicitud de API.
    } catch (error) {
      console.error("Error al enviar las notas:", error);
      // Manejar el error de acuerdo a los requisitos de tu aplicación
    }
  };

  const obtenerNotaParaEstudiante = (estudianteId) => {
    const notaEstudiante = notas.find((nota) => nota.estudianteId === estudianteId);
    return notaEstudiante ? notaEstudiante.calificacion : "";
  };

  return (
    <div className="max-w-md p-8 mx-auto mt-10 bg-purple-600 rounded-lg shadow-lg">
      {/* Dropdown para seleccionar la sección */}
      <h2 className="mb-6 text-2xl font-bold text-white">Agregar Nota:</h2>
      <div>
        <label  className="block mb-1 text-sm font-medium text-white">Selecciona una sección:</label>
        <select
          onChange={(e) => setSelectedSeccion(e.target.value)}
          value={selectedSeccion}
           className="w-full p-2 bg-white border border-purple-600 rounded-md focus:outline-none focus:ring focus:ring-purple-600"
        >
          <option value="">-- Selecciona --</option>
          {secciones.map((seccion, index) => (
            <option key={index} value={seccion.seccion}>
              {seccion.seccion}
            </option>
          ))}
        </select>
      </div>

      {/* Dropdown para seleccionar la materia */}

      <div>
        <label  className="block mb-1 text-sm font-medium text-white">Selecciona una materia:</label>
        <select value={selectedMateria} onChange={handleSelectChange}
         className="w-full p-2 bg-white border border-purple-600 rounded-md focus:outline-none focus:ring focus:ring-purple-600">
          <option value="">-- Selecciona --</option>
          {materias.map((materia, index) => (
            <option key={index} value={materia.id}>
              {materia.nombre}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label  className="block mb-1 text-sm font-medium text-white">Selecciona un periodo:</label>
        <select
          value={selectedPeriodo}
          onChange={(e) => setSelectedPeriodo(e.target.value)}
           className="w-full p-2 bg-white border border-purple-600 rounded-md focus:outline-none focus:ring focus:ring-purple-600"
        >
          <option value="">-- Selecciona --</option>
          <option value="primero">Primero</option>
          <option value="segundo">Segundo</option>
          <option value="tercero">Tercero</option>
        </select>
      </div>

      <div>
        <table className="p-4">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Apellido</th>
              <th>Nota</th>
            </tr>
          </thead>
          <tbody>
            {selectedSeccion !== "" ? (
              estudiantes.map((estudiante, index) => (
                <tr key={index}>
                  <td>{estudiante.nombre}</td>
                  <td>{estudiante.apellido1}</td>
                  <td>
                    <input
                      type="number"
                      name="nota"
                      id="nota"
                      value={obtenerNotaParaEstudiante(estudiante.id)}
                      onChange={(e) => handleNotaChange(e, estudiante.id)}
                    />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3">Seleccione una seccion para calificar.</td>
              </tr>
            )}
          </tbody>
        </table>
        <button className="w-full p-2 text-white bg-purple-300  rounded-md hover:bg-[#F7A834]  focus:outline-none focus:ring focus:ring-gray-700" onClick={handleEnviarNotas}>Enviar Notas</button>
      </div>
    </div>
  );
};

export default AddNota;
