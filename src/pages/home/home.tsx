import React, { FunctionComponent, useEffect, useState } from "react";
import { Box, Section, Typography, Spin } from "miever_ui";

import MapChart from "./footprints";
import Comments from "../../components/Comments";
import { SEO } from "../../components/SEO";
import { useTranslation } from "react-i18next";
import SkillsMap from "../../components/Skills-Map";

const { Title, Paragraph } = Typography;

const Home: FunctionComponent<{}> = () => {
    const { t } = useTranslation();
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setIsLoaded(true), 500);
        return () => clearTimeout(timer);
    }, []);

    if (!isLoaded) {
        return (
            <Box
                flexBox
                justifyContent="center"
                alignItems="center"
                style={{ minHeight: "60vh" }}
            >
                <Spin size="lg" tip={t("header_title")} />
            </Box>
        );
    }

    return (
        <Box className="home">
            {/* Hero */}
            <Box className="home-hero">
                <img
                    className="home-hero-photo"
                    src="https://miever.s3.ap-east-1.amazonaws.com/static/selfies.webp"
                    alt="Aerman"
                    width="1704"
                    height="1280"
                    loading="eager"
                />
                <Box className="home-hero-text">
                    <Title level={1} type="primary">
                        {t("header_title")}
                    </Title>
                    <Paragraph type="secondary">{t("header_subtitle")}</Paragraph>
                    <Paragraph>{t("about_introduction")}</Paragraph>
                </Box>
            </Box>

            <Section
                title={t("map_skills_title")}
                subtitle={t("skills_description")}
                align="center"
                divider
            >
                <SkillsMap />
            </Section>

            <Section
                title={t("footprints_title")}
                subtitle={t("footprints_description")}
                align="center"
                divider
            >
                <MapChart />
            </Section>

            <Section title={t("comment_title")} align="center" divider>
                <Comments />
            </Section>

            <Paragraph type="secondary" align="center" className="home-thanks">
                {t("thank_you")}
            </Paragraph>
        </Box>
    );
};

export default Home;

export const Head = () => (
    <>
        <SEO title="Home" description="Home page" pathname="/" />
    </>
);
