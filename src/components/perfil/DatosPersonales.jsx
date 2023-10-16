import { useState, useEffect } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import useAuth from "../../hooks/useAuth";
import {
  Card,
  CardHeader,
  CardBody,
  Heading,
  Text,
  Box, // Importa el componente Box
} from "@chakra-ui/react";

function DatosPersonales() {
  const [estudiante, setEstudiante] = useState("");
  const { auth } = useAuth();
  const api = useAxiosPrivate();
  const id = 198765432;

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    console.log(auth);

    const getUsers = async () => {
      try {
        const response = await api.get(`/estudiantes/${id}`, {
          signal: controller.signal,
        });
        if (isMounted) {
          setEstudiante(response.data);
        }
      } catch (err) {
        if (isMounted) {
          console.error(err);
        }
      }
    };

    getUsers();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  return (
    <Box
      maxW="650px" // Establece el ancho máximo a 650px
    /*   minW="650px" */ // Establece el ancho mínimo a 650px
      w="100%" // Establece el ancho al 100% del contenedor padre
      className="flex flex-col items-center justify-center p-6 text-white bg-purple-600 rounded-lg shadow-lg rounded-tr-3xl"
    >
      <div className="w-full max-w-md p-6 bg-purple-400 rounded-lg shadow-md">
        <Card>
          <CardHeader>
            <Heading size="md">Datos Personales</Heading>
          </CardHeader>
          <CardBody>
            <Text className="mb-2">
              {estudiante.nombre} {estudiante.apellido1} {estudiante.apellido2}
            </Text>
            <Text className="mb-2">
              {estudiante.sexo ? "Masculino" : "Femenino"}
            </Text>
            <Text className="mb-2">
              {estudiante.fechaNacimiento} ({estudiante.edad} años)
            </Text>
            <Text className="mb-2">{estudiante.direccion}</Text>
          </CardBody>
        </Card>
      </div>
    </Box>
  );
}

export default DatosPersonales;
