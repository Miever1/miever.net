import React, { FunctionComponent, ReactNode } from "react";
import { navigate } from "gatsby";
import { StaticImage } from "gatsby-plugin-image";
import { Box, Button, Typography } from "miever_ui";
import { BackToTop } from "../../components/ReadingAids";

import MapChart from "./footprints";
import Now from "../../components/Now";
import Connect from "../../components/Connect";
import { SEO } from "../../components/SEO";
import { useTranslation } from "react-i18next";
import SkillsMap from "../../components/Skills-Map";
import { useInView } from "../../components/useInView";

const { Title, Paragraph, Text } = Typography;

/** A numbered, left-aligned editorial section header used across the home page. */
const HomeSection: FunctionComponent<{
    index: string;
    title: ReactNode;
    subtitle?: ReactNode;
    children: ReactNode;
}> = ({ index, title, subtitle, children }) => {
    const [ref, inView] = useInView<HTMLElement>();
    return (
    <section ref={ref} className={`home-section reveal${inView ? " is-in" : ""}`}>
        <Box className="home-section-head">
            <Text className="home-section-index">{index}</Text>
            <Box className="home-section-heading">
                <Title level={2} className="home-section-title">{title}</Title>
                {subtitle && <Paragraph type="secondary" className="home-section-sub">{subtitle}</Paragraph>}
            </Box>
        </Box>
        {children}
    </section>
    );
};

const Home: FunctionComponent<{}> = () => {
    const { t } = useTranslation();
    const [statsRef, statsIn] = useInView<HTMLDivElement>();

    return (
        <Box className="home">
            {/* Hero */}
            <header className="hero">
                <Box className="hero-content">
                    <Title level={1} className="hero-headline">{t("hero_headline")}</Title>
                    <Paragraph type="secondary" className="hero-lead">{t("hero_lead")}</Paragraph>
                    <Box className="hero-actions">
                        <Button type="primary" onClick={() => navigate("/projects")}>
                            {t("cta_projects")}
                        </Button>
                        <Button onClick={() => navigate("/blogs")}>
                            {t("cta_blog")}
                        </Button>
                        <Button type="link" onClick={() => navigate("/resume")}>
                            {t("cta_resume")} →
                        </Button>
                    </Box>
                </Box>
                {/* Decorative, purely typographic/geometric panel. aria-hidden:
                    no information lives here, it just gives the hero a balanced
                    right side. CSS-only so it themes and scales for free. */}
                <div className="hero-visual">
                    <div className="hero-visual-photo">
                        <StaticImage
                            src="https://miever.s3.ap-east-1.amazonaws.com/static/footprints/Frankfurt.webp"
                            alt="Aerman in Frankfurt"
                            loading="eager"
                            placeholder="blurred"
                            layout="constrained"
                            width={500}
                            style={{ width: "100%", height: "100%" }}
                            imgStyle={{ objectFit: "cover" }}
                        />
                    </div>
                </div>
            </header>

            <div ref={statsRef} className={`home-stats reveal${statsIn ? " is-in" : ""}`}>
                {[
                    { num: "5+", label: t("stat_years") },
                    { num: "2×", label: t("stat_awards") },
                    { num: "48", label: t("stat_cities") },
                    { num: "3", label: t("stat_languages") },
                ].map((stat) => (
                    <Box className="home-stat" key={stat.label}>
                        <Text className="home-stat-num">{stat.num}</Text>
                        <Text type="secondary" className="home-stat-label">{stat.label}</Text>
                    </Box>
                ))}
            </div>

            <HomeSection index="01" title={t("now_title")}>
                <Now />
            </HomeSection>

            <HomeSection index="02" title={t("map_skills_title")} subtitle={t("skills_description")}>
                <SkillsMap />
            </HomeSection>

            <HomeSection index="03" title={t("footprints_title")} subtitle={t("footprints_description")}>
                <MapChart />
            </HomeSection>

            <HomeSection index="04" title={t("comment_title")}>
                <Connect />
            </HomeSection>

            <Paragraph type="secondary" align="center" className="home-thanks">
                {t("thank_you")}
            </Paragraph>
            <BackToTop />
        </Box>
    );
};

export default Home;

export const Head = () => (
    <>
        <SEO
            title="Aerman Huofuer, Software Engineer (HCI & AI)"
            description="Software engineer with an HCI background and a front-end core, building across engineering, design and AI. Projects, writing and design work."
            pathname="/"
        />
    </>
);
