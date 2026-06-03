import React, { FunctionComponent, ReactNode } from "react";
import { navigate } from "gatsby";
import { Box, Button, Typography } from "miever_ui";

import MapChart from "./footprints";
import Comments from "../../components/Comments";
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
                <Comments />
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
        <SEO title="Home" description="Home page" pathname="/" />
    </>
);
