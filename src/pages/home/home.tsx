import React, { FunctionComponent, ReactNode } from "react";
import { navigate } from "gatsby";
import { Box, Button, Typography } from "miever_ui";

import MapChart from "./footprints";
import Connect from "../../components/Connect";
import { SEO } from "../../components/SEO";
import { useTranslation } from "react-i18next";
import SkillsMap from "../../components/Skills-Map";
import { useInView } from "../../components/useInView";

const { Paragraph } = Typography;

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
        <div className="home-section-head">
            <span className="home-section-index">{index}</span>
            <div className="home-section-heading">
                <h2 className="home-section-title">{title}</h2>
                {subtitle && <p className="home-section-sub">{subtitle}</p>}
            </div>
        </div>
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
                {/* Decorative, purely typographic/geometric panel. aria-hidden:
                    no information lives here, it just gives the hero a balanced
                    right side. CSS-only so it themes and scales for free. */}
                <div className="hero-visual" aria-hidden="true">
                    <div className="hero-visual-panel">
                        <span className="hero-visual-ring hero-visual-ring-a" />
                        <span className="hero-visual-ring hero-visual-ring-b" />
                        <span className="hero-visual-orbit" />
                        <span className="hero-visual-monogram">AH</span>
                        <span className="hero-visual-tag">Software · HCI · AI</span>
                    </div>
                </div>
            </header>

            <div ref={statsRef} className={`home-stats reveal${statsIn ? " is-in" : ""}`}>
                {[
                    { num: "4+", label: t("stat_years") },
                    { num: "2×", label: t("stat_awards") },
                    { num: "48", label: t("stat_cities") },
                    { num: "3", label: t("stat_languages") },
                ].map((stat) => (
                    <div className="home-stat" key={stat.label}>
                        <span className="home-stat-num">{stat.num}</span>
                        <span className="home-stat-label">{stat.label}</span>
                    </div>
                ))}
            </div>

            <HomeSection index="01" title={t("map_skills_title")} subtitle={t("skills_description")}>
                <SkillsMap />
            </HomeSection>

            <HomeSection index="02" title={t("footprints_title")} subtitle={t("footprints_description")}>
                <MapChart />
            </HomeSection>

            <HomeSection index="03" title={t("comment_title")}>
                <Connect />
            </HomeSection>

            <Paragraph type="secondary" align="center" className="home-thanks">
                {t("thank_you")}
            </Paragraph>
        </Box>
    );
};

export default Home;

export const Head = () => (
    <>
        <SEO
            title="Aerman Huofuer · Software, HCI & AI"
            description="Software engineer with an HCI background and a front-end core, building across engineering, design and AI. Projects, writing and design work."
            pathname="/"
        />
    </>
);
