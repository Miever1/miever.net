
import React, { FunctionComponent, ReactElement } from "react";
import { navigate } from "gatsby"
import { Menu, Icon, Box, Button } from "miever_ui";
import { useLocation } from '@reach/router';
 
const Layout: FunctionComponent<{
    children: ReactElement
}> = ({ children }) => {
    const location = useLocation();
    const { pathname } = location;
    const defaultKey = pathname === "/" ? "home" : pathname.split("/")[1];

    return (
        <Box
            flexBox
            direction="column"
            style={{ minHeight: "100vh" }}
            justifyContent="space-between"
        >
            <Box padding="4px 0 0 0">
                <Menu
                    defaultKey={defaultKey}
                    style={{
                        minWidth: "1200px"
                    }}
                    prefix={(
                        <Box
                            width="240px"
                            style={{
                                backgroundImage: "url(/home.png)",
                                backgroundPosition: "24px",
                                backgroundSize: "180px",
                                backgroundRepeat: "no-repeat",
                                cursor: "pointer"
                            }}
                            onClick={() => window.location.replace("/")}
                        />
                    )}
                    suffix={(
                      <Box flexBox alignItems="center" style={{ paddingLeft: "500px" }}>
                        <Button
                            styleType="link"
                            onClick={() => window.open("https://github.com/Miever1")}
                        >
                            <Icon icon={["fab", "github"]} theme="primary" style={{ fontSize: "14px", cursor: "pointer" }}/>
                        </Button>
                      </Box>
                    )}
                    items={[
                        {
                            label: "Home",
                            key: "home"
                        },
                        {
                            label: "Dashboard",
                            key: "dashboard"
                        },
                        {
                            label: "Blogs",
                            key: "blogs"
                        },
                        {
                            label: "Resume",
                            key: "resume"
                        },
                    ]}
                    onSelect={(value: string) => {
                        navigate(value === "home" ? "/" : `/${value}`)
                    }}
                />
            </Box>
            <Box padding={pathname === "/dashboard/" ? "" : "0 290px"} style={{ minWidth: "1200px", height: `${pathname === "/dashboard/" ? "calc(100vh - 80px)" : ""}` }}>
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
    );
}

export default Layout;