
import React, { FunctionComponent } from "react";
import { Box, Card, Button, Icon, PageHeader, Tag } from "miever_ui";
import { useTranslation } from "react-i18next";

export interface Project {
    title: string;
    subTitle: string;
    description: string;
    githubPath?: string;
    liveDemoPath: string;
    thumbnailPath: string;
    tech: string[];
}

const Projects:FunctionComponent<{}> = () => {
    const { t } = useTranslation();

    const projectsList: Project[] = [
        {
          title: t("projects.ucloud_console.title"),
          subTitle: t("projects.ucloud_console.subTitle"),
          description: t("projects.ucloud_console.description"),
          liveDemoPath: "/blogs/ucloud-frontend-experience/",
          thumbnailPath: "https://miever.s3.ap-east-1.amazonaws.com/static/blogs/ucloud-office.webp",
          tech: ["React", "TypeScript", "Monitoring"],
        },
        {
          title: t("projects.miever_net.title"),
          subTitle: t("projects.miever_net.subTitle"),
          description: t("projects.miever_net.description"),
          liveDemoPath: "https://miever.net",
          thumbnailPath: "https://miever.s3.ap-east-1.amazonaws.com/static/projects/thumbnail-miever.webp",
          githubPath: "https://github.com/Miever1/miever.net",
          tech: ["Gatsby", "React", "AWS"],
        },
        {
          title: t("projects.miever_ui.title"),
          subTitle: t("projects.miever_ui.subTitle"),
          description: t("projects.miever_ui.description"),
          liveDemoPath: "https://components.miever.net",
          thumbnailPath: "https://miever.s3.ap-east-1.amazonaws.com/static/projects/thumbnail-components.webp",
          githubPath: "https://github.com/Miever1/miever_ui",
          tech: ["React", "Vite", "Storybook"],
        },
        {
          title: t("projects.news_project.title"),
          subTitle: t("projects.news_project.subTitle"),
          description: t("projects.news_project.description"),
          liveDemoPath: "https://news.miever.net",
          thumbnailPath: "https://miever.s3.ap-east-1.amazonaws.com/static/projects/thumbnail-news-project.webp",
          githubPath: "https://github.com/Miever1/news-manager",
          tech: ["React", "Node.js"],
        }
    ];

    return (
        <Box className="content-list">
            <PageHeader title={t("navigation_projects")} subtitle={t("projects.description")} />
            <div className="project-grid">
                {projectsList.map((item) => {
                    const { title, subTitle, liveDemoPath, githubPath, description, thumbnailPath, tech } = item;
                    return (
                        <Card
                            key={title}
                            hoverable
                            clamp={3}
                            cover={<img src={thumbnailPath} alt={title} loading="lazy" />}
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
