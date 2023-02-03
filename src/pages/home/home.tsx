import React, { FunctionComponent } from "react";
import { Image } from "@chakra-ui/react";
import { Box } from "miever_ui";

import Blogs from "../blogs";
import { SEO } from "../../components/SEO"

const Home:FunctionComponent<{}> = () => {
    return (
        <Box>
            <Box>
                <Box
                    style={{ fontSize: "32px", fontWeight: 600 }}
                    paddingY={4}
                >
                    Welcome to my personal website!
                </Box>
                <p>
                    Everyone needs their own little spot on the interwebs, and this is mine.
                </p>
                <p>
                    As a Front-end engineer, a descent personal website is required! It's been a long time that I want to build a personal website, but I always delay it because of some excuses, busy work for example.When it comes to the end of 2022, I realized that i need change. As you see, I'm changing.
                </p>
            </Box>
            <Image
                src='/selfies.webp'
                alt='Sammy Uyghur'
                w="100%"
                style={{ marginBottom: "12px" }}
            />
            <Blogs />
        </Box>
    );
}

export default Home;

export const Head = () => (
    <>
      <SEO title="Home" description="Home page" pathname="/" />
    </>
);