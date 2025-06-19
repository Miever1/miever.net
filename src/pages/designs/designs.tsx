import React, { FunctionComponent, useState, useEffect } from "react";
import { Image, Spinner } from "@chakra-ui/react";
import { navigate, graphql, useStaticQuery } from "gatsby"
import { Box, Card, Tooltip, Button, Icon, designs } from "miever_ui";
import { useTranslation } from "react-i18next";

interface BlogInfo {
    type: "blogs" | "designs";
    language: "en" | "zh";
    title: string;
    date: string;
    description: string;
    slug: string;
    home_image: string;
    tags: string[];
    liveDemoPath: string;
}

const Designs:FunctionComponent<{}> = () => {
    const { BRAND_COLORS } = designs;
    const [isLoaded, setIsLoaded] = useState(false);
    const { t, i18n } = useTranslation();
    const currentLanguage = i18n.language;

    useEffect(() => {
        setTimeout(() => {
            setIsLoaded(true);
        }, 500);
    }, []);

    const { allMarkdownRemark: { edges } } = useStaticQuery(graphql`
        query {
            allMarkdownRemark {
                edges {
                  node {
                    html
                    headings {
                        depth
                        value
                    }
                    frontmatter {
                        title,
                        date,
                        description,
                        slug,
                        home_image,
                        tags,
                        type,
                        liveDemoPath,
                        language
                    }
                  }
                }
              }
        }
    `);

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
            {edges.sort((lastBlog: { node: { frontmatter: BlogInfo }}, nextBlog: { node: { frontmatter: BlogInfo }}) => {
                return lastBlog.node?.frontmatter?.date < nextBlog.node?.frontmatter?.date
            }).filter((contentItem: { node: { frontmatter: BlogInfo }}) => {
                const { node: { frontmatter } } = contentItem;
                const { type, language } = frontmatter;
                return (type === "designs") && (language === currentLanguage);
            }).map((item: { node: { frontmatter: BlogInfo }}) => {
                const { node: { frontmatter } } = item;
                const { title, liveDemoPath, description, slug, home_image, tags } = frontmatter;
                return (
                    <Box paddingY={2} key={`blog_${slug}`} onClick={() => navigate(`/designs${slug}`)}>
                        <Card
                            hoverable
                            title={(
                                <Box
                                    flexBox
                                    style={{ cursor: "pointer" }}
                                >
                                    <Box style={{ color: BRAND_COLORS.primary }}>
                                        {title}
                                    </Box>
                                </Box>
                            )}
                            subTitle={(
                                <Box flexBox paddingX={1} justifyContent="space-between" style={{ color: BRAND_COLORS.primary }}>
                                    <Box style={{ lineHeight: "29px" }}>
                                    <Box>
                                    {tags.map((item, index) => (
                                        <span key={index}>
                                            {item}{index < tags.length - 1 ? ', ' : ''}
                                        </span>
                                    ))}
                                </Box>
                                    </Box>
                                    <Box flexBox justifyContent="flex-end">
                                        <Tooltip overlay={t("live_demo")} placement="top">
                                            <Button
                                                size="sm"
                                                styleType="link"
                                                onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
                                                    e.stopPropagation();
                                                    window.open(liveDemoPath);
                                                }}
                                            >
                                                <Icon icon={["fas", "desktop"]} theme="primary" style={{ cursor: "pointer" }}/>
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
                                        src={home_image}
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

export default Designs;
