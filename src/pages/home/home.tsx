import React, { FunctionComponent } from "react";
import { Image } from "@chakra-ui/react";
import { Box } from "miever_ui";

const Home:FunctionComponent<{}> = () => {
    return (
        <Box>
            <Image src='https://wallpaperaccess.com/full/354997.jpg' alt='Dan Abramov' />
        </Box>
    );
}

export default Home;