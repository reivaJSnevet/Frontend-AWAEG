import { Flex, Menu, Icon, Text, MenuButton, MenuList } from "@chakra-ui/react";

export default function NavItem({ navSize, title, icon, active }) {
  return (
    <Flex
      mt={30}
      flexDir="column"
      w="100%"
      alignItems={navSize === "small" ? "center" : "flex-start"}
    >
      <Menu placement="right">
        <div
          style={{
            backgroundColor: active && "#AEC8CA",
            padding: "0.75rem",
            borderRadius: "8px",
            width: navSize === "large" ? "100%" : "auto",
          }}
         /*  hover={{ textDecoration: "none", backgroundColor: "#AEC8CA" }} */
        >
          <MenuButton w="100%">
            <Flex>
              <Icon as={icon} fontSize="xl" />
              <Text ml={5} display={navSize === "small" ? "none" : "flex"}>
                {title}
              </Text>
            </Flex>
          </MenuButton>
        </div>
        <MenuList py={0} border="none" w={200} h={200} ml={5}></MenuList>
      </Menu>
    </Flex>
  );
}
