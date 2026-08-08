import * as React from "react";
import { navigate, HeadFC } from "gatsby";
import { Box, Button, Icon, Tag } from "miever_ui";
import { useTranslation } from "react-i18next";

import { SEO } from "../components/SEO";
import Breadcrumb from "../components/Breadcrumb";
import ShareButtons from "../components/ShareButtons";
import ProjectThumb from "../components/ProjectThumb";
import { ReadingProgress, BackToTop } from "../components/ReadingAids";
import {
    projects,
    getProject,
    pickLang,
    Lang,
    DOMAIN_KEYS,
} from "../data/projectsData";

interface PageCtx {
    pageContext: { id: string };
}

const ProjectTemplate: React.FC<PageCtx> = ({ pageContext }) => {
    const { t, i18n } = useTranslation();
    const lang: Lang = i18n.language === "zh" ? "zh" : "en";
    const project = getProject(pageContext.id);

    if (!project) {
        return (
            <Box className="project-detail">
                <p>{t("not_found_title")}</p>
                <Button type="primary" onClick={() => navigate("/projects")}>
                    {t("navigation_projects")}
                </Button>
            </Box>
        );
    }

    const {
        id, domain, title, subTitle, role, period, context, challenge,
        approach, outcome, tech, links, thumbId,
    } = project;

    const tr = (v: { en: string; zh: string }) => pickLang(v, lang);
    const name = tr(title);

    // Linear prev/next through the curated project order.
    const idx = projects.findIndex((p) => p.id === id);
    const prev = idx > 0 ? projects[idx - 1] : undefined;
    const next = idx >= 0 && idx < projects.length - 1 ? projects[idx + 1] : undefined;

    const go = (to: string) => (e: React.MouseEvent) => {
        e.preventDefault();
        navigate(to);
    };

    const Section: React.FC<{ label: string; children: React.ReactNode; highlight?: boolean }> = ({
        label, children, highlight,
    }) => (
        <section className={`case-section${highlight ? " case-section-highlight" : ""}`}>
            <h2 className="case-label">{label}</h2>
            <div className="case-body">{children}</div>
        </section>
    );

    return (
        <Box className="project-detail">
            <ReadingProgress />

            <Breadcrumb
                items={[
                    { label: t("navigation_home"), to: "/" },
                    { label: t("navigation_projects"), to: "/projects" },
                    { label: name },
                ]}
            />

            <header className="project-hero">
                <div className="project-hero-media">
                    <ProjectThumb id={thumbId} alt={name} />
                </div>
                <div className="project-hero-body">
                    <span className="project-eyebrow">{t(DOMAIN_KEYS[domain])}</span>
                    <h1 className="project-title">{name}</h1>
                    <p className="project-subtitle">{tr(subTitle)}</p>
                    <div className="project-meta">
                        <span className="project-meta-item">
                            <Icon icon={["fas", "user"]} /> {tr(role)}
                        </span>
                        <span className="project-meta-dot">·</span>
                        <span className="project-meta-item">
                            <Icon icon={["fas", "calendar"]} /> {period}
                        </span>
                    </div>
                    <div className="project-tags">
                        {tech.map((tag) => (
                            <Tag key={tag} className="card-tag">{tag}</Tag>
                        ))}
                    </div>
                    <div className="project-actions">
                        {links.liveDemo && (
                            <Button type="primary" onClick={() => window.open(links.liveDemo)}>
                                {t("live_demo")}
                            </Button>
                        )}
                        {links.relatedBlog && (
                            <Button onClick={() => navigate(links.relatedBlog as string)}>
                                <Icon icon={["fas", "book-open"]} style={{ marginRight: 6 }} />
                                {t("read_full_story")}
                            </Button>
                        )}
                        {links.github && (
                            <Button type="link" onClick={() => window.open(links.github)}>
                                <Icon icon={["fab", "github"]} style={{ marginRight: 6 }} />
                                {t("github_res")}
                            </Button>
                        )}
                        {links.external && (
                            <Button type="link" onClick={() => window.open(links.external)}>
                                {links.externalLabel ? tr(links.externalLabel) : t("view_post")}
                            </Button>
                        )}
                    </div>
                </div>
            </header>

            <div className="project-body">
                <Section label={t("case_overview")}>
                    <p>{tr(context)}</p>
                </Section>
                <Section label={t("case_challenge")}>
                    <p>{tr(challenge)}</p>
                </Section>
                <section className="case-section">
                    <h2 className="case-label">{t("case_approach")}</h2>
                    <ul className="case-list">
                        {approach.map((step, i) => (
                            <li key={i}>{tr(step)}</li>
                        ))}
                    </ul>
                </section>
                <Section label={t("case_outcome")} highlight>
                    <p>{tr(outcome)}</p>
                </Section>
            </div>

            <ShareButtons url={`https://miever.net/projects/${id}`} title={name} />

            {(prev || next) && (
                <nav className="project-prevnext" aria-label={t("project_nav_label")}>
                    {prev ? (
                        <a
                            className="project-prevnext-link project-prevnext-prev"
                            href={`/projects/${prev.id}`}
                            onClick={go(`/projects/${prev.id}`)}
                        >
                            <span className="project-prevnext-dir">← {t("project_nav_prev")}</span>
                            <span className="project-prevnext-title">{tr(prev.title)}</span>
                        </a>
                    ) : (
                        <span />
                    )}
                    {next && (
                        <a
                            className="project-prevnext-link project-prevnext-next"
                            href={`/projects/${next.id}`}
                            onClick={go(`/projects/${next.id}`)}
                        >
                            <span className="project-prevnext-dir">{t("project_nav_next")} →</span>
                            <span className="project-prevnext-title">{tr(next.title)}</span>
                        </a>
                    )}
                </nav>
            )}

            <BackToTop />
        </Box>
    );
};

export default ProjectTemplate;

export const Head: HeadFC<object, { id: string }> = ({ pageContext }) => {
    const project = getProject(pageContext.id);
    if (!project) {
        return <SEO title="Projects - Miever" pathname="/projects" />;
    }
    // SEO uses English for stable, indexable metadata (the page itself is i18n).
    const name = project.title.en;
    const description = project.summary.en;
    const url = `https://miever.net/projects/${project.id}`;
    // Branded OG card generated at build time (see gatsby-node onPostBuild).
    const image = `https://miever.net/og/project-${project.id}.png`;

    return (
        <SEO title={`${name} — Aerman Huofuer`} description={description} pathname={`/projects/${project.id}`} image={image}>
            <script type="application/ld+json">
                {JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "CreativeWork",
                    name,
                    headline: name,
                    description,
                    url,
                    keywords: project.tech.join(", "),
                    author: { "@type": "Person", name: "Aerman Huofuer" },
                    mainEntityOfPage: { "@type": "WebPage", "@id": url },
                })}
            </script>
        </SEO>
    );
};
