import React, { FunctionComponent, useState, useEffect } from "react";
import { Image, Spinner } from "@chakra-ui/react";
import { navigate, graphql, useStaticQuery } from "gatsby"
import { Box, Card, designs } from "miever_ui";
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
    pinned?: boolean;
}

const Blogs:FunctionComponent<{}> = () => {
    const { BRAND_COLORS } = designs;
    const { i18n } = useTranslation();
    const currentLanguage = i18n.language;
    const [isLoaded, setIsLoaded] = useState(false);

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
                        language,
                        pinned
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
            {edges.sort((a: { node: { frontmatter: BlogInfo }}, b: { node: { frontmatter: BlogInfo }}) => {
                const aPinned = a.node.frontmatter.pinned ? 1 : 0;
                const bPinned = b.node.frontmatter.pinned ? 1 : 0;

                if (aPinned !== bPinned) {
                    return bPinned - aPinned;
                }

                return new Date(b.node.frontmatter.date).getTime() - new Date(a.node.frontmatter.date).getTime();
            }).filter((contentItem: { node: { frontmatter: BlogInfo }}) => {
                const { node: { frontmatter } } = contentItem;
                const { type, language } = frontmatter;
                return (type === "blogs") && (language === currentLanguage);
            }).map((item: { node: { frontmatter: BlogInfo }}) => {
                const { node: { frontmatter } } = item;
                const { title, date, description, slug, home_image, tags } = frontmatter;
                return (
                    <Box paddingY={2} key={`blog_${slug}`} onClick={() => navigate(`/blogs${slug}`)}>
                        <Card
                            hoverable
                            key={slug}
                            title={(
                                <Box
                                    flexBox
                                    justifyContent="space-between"
                                    style={{ cursor: "pointer" }}
                                >
                                    <Box style={{ color: BRAND_COLORS.primary }}>
                                        {title}
                                    </Box>
                                </Box>
                            )}
                            subTitle={(
                                <Box flexBox paddingX={1} justifyContent="space-between" style={{ color: BRAND_COLORS.primary }}>
                                    <Box>
                                        {date}
                                    </Box>
                                    <Box>
                                    <Box>
                                        {tags.map((item, index) => (
                                            <span key={index}>
                                                {item}{index < tags.length - 1 ? ', ' : ''}
                                            </span>
                                        ))}
                                    </Box>
                                    </Box>
                                </Box>
                            )}
                        >
                            <Box flexBox>
                                <Box
                                    style={{ flex: 4 }}
                                >
                                    <Image
                                        src={home_image}
                                        alt={`blogs-${title}`}
                                        borderRadius='lg'
                                        w={480}
                                        loading="lazy"
                                    />
                                </Box>
                                <Box style={{ flex: 5, padding: "0 16px" }}>
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

export default Blogs;
