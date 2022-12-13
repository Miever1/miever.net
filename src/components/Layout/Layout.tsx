import React, { FunctionComponent, ReactElement } from "react";
import { Container, Box } from "@chakra-ui/react"

// custom
import Header from "../Header";

const Layout: FunctionComponent<{
    children: ReactElement
}> = ({ children }) => {
    return (
        <Box
            bg="#000"
            minH="100vh"
            color="var(--chakra-colors-purple-300)"
        >
            <Header />
            <Container maxW='container.lg' px={20} py={4}>
                {children}
            </Container>
        </Box>
    );
}

export default Layout;