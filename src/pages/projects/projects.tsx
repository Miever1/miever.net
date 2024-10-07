
import React, { FunctionComponent } from "react";
import { Image } from "@chakra-ui/react";
import { Box, Card, Button, Icon, Tooltip } from "miever_ui";

interface Project {
    title: string;
    subTitle: string;
    description: string;
    githubPath: string;
    liveDemoPath: string;
    thumbnailPath: string;
}

const Projects:FunctionComponent<{}> = () => {
    const projectsList: Project[]  = [
        {
            title: "Miever.net",
            subTitle: "Welcome to my personal website, crafted with Miever UI!",
            liveDemoPath: "https://miever.net",
            thumbnailPath: "/thumbnail-miever.jpg",
            githubPath: "https://github.com/Miever1",
            description: "The main purpose of this project is that I want to show my true self, here you can see my resume, blog, and other information about me. Of course, I also want to apply what I know in technology to my personal web page, if you want to know, please check out the source code."
        },
        {
            title: "Miever UI",
            subTitle: "Crafting Beautiful User Interfaces Made Easy!",
            liveDemoPath: "https://components.miever.net",
            thumbnailPath: "/thumbnail-components.jpg",
            githubPath: "https://github.com/Components",
            description: "Miever UI is a personal React component library that offers a wide range of UI components designed to enhance the functionality and aesthetics of my web applications. With customizable styles and responsive designs, Miever UI simplifies the development process, enabling faster and more efficient creation of beautiful user interfaces."
        }

    ]
    return (
        <Box>
            {projectsList.map(item => {
                const { title, subTitle, liveDemoPath, githubPath, description, thumbnailPath } = item;
                return (
                    <Box paddingY={2}>
                        <Card
                            hoverable
                            title={title}
                            subTitle={(
                                <Box flexBox paddingX={1} justifyContent="space-between">
                                    <Box style={{ lineHeight: "29px" }}>
                                        {subTitle}
                                    </Box>
                                    <Box flexBox justifyContent="flex-end">
                                        <Tooltip overlay="Live Demo" placement="top">
                                            <Button
                                                size="sm"
                                                styleType="link"
                                                onClick={() => window.open(liveDemoPath)}
                                            >
                                                <Icon icon={["fas", "desktop"]} theme="primary" style={{ cursor: "pointer" }}/>
                                            </Button>
                                        </Tooltip>
                                        <Tooltip overlay="Github Res" placement="top">
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
