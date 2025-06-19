
import React, { FunctionComponent, useState, useEffect } from "react";
import { Image, Spinner } from "@chakra-ui/react";
import { Box, Card, Button, Icon, Tooltip, designs } from "miever_ui";
import { useTranslation } from "react-i18next";

export interface Project {
    title: string;
    subTitle: string;
    description: string;
    githubPath: string;
    liveDemoPath: string;
    thumbnailPath: string;
}

const Projects:FunctionComponent<{}> = () => {
    const { t } = useTranslation();
    const { BRAND_COLORS } = designs;
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            setIsLoaded(true);
        }, 500);
    }, []);

    const projectsList: Project[] = [
        {
          title: t("projects.miever_net.title"),
          subTitle: t("projects.miever_net.subTitle"),
          description: t("projects.miever_net.description"),
          liveDemoPath: "https://miever.net",
          thumbnailPath: "https://miever.s3.ap-east-1.amazonaws.com/static/projects/thumbnail-miever.webp",
          githubPath: "https://github.com/Miever1/miever.net"
        },
        {
          title: t("projects.miever_ui.title"),
          subTitle: t("projects.miever_ui.subTitle"),
          description: t("projects.miever_ui.description"),
          liveDemoPath: "https://components.miever.net",
          thumbnailPath: "https://miever.s3.ap-east-1.amazonaws.com/static/projects/thumbnail-components.webp",
          githubPath: "https://github.com/Miever1/miever_ui"
        },
        {
          title: t("projects.news_project.title"),
          subTitle: t("projects.news_project.subTitle"),
          description: t("projects.news_project.description"),
          liveDemoPath: "https://news.miever.net",
          thumbnailPath: "https://miever.s3.ap-east-1.amazonaws.com/static/projects/thumbnail-news-project.webp",
          githubPath: "https://github.com/Miever1/news-manager"
        }
    ];

    if(!isLoaded) {
        return(
            <Box
                style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    zIndex: 10,
                }}
            >
                <Spinner size="xl" color={BRAND_COLORS.primary} />
            </Box>
        )
    }

    return (
        <Box>
            {projectsList.map(item => {
                const { title, subTitle, liveDemoPath, githubPath, description, thumbnailPath } = item;
                return (
                    <Box paddingY={2}>
                        <Card
                            title={(
                                <Box flexBox >
                                    <Box style={{ color: BRAND_COLORS.primary }}>
                                        {title}
                                    </Box>
                                </Box>
                            )}
                            subTitle={(
                                <Box flexBox paddingX={1} justifyContent="space-between">
                                    <Box style={{ lineHeight: "29px", color: BRAND_COLORS.primary }}>
                                        {subTitle}
                                    </Box>
                                    <Box flexBox justifyContent="flex-end">
                                        <Tooltip overlay={t("live_demo")} placement="top">
                                            <Button
                                                size="sm"
                                                styleType="link"
                                                onClick={() => window.open(liveDemoPath)}
                                            >
                                                <Icon icon={["fas", "desktop"]} theme="primary" style={{ cursor: "pointer" }}/>
                                            </Button>
                                        </Tooltip>
                                        <Tooltip overlay={t("github_res")} placement="top">
                                            <Button
                                                size="sm"
                                                styleType="link"
                                                onClick={() => window.open(githubPath)}
                                            >
                                                <Icon icon={["fab", "github"]} theme="primary" style={{ fontSize: "14px", cursor: "pointer" }}/>
                                            </Button>
                                        </Tooltip>
                                    </Box>
                                </Box>
                            )}
                        >
                            <Box flexBox>
                                <Box
                                    style={{ 
                                        flex: 4,
                                        overflow: "hidden"
                                    }}
                                >
                                    <Image
                                        src={thumbnailPath}
                                        alt={`blogs-${title}`}
                                        borderRadius='lg'
                                        w={480}
                                        loading="lazy"
                                    />
                                </Box>
                                <Box 
                                    style={{
                                        flex: 5,
                                        padding: "0 16px",
                                        display: "-webkit-box",
                                        WebkitBoxOrient: "vertical",
                                        WebkitLineClamp: 6,
                                        overflow: "hidden",
                                        textOverflow: "ellipsis",
                                    }}
                                >
                                    {description}
                                </Box>
                            </Box>
                        </Card>
                    </Box>
                )
            })}
        </Box>
    );
}

export default Projects;
