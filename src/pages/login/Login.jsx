import { useState } from "react";
import api from "../../services/api.config.js";
import { useNavigate } from "react-router-dom";
import {
  Grid,
  GridItem,
  Heading,
  FormControl,
  FormLabel,
  FormHelperText,
  Checkbox,
  Button,
} from "@chakra-ui/react";

const Login = () => {
  const [formData, setFormData] = useState({
    correo: "",
    contraseña: "",
  });
  const navigate = useNavigate();

  const { correo, contraseña } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form submitted", correo, contraseña);
    try {
      const response = await api.post("/auth/login", { correo, contraseña });

      const { token, usuario } = response.data;
      const { role, id } = usuario;

      localStorage.setItem("token", token); // Store token in local storage
      localStorage.setItem("userId", id); // Almacena el ID del usuario en el local storage

      // Redirect user based on their role
      if (role.nombre === "Estudiante") {
        navigate("/perfil");
      } else if (role.nombre === "Director" || role.nombre === "Maestra") {
        navigate("/admin");
      }
    } catch (error) {
      console.error("Login error", error);
      // Handle login error (e.g., show an error message)
    }
    console.log("Form submitted");
  };

  return (
    <Grid
      templateAreas={`"Main Rest"`}
      gridTemplateColumns={"1fr 2fr"} // Utilizamos unidades flexibles para las columnas
      w="100vw"
      h="100vh"
      color="black.900"
      fontWeight="bold"
    >
      <GridItem
        pl="2"
        bg="purple.600"
        area={"Main"}
        className="flex flex-col items-center justify-center "
      >
        <Heading fontSize="5xl" className="mb-4">
          Bienvenido
        </Heading>
        <div fontSize="3xl" className="mb-6">
          Inicia Sesión con tu cuenta
        </div>

        <FormControl
          onSubmit={handleSubmit}
          className="flex flex-col items-center justify-center "
        >
          <FormLabel color={"blackAlpha.900"}>Correo Electrónico:</FormLabel>
          <input
            id="email-address"
            name="correo"
            type="email"
            placeholder="Escriba su correo electrónico"
            size="md"
            value={correo}
            onChange={handleChange}
          />
          <FormHelperText color={"blackAlpha.900"}>
            Ejemplo: correo@gmail.com
          </FormHelperText>

          <FormLabel color={"blackAlpha.900"}>Contraseña:</FormLabel>
          <input
            id="contraseña"
            name="contraseña"
            type="password"
            placeholder="Escriba su contraseña"
            size="md"
            value={contraseña}
            onChange={handleChange}
          />
          <FormHelperText color={"blackAlpha.900"}>
            Debe contener al menos 8 caracteres
          </FormHelperText>

          <Checkbox className="mb-6">Mostrar Contraseña</Checkbox>

          <Button type="submit" bg="gray.300" onClick={handleSubmit}>
            Iniciar Seción
          </Button>
        </FormControl>
      </GridItem>

      <GridItem
        pl="2"
        area={"Rest"}
        style={{
          backgroundImage:
            "url(https://images.alphacoders.com/109/1091572.png)",
          backgroundSize: "cover", // La imagen de fondo cubrirá todo el elemento
          backgroundPosition: "center center", // La imagen de fondo se centrará
          backgroundRepeat: "no-repeat", // Evita la repetición de la imagen de fondo
        }}
      >
        <div className="flex flex-col items-center justify-center h-full p-6"></div>
      </GridItem>
    </Grid>
  );
};

export default Login;
