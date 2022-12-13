import React, { FunctionComponent } from "react";
import { Menu, MenuItem, Box, Container, Link } from "@chakra-ui/react";
import { navigate } from "gatsby"

export type MenuKeys = "home" | "blogs" | "projects" | "resume";

const Header:FunctionComponent<{}> = () => {
    const menuList: MenuKeys[] = ["home", "blogs", "resume"];
    return (
        <Box p="2" bg="rgba(23,23,23,.8)">
            <Menu>
                <Container display="flex" maxW='container.lg'>
                    {menuList.map(item => {
                        return (
                            <MenuItem
                                flex={1}
                                key={item}
                                onClick={() => navigate(item === "home" ? "/" : `/${item}`)}
                            >
                                <Link>
                                    {item.toLowerCase().replace(/( |^)[a-z]/g, (L) => L.toUpperCase())}
                                </Link>
                            </MenuItem>
                        );
                    })}
                </Container>
            </Menu>
        </Box>
    );
}

export default Header;