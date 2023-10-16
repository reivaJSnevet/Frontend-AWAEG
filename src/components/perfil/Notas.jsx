import { useEffect, useState } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { separador } from "../../services/separadorNotas.js";
import { Table, Thead, Tbody, Tr, Th, Td } from "@chakra-ui/react";

function Notas() {
  const [notas, setNotas] = useState([]);
  const api = useAxiosPrivate();

  useEffect(() => {
    const estudianteId = 198765432;

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
    <div className="p-8 bg-purple-500">
      <Table variant="striped" colorScheme="yellow">
        <Thead>
          <Tr>
            <Th>Materia</Th>
            <Th>Primero</Th>
            <Th>Segundo</Th>
            <Th>Tercero</Th>
          </Tr>
        </Thead>
        <Tbody>
          {Object.keys(notas).map(materia => (
            <Tr key={materia}>
              <Td>{materia}</Td>
              <Td>
                {notas[materia].primero && notas[materia].primero.length > 0
                  ? notas[materia].primero.map(nota => (
                      <span key={nota.id} className="p-1 mr-2 text-white bg-yellow-500 rounded">
                        {nota.calificacion}
                      </span>
                    ))
                  : "NR"}
              </Td>
              <Td>
                {notas[materia].segundo && notas[materia].segundo.length > 0
                  ? notas[materia].segundo.map(nota => (
                      <span key={nota.id} className="p-1 mr-2 text-white bg-yellow-500 rounded ">
                        {nota.calificacion}
                      </span>
                    ))
                  : "NR"}
              </Td>
              <Td>
                {notas[materia].tercero && notas[materia].tercero.length > 0
                  ? notas[materia].tercero.map(nota => (
                      <span key={nota.id} className="p-1 mr-2 text-white bg-yellow-500 rounded">
                        {nota.calificacion}
                      </span>
                    ))
                  : "NR"}
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </div>
  );
}

export default Notas;
