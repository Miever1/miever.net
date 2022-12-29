import React, { FunctionComponent } from "react";
import { Image } from "@chakra-ui/react";
import { navigate, graphql, useStaticQuery } from "gatsby"
import { Box, Card } from "miever_ui";

interface BlogInfo {
    title: string;
    date: string;
    description: string;
    slug: string;
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
                        slug
                    }
                  }
                }
              }
        }
    `)
    return (
        <Box>
            {edges.map((item: { node: { frontmatter: BlogInfo }}) => {
                const { node: { frontmatter } } = item;
                const { title, date, description, slug } = frontmatter;
                return (
                    <Card
                        hoverable
                        key={slug}
                        title={title}
                        subTitle={date}
                        style={{
                            minWidth: "800px"
                        }}
                    >
                        <Box flexBox onClick={() => navigate(`/blogs${slug}`)}>
                            <Box
                                width={480}
                            >
                                <Image
                                    src='https://wallpaperaccess.com/full/354997.jpg'
                                    alt='Green double couch with wooden legs'
                                    borderRadius='lg'
                                    h="100%"
                                />
                            </Box>
                            <Box style={{ flex: 1, padding: "0 16px" }}>
                                {description}
                            </Box>
                        </Box>
                    </Card>
                )
            })}
        </Box>
    );
}

export default Blogs;
