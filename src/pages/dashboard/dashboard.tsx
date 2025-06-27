import React, { useState, useEffect } from "react";
import { Box, designs } from "miever_ui";
import { Spinner } from "@chakra-ui/react";
import { useTheme } from "../../components/Theme-Context";

export default function Dashboard() {
    const { BRAND_COLORS } = designs;
    const [isLoaded, setIsLoaded] = useState(false);
    const [iframeKey, setIframeKey] = useState(0);
    const { currentTheme } = useTheme();
    
    const dataDogPath = `https://p.us5.datadoghq.com/sb/071388bc-8801-11ed-9d34-da7ad0900005-e2ef47e4eb064ee8bd7652bc58a9a0f5?fromUser=false&refresh_mode=sliding&theme=${currentTheme}&tpl_var_applicationId%5B0%5D=%2A&tpl_var_browser%5B0%5D=%2A&tpl_var_country%5B0%5D=%2A&tpl_var_device%5B0%5D=%2A&tpl_var_env%5B0%5D=%2A&tpl_var_OS%5B0%5D=%2A&tpl_var_service%5B0%5D=%2A&tpl_var_sessionType%5B0%5D=user&tpl_var_version%5B0%5D=%2A&from_ts=1743181369746&to_ts=1750957369746&live=true`;

    useEffect(() => {
        setIsLoaded(false);
        setIframeKey(prev => prev + 1);
    }, [currentTheme]);

    const handleLoad = () => {
        setTimeout(() => {
            setIsLoaded(true);
        }, 2000);
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
                key={iframeKey}
                width="100%"
                height="100%"
                onLoad={handleLoad}
                style={{
                    opacity: isLoaded ? "1" : "0",
                    transition: "opacity 0.3s ease",
                }}
                src={dataDogPath}
            />
        </Box>
    );
}
