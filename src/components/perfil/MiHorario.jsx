import React, { useEffect, useState } from "react";
import api from "../../services/api.config.js";
import { convertirAFormato12Horas } from "../../services/conversores.js";

function Horario() {
  const seccion = "1-1";
  const [horarioData, setHorarioData] = useState(null);

  useEffect(() => {
    const fetchHorario = async () => {
      try {
        const response = await api.get(`grupos/${seccion}`);
        setHorarioData(response.data.horario.clases);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchHorario();
  }, [seccion]);

  const renderHorario = () => {
    if (!horarioData) {
      return <p>Cargando...</p>;
    }

    let counter = 0;

    return (
      <table>
        <thead>
          <tr>
            <th>Hora</th>
            <th>Lección</th>
            <th>Lunes</th>
            <th>Martes</th>
            <th>Miércoles</th>
            <th>Jueves</th>
            <th>Viernes</th>
          </tr>
        </thead>
        <tbody>
          {horarioData.map((clase) => {
            counter++;
            if (counter % 3 === 0) {
              return (
                <React.Fragment key={counter}>
                  <tr>
                    <td>Recreo</td>
                    <td>Recreo</td>
                    <td>Recreo</td>
                    <td>Recreo</td>
                    <td>Recreo</td>
                    <td>Recreo</td>
                    <td>Recreo</td>
                  </tr>
                  <tr key={clase.id}>
                    <td>{`${convertirAFormato12Horas(clase.horaInicio)}-${convertirAFormato12Horas(clase.horaSalida)}`}</td>
                    <td>{clase.leccion}</td>
                    <td>{clase.dia === "lunes" ? clase.materia.nombre : "LIBRE"}</td>
                    <td>{clase.dia === "martes" ? clase.materia.nombre : "LIBRE"}</td>
                    <td>{clase.dia === "miércoles" ? clase.materia.nombre : "LIBRE"}</td>
                    <td>{clase.dia === "jueves" ? clase.materia.nombre : "LIBRE"}</td>
                    <td>{clase.dia === "viernes" ? clase.materia.nombre : "LIBRE"}</td>
                  </tr>
                </React.Fragment>
              );
            } else {
              return (
                <tr key={clase.id}>
                  <td>{`${convertirAFormato12Horas(clase.horaInicio)}-${convertirAFormato12Horas(clase.horaSalida)}`}</td>
                  <td>{clase.leccion}</td>
                  <td>{clase.dia === "lunes" ? clase.materia.nombre : "LIBRE"}</td>
                  <td>{clase.dia === "martes" ? clase.materia.nombre : "LIBRE"}</td>
                  <td>{clase.dia === "miércoles" ? clase.materia.nombre : "LIBRE"}</td>
                  <td>{clase.dia === "jueves" ? clase.materia.nombre : "LIBRE"}</td>
                  <td>{clase.dia === "viernes" ? clase.materia.nombre : "LIBRE"}</td>
                </tr>
              );
            }
          })}
        </tbody>
      </table>
    );
  };

  return (
    <div>
      <h2>Horario de Clases</h2>
      {renderHorario()}
    </div>
  );
}

export default Horario;
