import React, { FunctionComponent, useState } from "react";
import { Box, designs } from "miever_ui";
import { Spinner } from "@chakra-ui/react";

const Resume:FunctionComponent<{}> = () => {
    const { BRAND_COLORS } = designs;
    const [isLoaded, setIsLoaded] = useState(false);

    const handleLoad = () => {
        setIsLoaded(true);
        console.log("Iframe has finished loading!");
    };

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
            <embed
                src="https://miever.s3.ap-east-1.amazonaws.com/static/resume/miever.pdf"
                type="application/pdf"
                style={{
                    height: "100vh",
                    width: "100%",
                }}
                onLoad={handleLoad}
            />
        </Box>
    )
}

export default Resume;
