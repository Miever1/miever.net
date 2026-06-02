import React, { FunctionComponent } from "react";
import { navigate } from "gatsby";
import { Box, Button, Section, Typography } from "miever_ui";

import MapChart from "./footprints";
import Comments from "../../components/Comments";
import { SEO } from "../../components/SEO";
import { useTranslation } from "react-i18next";
import SkillsMap from "../../components/Skills-Map";

const { Paragraph } = Typography;

const Home: FunctionComponent<{}> = () => {
    const { t } = useTranslation();

    return (
        <Box className="home">
            {/* Hero */}
            <header className="hero">
                <div className="hero-content">
                    <span className="hero-eyebrow">{t("hero_eyebrow")}</span>
                    <h1 className="hero-headline">{t("hero_headline")}</h1>
                    <p className="hero-lead">{t("hero_lead")}</p>
                    <div className="hero-actions">
                        <Button type="primary" onClick={() => navigate("/projects")}>
                            {t("cta_projects")}
                        </Button>
                        <Button onClick={() => navigate("/blogs")}>
                            {t("cta_blog")}
                        </Button>
                        <Button type="link" onClick={() => navigate("/resume")}>
                            {t("cta_resume")} →
                        </Button>
                    </div>
                </div>
                <div className="hero-portrait">
                    <img
                        className="hero-portrait-img"
                        src="https://miever.s3.ap-east-1.amazonaws.com/static/selfies.webp"
                        alt="Aerman"
                        width="1704"
                        height="1280"
                        loading="eager"
                    />
                </div>
            </header>

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
