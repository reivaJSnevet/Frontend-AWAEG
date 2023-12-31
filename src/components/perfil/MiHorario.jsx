import { useEffect, useState } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { convertirANumeroRomano } from "../../services/conversores.js";
import useAuth from "../../hooks/useAuth";

function Horario() {
  const api = useAxiosPrivate();
  const [horario, setHorario] = useState([]);
  const {auth} = useAuth();

  useEffect(() => {
    const fetchData = async () => {
        try {
            const response = await api.get(`estudiantes/horario/${auth.personaId}`);
            console.log(response.data);
            const horario = response.data[0];
            setHorario(horario);
        } catch (error) {
            console.error("Error fetching data: ", error);
        }
    };

    fetchData();
}, []);

  const renderizarTabla = () => {
    const filas = [];

    [...Array(7).keys()].forEach((index) => {
      const horaInicio = horario.lunes?.[index]?.horaInicio ?? "";
      const horaSalida = horario.lunes?.[index]?.horaSalida ?? "";

      filas.push(
        <tr key={filas.length * 2}>
          <td className="px-2 py-1 text-xs border border-purple-300 border-solid">{`${horaInicio} - ${horaSalida}`}</td>
          <td className="px-2 py-1 text-xs border border-purple-300 border-solid">{convertirANumeroRomano(index + 1)}</td>
          <td className="px-2 py-1 text-xs border border-purple-300 border-solid">{renderizarClase("lunes", index)}</td>
          <td className="px-2 py-1 text-xs border border-purple-300 border-solid">{renderizarClase("martes", index)}</td>
          <td className="px-2 py-1 text-xs border border-purple-300 border-solid">{renderizarClase("miercoles", index)}</td>
          <td className="px-2 py-1 text-xs border border-purple-300 border-solid">{renderizarClase("jueves", index)}</td>
          <td className="px-2 py-1 text-xs border border-purple-300 border-solid">{renderizarClase("viernes", index)}</td>
        </tr>
      );

      // Agrega la fila de RECREO después de cada dos filas regulares
      if ((filas.length + 1) % 3 === 0) {
        filas.push(
          <tr key={`${filas.length * 2}-recreo`}>
            <td colSpan="7" className="px-2 py-1 text-xs text-center text-black bg-white border border-purple-300 border-solid">RECREO</td>
          </tr>
        );
      }
    });

    return (
      <table className="w-full text-center shadow-md">
        <thead>
          <tr>
            <th className="px-2 py-2 text-xs font-extrabold border border-purple-300 border-solid ">Hora</th>
            <th className="px-2 py-2 text-xs font-extrabold border border-purple-300 border-solid">Lección</th>
            <th className="px-2 py-2 text-xs font-extrabold border border-purple-300 border-solid">Lunes</th>
            <th className="px-2 py-2 text-xs font-extrabold border border-purple-300 border-solid">Martes</th>
            <th className="px-2 py-2 text-xs font-extrabold border border-purple-300 border-solid">Miércoles</th>
            <th className="px-2 py-2 text-xs font-extrabold border border-purple-300 border-solid">Jueves</th>
            <th className="px-2 py-2 text-xs font-extrabold border border-purple-300 border-solid">Viernes</th>
          </tr>
        </thead>
        <tbody>{filas}</tbody>
      </table>
    );
  };

  const renderizarClase = (dia, index) => {
    if (horario[dia] && horario[dia][index]) {
      const clase = horario[dia][index];
      return `${clase.materia}`;
    } else {
      return "";
    }
  };

  return (
    <div className="pt-4 pb-14 px-4 text-black bg-purple-400 rounded-2xl min-w-[650px] grid grid-row-2 shadow-xl">
      <h2 className="row-span-1 mb-2 text-lg font-bold">Horario de Clases</h2>
      <div className="row-span-1 bg-purple-200">
        {renderizarTabla()}
      </div>
    </div>
  );
}

export default Horario;
