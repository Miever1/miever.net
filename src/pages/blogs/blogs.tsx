import React, { FunctionComponent } from "react";
import { Box, Card, Flex, Image, CardBody, Heading, CardHeader, Text } from "@chakra-ui/react";
import { graphql, useStaticQuery } from "gatsby"
import { navigate } from "gatsby"

// custom
import Layout from "../../components/Layout";

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
        <Layout>
            <Box>
                {edges.map((item: { node: { frontmatter: BlogInfo }}) => {
                    const { node: { frontmatter } } = item;
                    const { title, date, description, slug } = frontmatter;
                    return (
                        <Card
                            mb={4}
                            key={slug}
                            bg="rgba(255,255,255,.8)"
                        >
                            <CardHeader>
                                <Heading size='md'>{title}</Heading>
                                <Text as='i'>{date}</Text>
                            </CardHeader>
                            <CardBody
                                overflow="hidden"
                                minH={270}
                                onClick={() => navigate(`/blogs${slug}`)}
                            >
                                <Flex>
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
                                    <Box flex={1} px={4} overflow="hidden">
                                        {description}
                                    </Box>
                                </Flex>
                            </CardBody>
                        </Card>
                    )
                })}
            </Box>
        </Layout>
    );
}

export default Blogs;

