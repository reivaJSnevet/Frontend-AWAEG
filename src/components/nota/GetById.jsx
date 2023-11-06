import { useState } from "react";
import { separador } from "../../services/separadorNotas";
import { Table, Thead, Tbody, Tr, Th, Td, Box } from "@chakra-ui/react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

const GetNotaById = () => {
  const api = useAxiosPrivate();
  const [notaId, setNotaId] = useState(""); 
  const [notas, setNotas] = useState([]); 

  const handleInputChange = (event) => {
    setNotaId(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

   
    api
      .get(`/notas/${notaId}`)
      .then((response) => {
        const notasSeparadas = separador(response.data);
        setNotas(notasSeparadas);
        console.log(notasSeparadas);
      })
      .catch((error) => {
        console.error("Error al obtener la nota por ID:", error);
        
      });
  };

  return (
    <div>
      <h2>Obtener nota por ID</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>ID del nota:</label>
          <input type="text" value={notaId} onChange={handleInputChange} />
        </div>
        <div>
          <button type="submit">Obtener nota</button>
        </div>
      </form>
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
    </div>
  );
};

export default GetNotaById;
