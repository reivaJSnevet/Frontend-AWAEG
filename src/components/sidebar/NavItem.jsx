import React from "react";
import { Flex, Menu, Icon, Text, Link, MenuButton, MenuList } from "@chakra-ui/react";


export default function NavItem( {navSize, title, icon, active}) {
    return (
        <Flex
        mt={30}
        flexDir="column"
        w="100%"
        alignItems={navSize == "small" ? "center" : "flex-start"}
    >
        <Menu placement="right">
            <Link
           backgroundColor={active && "#AEC8CA"}
           p={3}
           borderRadius={8}
           _hover={{ textDecor: 'none', backgroundColor: "#AEC8CA" }}
           w={navSize == "large" && "100%"}
           >
                <MenuButton w="100%">
                        <Flex>
                            <Icon as={icon} fontSize="xl"/>
                            <Text ml={5} display={navSize == "small" ? "none" : "flex"}>{title}</Text>
                        </Flex>
                </MenuButton>
            </Link>
            <MenuList
              py={0}
              border="none"
              w={200}
              h={200}
              ml={5}>
                
            </MenuList>
        </Menu>

       </Flex>
    )
}