import React, { FunctionComponent } from "react";
import { Box, Card } from "miever_ui"; 
import MapChart from "./footprints";
import { SEO } from "../../components/SEO";
import { useTranslation } from "react-i18next";

const Home: FunctionComponent<{}> = () => {
    const { t } = useTranslation();
    return (
        <Card
            hoverable
            title={t("header_title")}
            style={{ width: "100%" }} 
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
                <Box
                    style={{ fontSize: "32px", fontWeight: 600 }}
                >
                    {t("footprints_title")}
                </Box>
                <p>
                    {t("footprints_description")}
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