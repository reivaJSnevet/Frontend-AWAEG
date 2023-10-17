import { Link } from "react-router-dom";
import { Card, CardBody, CardFooter, Center, Heading, Image, Stack, Text, Divider, AspectRatio, Box, Flex } from '@chakra-ui/react';

const Home = () => {
  const styles = {
    imagen: {
      backgroundImage: `url('/a.jpg')`,
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover",
      backgroundPosition: "center",
      height: "60vh",
    },
  };

  return (
    <div>
    <header style={styles.imagen} className="p-2">
      <div className="container p-1 mx-auto">
        <div className="flex items-center justify-between">
          <div className="flex items-center ">
            <div className="relative -ml-32">
              <div className="top-0 left-0 mt-0 mr-4 ">
                <Link to="/">
                  <img src="/logo.png" alt="Logo SWAEG" className="h-30" />
                </Link>
              </div>
            </div>
          </div>
          <div className="flex items-center">
            <nav className="-mr-24">
              <ul className="inline-flex space-x-6">
                <li>
                  <Link to="/" className="hover:text-white p-2 hover:bg-gray-900 hover:rounded hover:border text-white text-xl">
                    Inicio
                  </Link>
                </li>
                <li>
                  <Link to="/" className="hover:text-gray-300 p-2 hover:bg-gray-900  hover:rounded hover:border text-white text-xl">
                    Sobre Nosotros
                  </Link>
                </li>
                <li>
                  <Link to="/" className="hover:text-gray-300 p-2 hover:bg-gray-900 hover:rounded hover:border text-white text-xl">
                    Estudiantes
                  </Link>
                </li>
                <li>
                  <Link to="/" className="hover:text-gray-300 p-2 hover:bg-gray-900 hover:rounded hover:border text-white text-xl">
                    Profesores
                  </Link>
                </li>
                <li>
                  <Link to="/" className="hover:text-gray-300 p-2 hover:bg-gray-900 hover:rounded hover:border text-white text-xl">
                    Administrativos
                  </Link>
                </li>
                <li>
                  <Link to="/login" className="hover:text-gray-300 p-2  hover:bg-gray-900 hover:rounded hover:border text-white text-xl">
                    Login
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </header>

    <main className=" bg-cover h-auto bg-white p-40">
    
    {/* la carta de la escuela */}
    <Card
    direction={{base: 'column', sm: 'row'}}
    overflow='hidden'
    variant='outline'
    bg='gray.900'
    mb='10'
    >
      <Image
      objectFit='cover'
      maxW={{base: '100%', sm: '40%'}}
      src="https://definicion.de/wp-content/uploads/2008/09/escuela-1.jpg"
      alt="escuela"
      />
      <Stack>
        <CardBody>
          <Center>
            <Heading fontSize='6xl' color='white' py='4'> Escuela Guayabal </Heading>
          </Center>
          <Text py='6' color='white' fontSize='xl'>Nuestras instalaciones, ubicadas en el cantón de Santa Cruz, Guanacaste, 
          han sido diseñadas con la sonrisa de nuestros estudiantes como inspiración principal. Hemos creado un espacio que los conecta con su entorno de una manera única, 
          fomentando la integración del juego y el aprendizaje mutuamente beneficioso.
          </Text>
          <Divider />
        </CardBody>
      </Stack>
    </Card>

    {/* Quienes somos */}
    <Center padding='9'>
    <Card
    direction='row'
    overflow='hidden'
    variant='outline'
    w='60%'
    mb='10'
    >
        <CardBody>
          <Center>
            <Heading fontSize='6xl' color='gray.900' py='4'> Sobre Nosotros </Heading>
          </Center>
          
          <Text  color='gray.900' fontSize='xl'>
          En AWAEG, estamos comprometidos con la mejora de la educación en la Escuela de Guayabal, en el cantón de Santa Cruz, Guanacaste.
           Nuestra misión es abordar un problema crítico que enfrenta esta querida institución: la necesidad de un sistema administrativo eficiente que simplifique 
           las tareas administrativas y mejore la comunicación entre los docentes y los padres de familia.
          </Text>
          
        </CardBody>

        <CardFooter>
          <Image 
          position='static'
          src="https://www.zarla.com/images/zarla-escuela-florece-1x1-2400x2400-20220425-3t7tktjhby39hptyb9r4.png?crop=1:1,smart&width=250&dpr=2"/>

        </CardFooter>
    </Card>
    </Center>


{/* Enfoque Educativo */}
    <Card
    direction={{base: 'column', sm: 'row'}}
    overflow='hidden'
    variant='outline'
    bg='gray.900'
    mb='10'
    >
      <Image
      objectFit='cover'
      maxW={{base: '100%', sm: '40%'}}
      src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhxAZm5rK-E9WttWOoUhEyoXWDUut-9FJJuva7T20Va7T0mownmZ_Nc3t1BN1Wkr_byJZeBIRTedauuyodKD-SZ6bMkblgXQasL_BDi4Ft4vslnywDjsKeq5M89hWjQeVG_Xw8DRS5X4qDDYDBeM6K2EHRh8sQOKH8febO8w-S24pvXMXUwBVisecd5jQ/s740/utiles.jpg"
      alt="escuela"
      />
      <Stack>
        <CardBody>
          <Center>
            <Heading fontSize='6xl' color='white' py='4'>Enfoque Educativo Integral en Nuestra Institución </Heading>
          </Center>
          <Text py='6' color='white' fontSize='xl'>En este ambiente cómodo y seguro, nuestros dedicados docentes guían a los alumnos en una emocionante aventura de aprendizaje.
           Aquí, cultivamos valores fundamentales como la responsabilidad, la humildad y el amor, que son la base para el desarrollo de habilidades personales y sociales importantes, 
           tales como la perseverancia, el manejo de emociones, la sensibilidad, el compañerismo, la creatividad, la comunicación empática y el trabajo en equipo. 
           Estas habilidades no solo fortalecen la autoconfianza de nuestros estudiantes, sino que también les preparan para liderar en el futuro.
          </Text>
          <Divider />
        </CardBody>
      </Stack>
    </Card>

    </main>


    <footer className="bg-cover h-auto bg-gray-800 text-white">
      <Flex py='20'>
        <Box w='50%'>
          <AspectRatio ratio={16/9} mx={9}>
          <iframe 
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3926.059080284865!2d-85.56947898833504!3d10.256818989819811!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8f9fcbb4f575cec9%3A0xfad83aeba0dc0896!2sEscuela%20Guayabal!5e0!3m2!1ses!2scr!4v1697520363753!5m2!1ses!2scr"
        />
          </AspectRatio>
        </Box>

        <Box w='50%'>
          <Center>
          <Text fontSize='xl' py='20' mx='20'>En esta sección, te brindamos la posibilidad de acceder a la dirección de nuestra institución de una manera sumamente conveniente y sencilla, 
            a través de la herramienta de Google Maps. Esto te permitirá encontrar nuestra ubicación de forma rápida y eficiente, facilitando enormemente tu llegada a nuestras instalaciones.
             Gracias a la integración de Google Maps en nuestro sitio web, te ofrecemos una solución efectiva para eliminar cualquier posible confusión en tu camino hacia nuestra institución.
              Ya no tendrás que preocuparte por direcciones complicadas o búsquedas infructuosas en mapas tradicionales,No importa si eres nuevo en la zona o si has visitado 
              nuestra institución antes, con esta opción, te garantizamos un acceso sencillo y directo.¡Esperamos verte pronto en nuestras instalaciones!
          </Text>
          </Center>
        </Box>

      </Flex>
      <Divider />

dadad
    </footer>
    
    </div>
  );
};

export default Home;
