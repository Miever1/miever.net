
import React, { FunctionComponent, useState } from "react";
import { StaticImage } from "gatsby-plugin-image";
import { Box, Card, Button, Icon, Input, PageHeader, Tag } from "miever_ui";
import { useTranslation } from "react-i18next";

export interface Project {
    id: string;
    title: string;
    subTitle: string;
    description: string;
    githubPath?: string;
    liveDemoPath: string;
    tech: string[];
}

// StaticImage needs a literal `src`, so the four thumbnails are switched by id.
// gatsby-plugin-image downloads + optimizes each at build (responsive WebP).
const ProjectThumb: FunctionComponent<{ id: string; alt: string }> = ({ id, alt }) => {
    const fill = { width: "100%", height: "100%" } as const;
    // Anchor to the top so screenshots show their recognizable header/hero
    // rather than an arbitrary center crop.
    const cover = { objectFit: "cover", objectPosition: "top" } as const;
    switch (id) {
        case "ucloud_console":
            return <StaticImage src="https://miever.s3.ap-east-1.amazonaws.com/static/blogs/ucloud-office.webp" alt={alt} layout="constrained" width={760} placeholder="blurred" loading="lazy" style={fill} imgStyle={cover} />;
        case "miever_net":
            return <StaticImage src="https://miever.s3.ap-east-1.amazonaws.com/static/projects/thumbnail-miever.webp" alt={alt} layout="constrained" width={760} placeholder="blurred" loading="lazy" style={fill} imgStyle={cover} />;
        case "miever_ui":
            return <StaticImage src="https://miever.s3.ap-east-1.amazonaws.com/static/projects/thumbnail-components.webp" alt={alt} layout="constrained" width={760} placeholder="blurred" loading="lazy" style={fill} imgStyle={cover} />;
        case "news_project":
            return <StaticImage src="https://miever.s3.ap-east-1.amazonaws.com/static/projects/thumbnail-news-project.webp" alt={alt} layout="constrained" width={760} placeholder="blurred" loading="lazy" style={fill} imgStyle={cover} />;
        default:
            return null;
    }
};

const Projects:FunctionComponent<{}> = () => {
    const { t } = useTranslation();

    const projectsList: Project[] = [
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
                                <>
                                    <Button
                                        size="sm"
                                        type="primary"
                                        onClick={() => window.open(liveDemoPath)}
                                    >
                                        {t("live_demo")}
                                    </Button>
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
