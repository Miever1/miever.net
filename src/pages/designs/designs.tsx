import React, { FunctionComponent } from "react";
import { Image } from "@chakra-ui/react";
import { navigate, graphql, useStaticQuery } from "gatsby"
import { Box, Card, Tooltip, Button, Icon } from "miever_ui";

interface BlogInfo {
    type: "blogs" | "designs";
    title: string;
    date: string;
    description: string;
    slug: string;
    home_image: string;
    tags: string[];
    liveDemoPath: string;
}

const Designs:FunctionComponent<{}> = () => {
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
                        liveDemoPath
                    }
                  }
                }
              }
        }
    `)
    return (
        <Box>
            {edges.sort((lastBlog: { node: { frontmatter: BlogInfo }}, nextBlog: { node: { frontmatter: BlogInfo }}) => {
                return lastBlog.node?.frontmatter?.date < nextBlog.node?.frontmatter?.date
            }).filter((contentItem: { node: { frontmatter: BlogInfo }}) => {
                const { node: { frontmatter } } = contentItem;
                const { type } = frontmatter;
                return type === "designs";
            }).map((item: { node: { frontmatter: BlogInfo }}) => {
                const { node: { frontmatter } } = item;
                const { title, liveDemoPath, description, slug, home_image, tags } = frontmatter;
                return (
                    <Box paddingY={2} key={`blog_${slug}`} onClick={() => navigate(`/designs${slug}`)}>
                        <Card
                            hoverable
                            title={title}
                            subTitle={(
                                <Box flexBox paddingX={1} justifyContent="space-between">
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
                                        <Tooltip overlay="Live Demo" placement="top">
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
