import React, { FunctionComponent } from "react";
import { Box, Image } from "@chakra-ui/react";
import Layout from "../../components/Layout";

const Home:FunctionComponent<{}> = () => {
    return (
        <Layout>
            <Box p="4">
                <Box>
                    <Image src='https://wallpaperaccess.com/full/354997.jpg' alt='Dan Abramov' />
                </Box>
            </Box>
        </Layout>
    );
}

export default Home;