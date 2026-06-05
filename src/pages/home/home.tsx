import React, { FunctionComponent, ReactNode, useEffect, useRef, useState } from "react";
import { navigate } from "gatsby";
import { StaticImage } from "gatsby-plugin-image";
import { Box, Button, Typography, Icon, Tag } from "miever_ui";
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

/** Counts a stat up from 0 to its value once it scrolls into view. Keeps any
 *  non-numeric suffix (e.g. the "+" in "5+", the "×" in "2×") and respects
 *  prefers-reduced-motion. */
const CountUp: FunctionComponent<{ value: string; start: boolean }> = ({ value, start }) => {
    const match = value.match(/^(\d+)(.*)$/);
    const target = match ? parseInt(match[1], 10) : 0;
    const suffix = match ? match[2] : "";
    const [n, setN] = useState(0);

    useEffect(() => {
        if (!match) return;
        const reduce =
            typeof window !== "undefined" &&
            window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        if (reduce) { setN(target); return; }
        if (!start) return;
        let raf = 0;
        const duration = 900;
        const t0 = performance.now();
        const tick = (now: number) => {
            const p = Math.min(1, (now - t0) / duration);
            const eased = 1 - Math.pow(1 - p, 3); // easeOutCubic
            setN(Math.round(eased * target));
            if (p < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(raf);
        // `match` is recreated each render; depending on it would restart the
        // animation on every setN. target/start fully capture what we need.
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [start, target]);

    if (!match) return <>{value}</>;
    return <>{n}{suffix}</>;
};

/** A prominent "featured project" band on the home page, surfacing Caster AI
 *  (a live AI product) right under the hero. Reuses the project's copy. */
const CLIP_END = 86; // seconds (1:26) — the clip's content ends here; never play past it.

const FeaturedCaster: FunctionComponent = () => {
    const { t } = useTranslation();
    const [ref, inView] = useInView<HTMLElement>();
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        const v = videoRef.current;
        if (!v) return;
        v.muted = true; // set as a property so autoplay isn't blocked
        const reduce =
            typeof window !== "undefined" &&
            window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        if (!reduce) v.play().catch(() => {});
    }, []);

    return (
        <section ref={ref} className={`featured-section reveal${inView ? " is-in" : ""}`}>
            <div className="featured-card">
                <div className="featured-visual">
                    <video
                        ref={videoRef}
                        className="featured-video"
                        src="https://miever.s3.ap-east-1.amazonaws.com/static/caster-ai/caster-ai.mov"
                        controls
                        muted
                        playsInline
                        preload="metadata"
                        onTimeUpdate={(e) => {
                            // Loop only the first 1:26; never show the part after.
                            if (e.currentTarget.currentTime >= CLIP_END) e.currentTarget.currentTime = 0;
                        }}
                    />
                </div>
                <div className="featured-body">
                    <span className="featured-eyebrow">{t("featured_label")}</span>
                    <Title level={3} className="featured-title">Caster AI</Title>
                    <Text className="featured-sub">{t("projects.ai_game.subTitle")}</Text>
                    <Paragraph type="secondary" className="featured-desc">
                        {t("projects.ai_game.description")}
                    </Paragraph>
                    <div className="featured-tags">
                        {["LLM", "TTS", "React"].map((tag) => (
                            <Tag key={tag} className="card-tag">{tag}</Tag>
                        ))}
                    </div>
                    <div className="featured-actions">
                        <Button type="primary" onClick={() => window.open("https://caster-ai.miever.net/")}>
                            {t("live_demo")}
                        </Button>
                        <Button type="link" onClick={() => window.open("https://github.com/Miever1/caster-ai")}>
                            <Icon icon={["fab", "github"]} style={{ marginRight: 6 }} />
                            {t("github_res")}
                        </Button>
                    </div>
                </div>
            </div>
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
                        <Text className="home-stat-num">
                            <CountUp value={stat.num} start={statsIn} />
                        </Text>
                        <Text type="secondary" className="home-stat-label">{stat.label}</Text>
                    </Box>
                ))}
            </div>

            <FeaturedCaster />

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
            description="Software engineer with an HCI background, working across front-end, graphics, AR and AI. Projects, writing and design work."
            pathname="/"
        />
    </>
);
