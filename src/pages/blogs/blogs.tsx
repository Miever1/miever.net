import React, { FunctionComponent } from "react";
import { Image } from "@chakra-ui/react";
import { navigate, graphql, useStaticQuery } from "gatsby"
import { Box, Card } from "miever_ui";

interface BlogInfo {
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
                        # Assumes you're using title in your frontmatter.
                        title,
                        date,
                        description,
                        slug,
                        home_image,
                        tags
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
            }).map((item: { node: { frontmatter: BlogInfo }}) => {
                const { node: { frontmatter } } = item;
                const { title, date, description, slug, home_image, tags } = frontmatter;
                return (
                    <Box paddingY={2} key={`blog_${slug}`}>
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
                                        {tags.map(item => item)}
                                    </Box>
                                </Box>
                            )}
                        >
                            <Box flexBox onClick={() => navigate(`/blogs${slug}`)}>
                                <Box
                                    width={480}
                                    style={{ flex: 4, maxHeight: 240 }}
                                >
                                    <Image
                                        src={home_image}
                                        alt='Green double couch with wooden legs'
                                        borderRadius='lg'
                                        h="100%"
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
