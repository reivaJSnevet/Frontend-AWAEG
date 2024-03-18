import { useState, useEffect } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import useAuth from "../../hooks/useAuth";

function ListAllCitas() {
  const api = useAxiosPrivate();
  const { auth } = useAuth();
  const rol = auth.roleArray[0];
  const [citas, setCitas] = useState([]);
  const [misCitas, setMisCitas] = useState([]);

  const handleSolicitarCita = async (citaId) => {
    try {
      const citaActual = citas.find((cita) => cita.id === citaId);

      const citaActualizada = {
        ...citaActual,
        estudianteId: auth.personaId,
      };

      await api.put(`/citas/${citaId}`, citaActualizada);

      const fetchMisCitas = async () => {
        const response = await api.get(`/citas/${auth.personaId}`);
        setMisCitas(response.data);
      };

      const fetchCitas = async () => {
        let apiUrl = "";

        if (rol === "Director") {
          apiUrl = "/citas";
        } else if (rol === "Estudiante") {
          apiUrl = "/citasLibres";
        }

        const response = await api.get(apiUrl);
        setCitas(response.data);
      };

      fetchMisCitas();
      fetchCitas();
    } catch (error) {
      console.error("Error al solicitar la cita:", error);
    }
  };

  useEffect(() => {
    try {
      const fetchMisCitas = async () => {
        const response = await api.get(`/citas/${auth.personaId}`);
        setMisCitas(response.data);
      };
      const fetchCitas = async () => {
        let apiUrl = "";

        if (rol === "Director") {
          apiUrl = "/citas";
        } else if (rol === "Estudiante") {
          apiUrl = "/citasLibres";
        }

        const response = await api.get(apiUrl);
        setCitas(response.data);
      };

      fetchCitas();
      fetchMisCitas();
    } catch (error) {
      console.log(error);
    }
  }, [rol, api, auth.personaId]);

  return (
    <div className="p-4 bg-slate-200 rounded-lg shadow-lg md:p-8">
      <div className="flex flex-col md:flex-row">
        <div className="order-1 w-full p-4 overflow-x-auto bg-purple-600 rounded md:w-1/2 md:order-1 md:rounded-l-none">
          <h2 className="mb-4 text-lg font-semibold text-white">
            Listado de Citas
          </h2>
          <table className="w-full mb-4">
            <thead>
              <tr>
                <th>Fecha y Hora</th>
                <th>Asunto</th>
                <th>Duración</th>
                <th>Ubicación</th>
                <th>Funcionario ID</th>
                {rol === "Estudiante" && <th>Solicitar Cita</th>}
              </tr>
            </thead>
            <tbody>
              {citas.map((cita) => (
                <tr key={cita.id}>
                  <td>{cita.dia}</td>
                  <td>{cita.asunto}</td>
                  <td>{cita.duracion}</td>
                  <td>{cita.ubicacion}</td>
                  <td>{cita.funcionarioId}</td>
                  {rol === "Estudiante" && (
                    <td>
                      <button onClick={() => handleSolicitarCita(cita.id)} className="w-full p-2 text-white bg-purple-300  rounded-md hover:bg-[#F7A834]  focus:outline-none focus:ring focus:ring-gray-700">
                        Solicitar Cita
                      </button>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="order-2 w-full p-4 mt-4 overflow-x-auto bg-white rounded md:w-1/2 md:order-2 md:rounded-r-none md:mt-0">
          <h2 className="mb-4 text-lg font-semibold text-slate-950">
            Mis Citas
          </h2>
          <table className="w-full text-purple-600">
            <thead>
              <tr>
                <th>Fecha y Hora</th>
                <th>Asunto</th>
                <th>Duración</th>
                <th>Ubicación</th>
                <th>Funcionario ID</th>
              </tr>
            </thead>
            <tbody>
              {misCitas.map((cita) => (
                <tr key={cita.id}>
                  <td>{cita.dia}</td>
                  <td>{cita.asunto}</td>
                  <td>{cita.duracion}</td>
                  <td>{cita.ubicacion}</td>
                  <td>{cita.funcionarioId}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default ListAllCitas;
