import React, { FunctionComponent, useState } from "react";
import { navigate } from "gatsby";
import { Box, Card, Button, Icon, Input, PageHeader, Tag } from "miever_ui";
import { useTranslation } from "react-i18next";

import ProjectThumb from "../../components/ProjectThumb";
import {
    projects,
    pickLang,
    Lang,
    ProjectDomain,
    DOMAIN_KEYS,
    DOMAIN_ORDER,
} from "../../data/projectsData";

const Projects: FunctionComponent<{}> = () => {
    const { t, i18n } = useTranslation();
    const lang: Lang = i18n.language === "zh" ? "zh" : "en";
    const tr = (v: { en: string; zh: string }) => pickLang(v, lang);

    const [query, setQuery] = useState("");
    const [domain, setDomain] = useState<ProjectDomain | "all">("all");

    // Only show filter chips for domains that actually have projects.
    const presentDomains = DOMAIN_ORDER.filter((d) =>
        projects.some((p) => p.domain === d),
    );

    const term = query.trim().toLowerCase();
    const filtered = projects.filter((p) => {
        if (domain !== "all" && p.domain !== domain) return false;
        if (!term) return true;
        return [tr(p.title), tr(p.subTitle), tr(p.summary), ...p.tech]
            .join(" ")
            .toLowerCase()
            .includes(term);
    });

    const open = (url?: string) => (e: React.MouseEvent) => {
        // Footer quick-links live inside the card link — stop the click from
        // also triggering the card's navigation to the detail page.
        e.stopPropagation();
        e.preventDefault();
        if (url) window.open(url);
    };

    return (
        <Box className="content-list">
            <PageHeader title={t("navigation_projects")} subtitle={t("projects.description")} />

            <div className="search-bar">
                <Input
                    icon="magnifying-glass"
                    placeholder={t("search_projects")}
                    aria-label={t("search_projects")}
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
            </div>

            <div className="filter-chips" role="group" aria-label={t("filter_by_domain")}>
                <button
                    type="button"
                    className={`filter-chip${domain === "all" ? " is-active" : ""}`}
                    aria-pressed={domain === "all"}
                    onClick={() => setDomain("all")}
                >
                    {t("filter_all")}
                </button>
                {presentDomains.map((d) => (
                    <button
                        key={d}
                        type="button"
                        className={`filter-chip${domain === d ? " is-active" : ""}`}
                        aria-pressed={domain === d}
                        onClick={() => setDomain(d)}
                    >
                        {t(DOMAIN_KEYS[d])}
                    </button>
                ))}
            </div>

            {filtered.length === 0 && (
                <Box className="search-empty">{t("search_no_results")}</Box>
            )}

            <div className="project-grid">
                {filtered.map((item) => {
                    const { id, thumbId, domain: dom, links, tech } = item;
                    const title = tr(item.title);
                    const detailPath = `/projects/${id}`;
                    return (
                        <Card
                            key={id}
                            hoverable
                            href={detailPath}
                            onClick={(e: React.MouseEvent) => {
                                e.preventDefault();
                                navigate(detailPath);
                            }}
                            cover={
                                <>
                                    <ProjectThumb id={thumbId} alt={title} />
                                    <span className="project-domain-badge">{t(DOMAIN_KEYS[dom])}</span>
                                </>
                            }
                            title={title}
                            subTitle={tr(item.subTitle)}
                            meta={
                                <span className="card-meta-row">
                                    {tech.map((tag) => (
                                        <Tag key={tag} className="card-tag">{tag}</Tag>
                                    ))}
                                </span>
                            }
                            footer={
                                <span className="project-card-footer">
                                    <span className="project-card-cta">
                                        {t("view_case_study")} →
                                    </span>
                                    <span className="project-card-quick">
                                        {links.liveDemo && (
                                            <Button size="sm" type="link" aria-label={t("live_demo")} onClick={open(links.liveDemo)}>
                                                <Icon icon={["fas", "arrow-up-right-from-square"]} />
                                            </Button>
                                        )}
                                        {links.github && (
                                            <Button size="sm" type="link" aria-label={t("github_res")} onClick={open(links.github)}>
                                                <Icon icon={["fab", "github"]} />
                                            </Button>
                                        )}
                                    </span>
                                </span>
                            }
                        >
                            {tr(item.summary)}
                        </Card>
                    );
                })}
            </div>
        </Box>
    );
};

export default Projects;
