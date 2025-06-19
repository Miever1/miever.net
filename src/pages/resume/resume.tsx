import React, { FunctionComponent, useState, useEffect } from "react";
import { Box, designs } from "miever_ui";
import { Spinner } from "@chakra-ui/react";

import Comments from "../../components/Comments";

const Resume: FunctionComponent<{}> = () => {
    const { BRAND_COLORS } = designs;
    const [isLoaded, setIsLoaded] = useState(false);

    const handleLoad = () => {
        setIsLoaded(true);
        console.log("Iframe has finished loading!");
    };

    useEffect(() => {
        const timeout = setTimeout(() => {
            if (!isLoaded) {
                console.warn("Iframe loading timeout, removing spinner.");
                setIsLoaded(true);
            }
        }, 5000);

        return () => clearTimeout(timeout);
    }, [isLoaded]);

    return (
        <Box style={{ width: "100%", height: "100%", position: "relative" }}>
            {!isLoaded && (
                <Box
                    style={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        zIndex: 10,
                    }}
                >
                    <Spinner size="xl" color={BRAND_COLORS.primary} />
                </Box>
            )}
            <iframe
                src="https://docs.google.com/viewer?url=https://miever.s3.ap-east-1.amazonaws.com/static/resume/miever.pdf&embedded=true"
                style={{
                    height: "100vh",
                    width: "100%",
                    border: "none",
                }}
                onLoad={handleLoad}
                onError={() => console.error("Iframe failed to load")}
                title="PDF Viewer"
            />
            <Box paddingY={16}>
                <Comments reactionsEnabled="0" />
            </Box>
        </Box>
    );
};

export default Resume;