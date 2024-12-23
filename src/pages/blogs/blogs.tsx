import React, { FunctionComponent } from "react";
import { Image } from "@chakra-ui/react";
import { navigate, graphql, useStaticQuery } from "gatsby"
import { Box, Card } from "miever_ui";

interface BlogInfo {
    type: "blogs" | "designs";
    title: string;
    date: string;
    description: string;
    slug: string;
    home_image: string;
    tags: string[];
}

const Blogs:FunctionComponent<{}> = () => {
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
                        type
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
                return type === "blogs";
            }).map((item: { node: { frontmatter: BlogInfo }}) => {
                const { node: { frontmatter } } = item;
                const { title, date, description, slug, home_image, tags } = frontmatter;
                return (
                    <Box paddingY={2} key={`blog_${slug}`} onClick={() => navigate(`/blogs${slug}`)}>
                        <Card
                            hoverable
                            key={slug}
                            title={title}
                            subTitle={(
                                <Box flexBox paddingX={1} justifyContent="space-between">
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
                                        w={360}
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
