import { useEffect, useState } from "react";
import api from "../../services/api.config.js";
import { separador } from "../../services/separadorNotas.js";

function Notas() {
  const [notas, setNotas] = useState([]);

  useEffect(() => {
    const estudianteId = localStorage.getItem("EstId");

    if (estudianteId) {
      api.get(`notas/${estudianteId}`)
        .then(response => {
          const notasSeparadas = separador(response.data);
          setNotas(notasSeparadas);
        })
        .catch(error => {
          console.error("Error al obtener las notas:", error);
        });
    } else {
      console.error("EstId no encontrado en el localStorage");
    }
  }, []);

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Materia</th>
            <th>Primero</th>
            <th>Segundo</th>
            <th>Tercero</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(notas).map(materia => (
            <tr key={materia}>
              <td>{materia}</td>
              <td>
                {notas[materia].primero && notas[materia].primero.length > 0
                  ? notas[materia].primero.map(nota => (
                      <span key={nota.id}>{nota.calificacion}</span>
                    ))
                  : "NR"}
              </td>
              <td>
                {notas[materia].segundo && notas[materia].segundo.length > 0
                  ? notas[materia].segundo.map(nota => (
                      <span key={nota.id}>{nota.calificacion}</span>
                    ))
                  : "NR"}
              </td>
              <td>
                {notas[materia].tercero && notas[materia].tercero.length > 0
                  ? notas[materia].tercero.map(nota => (
                      <span key={nota.id}>{nota.calificacion}</span>
                    ))
                  : "NR"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Notas;
