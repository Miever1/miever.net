
import React, { FunctionComponent, ReactElement } from "react";
import { navigate } from "gatsby";
import { useScroll } from 'ahooks';
import { Menu, Icon, Box, Button, Tooltip } from "miever_ui";
import { useLocation } from '@reach/router';

import ParticlesContainer from "./particles-container";

import "./layout.css"
import 'miever_ui/style';
 
const Layout: FunctionComponent<{
    children: ReactElement
}> = ({ children }) => {
    if (typeof document === 'undefined') return null;
    const scroll = useScroll(document);
    const location = useLocation();
    const { pathname } = location;
    const isFixed = scroll?.top && scroll.top > 42;
    const defaultKey = pathname === "/" ? "home" : pathname.split("/")[1];
    return (
        <Box
            width="100%"
        >
            <ParticlesContainer />
            <Box
                flexBox
                direction="column"
                style={{
                    width: "100%",
                    minHeight: "100vh"
                }}
                justifyContent="space-between"
            >
                <Box className={`menu-container ${isFixed ? 'menu-fixed' : ''}`}>
                    <Menu
                        style={{
                            margin: 0,
                        }}
                        defaultKey={defaultKey}
                        prefix={(
                            <Box
                                width="240px"
                                style={{
                                    backgroundImage: "url(https://miever.s3.ap-east-1.amazonaws.com/static/main-logo.webp)",
                                    backgroundPosition: "24px",
                                    backgroundSize: "180px",
                                    backgroundRepeat: "no-repeat",
                                    cursor: "pointer",
                                    width: "240px"
                                }}
                                onClick={() => window.location.replace("/")}
                            />
                        )}
                        suffix={(
                            <Box flexBox alignItems="center" style={{ marginRight: "24px" }}>
                                <Tooltip overlay="Github" placement="bottom">
                                    <Button
                                        style={{ padding: "8px"}}
                                        styleType="link"
                                        aria-label="Github"
                                        onClick={() => window.open("https://github.com/Miever1")}
                                    >
                                        <Icon icon={["fab", "github"]} theme="primary" style={{ fontSize: "14px", cursor: "pointer" }}/>
                                    </Button>
                                </Tooltip>
                                <Tooltip overlay="Mail" placement="bottom">
                                    <a href="mailto:miever1@163.com" aria-label="Mail">
                                        <Button
                                            style={{ padding: "8px"}}
                                            styleType="link"
                                            aria-label="Mail"
                                        >
                                            <Icon icon={["fas", "envelope"]} theme="primary" style={{ fontSize: "14px", cursor: "pointer" }}/>
                                        </Button>
                                    </a>
                                </Tooltip>
                                <Tooltip overlay="LinkedIn" placement="bottom">
                                    <Button
                                        style={{ padding: "8px"}}
                                        styleType="link"
                                        aria-label="LinkedIn"
                                        onClick={() => window.open("https://www.linkedin.com/in/aerman-huofuer-413328280/")}
                                    >
                                        <Icon icon={["fab", "linkedin"]} theme="primary" style={{ fontSize: "14px", cursor: "pointer" }}/>
                                    </Button>
                                </Tooltip>
                                <Tooltip overlay="Instgram" placement="bottom">
                                    <Button
                                        style={{ padding: "8px"}}
                                        styleType="link"
                                        aria-label="Instgram"
                                        onClick={() => window.open("https://www.instagram.com/imiever7/profilecard/?igsh=MXFyMHJ1OWkxZmhqag==")}
                                    >
                                        {/* @ts-ignore */}
                                        <Icon icon={["fab", "square-instagram"]} theme="primary" style={{ fontSize: "14px", cursor: "pointer" }}/>
                                    </Button>
                                </Tooltip>
                            </Box>
                        )}
                        items={[
                            {
                                label: "Home",
                                key: "home"
                            },
                            {
                                label: "Blogs",
                                key: "blogs"
                            },
                            {
                                label: "Projects",
                                key: "projects"
                            },
                            {
                                label: "Resume",
                                key: "resume"
                            },
                            {
                                label: "Dashboard",
                                key: "dashboard"
                            },
                            {
                                label: "Web Performance",
                                key: "performance"
                            }
                        ]}
                        onSelect={(value: string) => {
                            navigate(value === "home" ? "/" : `/${value}`)
                        }}
                    />
                </Box>
                <Box 
                    padding={["/dashboard/", "/performance/"].includes(pathname) ? "" : "8px 290px"} 
                    style={{ minWidth: "1200px", height: `${["/dashboard/", "/performance/"].includes(pathname) ? "100vh" : ""}` }}
                >
                    {children}
                </Box>
                <Box
                    flexBox
                    height={120}
                    direction="column"
                    justifyContent="center"
                    alignItems="center"
                    paddingY={8}
                    style={{ minWidth: "1200px" }}
                >
                    <Button
                        styleType="link"
                        onClick={() => window.open("https://components.miever.net")}
                    >
                        The website is designed by miever_ui!
                    </Button>
                    <Box
                        style={{ fontSize: "12px" }}
                    >
                        Copyright © 2024-2025 Miever
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}

export default Layout;