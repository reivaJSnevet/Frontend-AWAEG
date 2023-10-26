import { useEffect, useState } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { separador } from "../../services/separadorNotas.js";
import { Table, Thead, Tbody, Tr, Th, Td, Box } from "@chakra-ui/react";
import useAuth from "../../hooks/useAuth";

function Notas() {
  const [notas, setNotas] = useState([]);
  const api = useAxiosPrivate();
  const {auth} = useAuth();
  const estudianteId = auth?.personaId || 0;

  useEffect(() => {
    if (estudianteId) {
      api
        .get(`notas/${estudianteId}`)
        .then((response) => {
          const notasSeparadas = separador(response.data);
          setNotas(notasSeparadas);
        })
        .catch((error) => {
          console.error("Error al obtener las notas:", error);
        });
    } else {
      console.error("EstId no encontrado en el localStorage");
    }
  }, []);

  return (
    <Box
      maxW="650px" // Establece el ancho máximo a 650px
        /* minW="650px" */ // Establece el ancho mínimo a 650px
      w="100%" // Establece el ancho al 100% del contenedor padre
      fontSize={{ base: "12px", md: "12px", lg: "15px" }}
      className="flex flex-col items-center justify-center p-6 text-black rounded-lg shadow-lg rounded-tr-3xl"
    >
      <div className="bg-purple-200 rounded-md shadow-xl p-7">
        <Table variant="striped" colorScheme="purple.500" size={{md:"md", lg:"lg"}}>
          <Thead>
            <Tr>
              <Th>Materia</Th>
              <Th>Primero</Th>
              <Th>Segundo</Th>
              <Th>Tercero</Th>
            </Tr>
          </Thead>
          <Tbody>
            {Object.keys(notas).map((materia) => (
              <Tr key={materia}>
                <Td>{materia}</Td>
                <Td>
                  {notas[materia].primero && notas[materia].primero.length > 0
                    ? notas[materia].primero.map((nota) => (
                        <span
                          key={nota.id}
                          className="p-1 mr-2 text-black rounded"
                        >
                          {nota.calificacion}
                        </span>
                      ))
                    : "NR"}
                </Td>
                <Td>
                  {notas[materia].segundo && notas[materia].segundo.length > 0
                    ? notas[materia].segundo.map((nota) => (
                        <span
                          key={nota.id}
                          className="p-1 mr-2 text-black rounded "
                        >
                          {nota.calificacion}
                        </span>
                      ))
                    : "NR"}
                </Td>
                <Td>
                  {notas[materia].tercero && notas[materia].tercero.length > 0
                    ? notas[materia].tercero.map((nota) => (
                        <span
                          key={nota.id}
                          className="p-1 mr-2 text-black rounded"
                        >
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
    </Box>
  );
}

export default Notas;
