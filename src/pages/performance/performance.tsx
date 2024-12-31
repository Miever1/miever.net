import React, { FunctionComponent, useState } from "react";
import { Box, designs } from "miever_ui";
import { Spinner } from "@chakra-ui/react";

const Performance: FunctionComponent<{}> = () => {
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
            <iframe
                width="100%"
                style={{
                    opacity: ".9",
                    height: "100vh"
                }}
                onLoad={handleLoad}
                src="https://lighthouse-report.miever.net/"
            />
        </Box>
    )
}

export default Performance;