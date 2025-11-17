import React, { FunctionComponent, useEffect, useState } from "react";
import { Box, Card, designs } from "miever_ui"; 
import { Spinner } from "@chakra-ui/react";

import MapChart from "./footprints";
import Comments from "../../components/Comments";
import { SEO } from "../../components/SEO";
import { useTranslation } from "react-i18next";
import SkillsMap from "../../components/Skills-Map";

const Home: FunctionComponent<{}> = () => {
    const { BRAND_COLORS } = designs;
    const { t } = useTranslation();
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            setIsLoaded(true);
        }, 500);
    }, []);

    if(!isLoaded) {
        return(
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
        )
    }

    const renderTitle = (title: string, marginBottom?: string) => {
        return (
            <Box
                flexBox
                justifyContent="center"
                style={{
                    fontSize: "32px",
                    fontWeight: 600,
                    color: BRAND_COLORS.primary,
                    marginBottom: marginBottom ? marginBottom : "12px",
                }}
            >
                {t(title)}
            </Box>
        )
    }

    return (
        <Card
            hoverable
            title={renderTitle("header_title", "0px")}
        >
            <Box>
                <p>
                    {t("header_subtitle")}
                </p>
                <p>
                    {t("about_introduction")}
                </p>
                <img
                    src="https://miever.s3.ap-east-1.amazonaws.com/static/selfies.webp"
                    alt="Aerman"
                    width="1704"    
                    height="1280"  
                    style={{ maxWidth: "100%", height: "auto", marginBottom: "12px" }}
                />
            </Box>
            <Box>
                {renderTitle("map_skills_title")}
                <p>
                    {t("skills_description")}
                </p>
                <SkillsMap />
            </Box>
            <Box>
                {renderTitle("footprints_title")}
                <p>
                    {t("footprints_description")}
                </p>
                <Box style={{ width: "100%", paddingBottom: "70%", position: "relative" }}>
                    <Box style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}>
                        <MapChart />
                    </Box>
                </Box>
            </Box>
            
            <Box>
                {renderTitle("comment_title")}
            </Box>
            <Comments />
            <Box
                style={{
                    borderTop: "1px solid var(--color-border-primary)", 
                    borderBottom: "1px solid var(--color-border-primary)",
                    padding: "24px 0", 
                    textAlign: "center" 
                }}
            >
                {t("thank_you")}
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