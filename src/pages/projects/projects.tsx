
import React, { FunctionComponent, useState } from "react";
import type { IconProp } from "@fortawesome/fontawesome-svg-core";
import { StaticImage } from "gatsby-plugin-image";
import { Box, Card, Button, Icon, Input, PageHeader, Tag } from "miever_ui";
import { useTranslation } from "react-i18next";

export interface Project {
    id: string;
    title: string;
    subTitle: string;
    description: string;
    githubPath?: string;
    /** Public link (live site or case-study post). Omitted for internal work. */
    liveDemoPath?: string;
    tech: string[];
}

// StaticImage needs a literal `src`, so thumbnails are switched by id.
// gatsby-plugin-image downloads + optimizes each at build (responsive WebP).
// Projects without a public screenshot fall back to a branded gradient tile.
const FALLBACK_ICON: Record<string, IconProp> = {
    huawei: ["fas", "cube"],
    ai_game: ["fas", "gamepad"],
};

const ProjectThumb: FunctionComponent<{ id: string; alt: string }> = ({ id, alt }) => {
    const fill = { width: "100%", height: "100%" } as const;
    // Anchor to the top so screenshots show their recognizable header/hero
    // rather than an arbitrary center crop.
    const cover = { objectFit: "cover", objectPosition: "top" } as const;
    switch (id) {
        case "mindflow":
            return <StaticImage src="https://miever.s3.ap-east-1.amazonaws.com/static/blogs/ai-smart-planer.png" alt={alt} layout="constrained" width={760} placeholder="blurred" loading="lazy" style={fill} imgStyle={cover} />;
        case "vr_worlds":
            return <StaticImage src="https://miever.s3.ap-east-1.amazonaws.com/static/blogs/coding-virtual-world.webp" alt={alt} layout="constrained" width={760} placeholder="blurred" loading="lazy" style={fill} imgStyle={cover} />;
        case "ucloud_console":
            return <StaticImage src="https://miever.s3.ap-east-1.amazonaws.com/static/blogs/ucloud-office.webp" alt={alt} layout="constrained" width={760} placeholder="blurred" loading="lazy" style={fill} imgStyle={cover} />;
        case "miever_net":
            return <StaticImage src="https://miever.s3.ap-east-1.amazonaws.com/static/projects/thumbnail-miever.webp" alt={alt} layout="constrained" width={760} placeholder="blurred" loading="lazy" style={fill} imgStyle={cover} />;
        case "miever_ui":
            return <StaticImage src="https://miever.s3.ap-east-1.amazonaws.com/static/projects/thumbnail-components.webp" alt={alt} layout="constrained" width={760} placeholder="blurred" loading="lazy" style={fill} imgStyle={cover} />;
        case "news_project":
            return <StaticImage src="https://miever.s3.ap-east-1.amazonaws.com/static/projects/thumbnail-news-project.webp" alt={alt} layout="constrained" width={760} placeholder="blurred" loading="lazy" style={fill} imgStyle={cover} />;
        default:
            return (
                <span className="project-thumb-fallback" aria-hidden="true">
                    <Icon icon={FALLBACK_ICON[id] || ["fas", "folder"]} />
                </span>
            );
    }
};

const Projects:FunctionComponent<{}> = () => {
    const { t } = useTranslation();

    const projectsList: Project[] = [
        {
          id: "huawei",
          title: t("projects.huawei.title"),
          subTitle: t("projects.huawei.subTitle"),
          description: t("projects.huawei.description"),
          tech: ["ArkUI", "AR Engine", "AI"],
        },
        {
          id: "ai_game",
          title: t("projects.ai_game.title"),
          subTitle: t("projects.ai_game.subTitle"),
          description: t("projects.ai_game.description"),
          tech: ["LLM", "TTS", "AI"],
        },
        {
          id: "mindflow",
          title: t("projects.mindflow.title"),
          subTitle: t("projects.mindflow.subTitle"),
          description: t("projects.mindflow.description"),
          liveDemoPath: "/blogs/ai-smart-planner-hci-project-journey/",
          tech: ["AI", "HCI", "Figma"],
        },
        {
          id: "vr_worlds",
          title: t("projects.vr_worlds.title"),
          subTitle: t("projects.vr_worlds.subTitle"),
          description: t("projects.vr_worlds.description"),
          liveDemoPath: "/blogs/coding-virtual-worlds-vr-projects/",
          tech: ["Unity", "C#", "VR"],
        },
        {
          id: "ucloud_console",
          title: t("projects.ucloud_console.title"),
          subTitle: t("projects.ucloud_console.subTitle"),
          description: t("projects.ucloud_console.description"),
          liveDemoPath: "/blogs/ucloud-frontend-experience/",
          tech: ["React", "TypeScript", "Monitoring"],
        },
        {
          id: "miever_net",
          title: t("projects.miever_net.title"),
          subTitle: t("projects.miever_net.subTitle"),
          description: t("projects.miever_net.description"),
          liveDemoPath: "https://miever.net",
          githubPath: "https://github.com/Miever1/miever.net",
          tech: ["Gatsby", "React", "AWS"],
        },
        {
          id: "miever_ui",
          title: t("projects.miever_ui.title"),
          subTitle: t("projects.miever_ui.subTitle"),
          description: t("projects.miever_ui.description"),
          liveDemoPath: "https://components.miever.net",
          githubPath: "https://github.com/Miever1/miever_ui",
          tech: ["React", "Vite", "Storybook"],
        },
        {
          id: "news_project",
          title: t("projects.news_project.title"),
          subTitle: t("projects.news_project.subTitle"),
          description: t("projects.news_project.description"),
          liveDemoPath: "https://news.miever.net",
          githubPath: "https://github.com/Miever1/news-manager",
          tech: ["React", "Node.js"],
        }
    ];

    const [query, setQuery] = useState("");
    const term = query.trim().toLowerCase();
    const filtered = term
        ? projectsList.filter((p) =>
              [p.title, p.subTitle, ...p.tech].join(" ").toLowerCase().includes(term),
          )
        : projectsList;

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

            {filtered.length === 0 && (
                <Box className="search-empty">{t("search_no_results")}</Box>
            )}

            <div className="project-grid">
                {filtered.map((item) => {
                    const { id, title, subTitle, liveDemoPath, githubPath, description, tech } = item;
                    return (
                        <Card
                            key={title}
                            hoverable
                            cover={<ProjectThumb id={id} alt={title} />}
                            title={title}
                            subTitle={subTitle}
                            meta={
                                <span className="card-meta-row">
                                    {tech.map((tag) => (
                                        <Tag key={tag} className="card-tag">{tag}</Tag>
                                    ))}
                                </span>
                            }
                            footer={
                                liveDemoPath || githubPath ? (
                                    <>
                                        {liveDemoPath && (
                                            <Button
                                                size="sm"
                                                type="primary"
                                                onClick={() => window.open(liveDemoPath)}
                                            >
                                                {t("live_demo")}
                                            </Button>
                                        )}
                                        {githubPath && (
                                            <Button
                                                size="sm"
                                                type="link"
                                                onClick={() => window.open(githubPath)}
                                            >
                                                <Icon icon={["fab", "github"]} style={{ marginRight: 6 }} />
                                                {t("github_res")}
                                            </Button>
                                        )}
                                    </>
                                ) : undefined
                            }
                        >
                            {description}
                        </Card>
                    );
                })}
            </div>
        </Box>
    );
}

export default Projects;
