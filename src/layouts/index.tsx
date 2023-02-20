
import React, { FunctionComponent, ReactElement } from "react";
import { navigate } from "gatsby";
import { useScroll } from 'ahooks';
import { Menu, Icon, Box, Button, Tooltip } from "miever_ui";
import { useLocation } from '@reach/router';
import ParticlesContainer from "./particles-container";

import "./layout.css"
import "miever_ui/dist/index.css"
 
const Layout: FunctionComponent<{
    children: ReactElement
}> = ({ children }) => {
    if (typeof document === 'undefined') return null;
    const scroll = useScroll(document);
    const location = useLocation();
    const { pathname } = location;
    const defaultKey = pathname === "/" ? "home" : pathname.split("/")[1];
    return (
        <Box>
            <ParticlesContainer />
            <Box
                flexBox
                direction="column"
                style={{ minHeight: "100vh" }}
                justifyContent="space-between"
            >
                <Box style={{ background: "#FFF", width: "100%", position: scroll?.top && scroll.top > 42 ? "fixed" : "relative" }}>
                    <Menu
                        defaultKey={defaultKey}
                        style={{
                            minWidth: "1200px",
                        }}
                        prefix={(
                            <Box
                                width="240px"
                                style={{
                                    backgroundImage: "url(/home.webp)",
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
                <Box padding={["/dashboard/", "/performance/"].includes(pathname) ? "" : "0 290px"} style={{ minWidth: "1200px", height: `${["/dashboard/", "/performance/"].includes(pathname) ? "100vh" : ""}` }}>
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
                        Copyright © 2022-2023 Miever
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}

export default Layout;