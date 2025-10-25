import React, { useState, useCallback, useMemo, useEffect } from "react";
import { Box, designs } from "miever_ui";
import { Spinner } from "@chakra-ui/react";
import { useTheme } from "../../components/Theme-Context";

const Performance: React.FC = () => {
    const { BRAND_COLORS } = designs;
    const { resolvedTheme } = useTheme();
    const [isLoaded, setIsLoaded] = useState(false);
    const lighthousePath = useMemo(() => 
        resolvedTheme === "dark" 
            ? "https://dark-mode-lighthouse-report.miever.net/" 
            : "https://lighthouse-report.miever.net/",
        [resolvedTheme]
    );


    useEffect(() => {
        setIsLoaded(false);
    }, [lighthousePath]);

    const handleLoad = useCallback(() => {
        setIsLoaded(true);
        console.log("Iframe has finished loading!");
    }, []);

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
                key={lighthousePath}
                width="100%"
                style={{
                    opacity: isLoaded ? 1 : 0.3,
                    transition: "opacity 0.3s ease-in-out",
                    height: "100vh"
                }}
                onLoad={handleLoad}
                src={lighthousePath}
                title="Lighthouse Performance Report"
            />
        </Box>
    );
};

export default Performance;
