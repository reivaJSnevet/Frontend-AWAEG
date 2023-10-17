import { Link } from "react-router-dom";
import React, { useState } from "react";
import {
  Flex,
  Divider,
  Avatar,
  Heading,
  Text,
  IconButton,
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import NavItem from "./navItem";
import {
  GrConfigure,
  GrUser,
  GrUserWorker,
  GrGroup,
  GrSchedules,
  GrBook,
} from "react-icons/gr";
import { PiStudent } from "react-icons/pi";
import { MdOutlineClass } from "react-icons/md";
import { VscFileSubmodule } from "react-icons/vsc";
import { CgProfile } from "react-icons/cg";
import useLogout from "../../hooks/useLogout";

function Sidebar() {
  const [navSize, changeNavSize] = useState("large");
  
  const signOut = async () => {
        await logout();
        navigate("/login");
  }
  
  return (
    <Flex
      className=""
      pos="sticky"
      left="5"
      h="100vh"
      boxShadow="0 4px 12px 0 rgba(0,0,0,0.05)"
      w={navSize === "small" ? "75px" : "200px"}
      flexDir="column"
      justifyContent="space-between"
      bg="purple.500"
    >
      <Flex
        p="5%"
        flexDir="column"
        alignItems={navSize == "small" ? "center" : "flex-start"}
        as={"nav"}
      >
        <IconButton
          bg="none"
          mt={5}
          _hover={{ bg: "none" }}
          icon={<HamburgerIcon color="whiteAlpha.900" />}
          onClick={() => {
            if (navSize === "small") changeNavSize("large");
            else changeNavSize("small");
          }}
        />
        <Link to="roles">
          <NavItem  navSize={navSize} icon={GrConfigure} title="Roles" />
        </Link>

        <Link to="usuarios">
          <NavItem navSize={navSize} icon={GrUser} title="Usuarios" />
        </Link>

        <Link to="funcionarios">
          <NavItem navSize={navSize} icon={GrUserWorker} title="Funcionarios" />
        </Link>

        <Link to="estudiantes">
          <NavItem navSize={navSize} icon={PiStudent} title="Estudiantes" />
        </Link>

        <Link to="grupos">
          <NavItem navSize={navSize} icon={GrGroup} title="Grupos" />
        </Link>

        <Link to="horarios">
          <NavItem navSize={navSize} icon={GrSchedules} title="Horarios" />
        </Link>

        <Link to="clases">
          <NavItem navSize={navSize} icon={MdOutlineClass} title="Clases" />
        </Link>

        <Link to="notas">
          <NavItem navSize={navSize} icon={GrBook} title="Notas" />
        </Link>

        <Link to="archivos">
          <NavItem navSize={navSize} icon={VscFileSubmodule} title="Archivos" />
        </Link>

        <Link to="/perfil">
          <NavItem navSize={navSize} icon={CgProfile} title="Perfil" />
        </Link>
        <div>
            <button onClick={signOut}>Cerrar sesión</button>
        </div>
      </Flex>

      <Flex
        p="5%"
        flexDir="column"
        w="100%"
        alignItems={navSize == "small" ? "center" : "flex-start"}
        mb={4}
      >
        <Divider display={navSize == "small" ? "none" : "flex"} />
        <Flex mt={4} align="center">

          <Avatar
            size="sm"
            src="https://images.vexels.com/media/users/3/152802/isolated/preview/4a12178b4182569cfb402bd969ff4965-icono-de-edificio-de-escuela-clasica.png"
          />
          <Flex
            flexDir="column"
            ml={4}
            display={navSize == "small" ? "none" : "flex"}
          >
            <Heading as="h3" size="sm" color="white">
              Sistema Administrativo de la Escuela Guayabal
            </Heading>
            <Text color="gray.800">AWAEG</Text>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
}

export default Sidebar;
