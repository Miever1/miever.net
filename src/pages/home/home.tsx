import React, { FunctionComponent } from "react";
import { Image } from "@chakra-ui/react";
import { Box, Card } from "miever_ui"; 
import MapChart from "./footprints";
import { SEO } from "../../components/SEO";

const Home: FunctionComponent<{}> = () => {
    return (
        <Card
            hoverable
            title="Welcome to My Personal Website!"
            style={{ width: "100%" }} 
        >
            <Box>
                <p>
                    Welcome to my little corner of the internet! This site is a reflection of my journey as a front-end engineer, where I share my personal projects, insights, and the experiences that have shaped who I am today.
                </p>
                <p>
                    As a front-end engineer, I understand the importance of having a personal website to highlight my skills and projects. I had been putting off creating mine, always busy with work and other commitments. However, as time went on, I realized it was time to change that. So here I am, finally embracing the journey of building my online presence!
                </p>
                <Image
                    src='/selfies.webp'
                    alt='Sammy Uyghur'
                    w="100%"
                    h="auto"
                    style={{ marginBottom: "12px" }}
                />
                <Box
                    style={{ fontSize: "32px", fontWeight: 600 }}
                >
                    My Footprints
                </Box>
                <p>
                    Explore my interactive map, where I've documented the places I've traveled around the globe. Each pin on this map signifies a unique story and experience that has contributed to my growth, both personally and professionally. I look forward to adding new destinations as I embark on more adventures in life!
                </p>
            </Box>
            <Box style={{ width: "100%", paddingBottom: "70%", position: "relative" }}>
                <Box style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}>
                    <MapChart />
                </Box>
            </Box>
        </Card>
    );
}

export default Home;

export const Head = () => (
    <>
      <SEO title="Home" description="Home page" pathname="/" />
    </>
);