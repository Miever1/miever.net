
import React, { FunctionComponent, ReactElement } from "react";
import { navigate } from "gatsby";
import { useScroll } from 'ahooks';
import { useTheme } from "../components/Theme-Context";
import { Menu, Icon, Box, Button, Tooltip } from "miever_ui";
import { useLocation } from '@reach/router';
import { useTranslation } from "react-i18next";

import ParticlesContainer from "./particles-container";

import "./layout.css"
import "miever_ui/style";
 
const Layout: FunctionComponent<{
    children: ReactElement
}> = ({ children }) => {
    if (typeof document === 'undefined') return null;
    const { t, i18n } = useTranslation();
    const scroll = useScroll(document);
    const location = useLocation();
    const { pathname } = location;
    const { currentTheme, setTheme } = useTheme();

    const themeIconItems : {
        [key: string]: {
            icon: "moon" | "sun" | "adjust";
            tooltip: string;
        }
    } = {
        "light": {
            icon: "sun",
            tooltip: t("light_theme")
        },
        "dark": {
            icon: "moon",
            tooltip: t("dark_theme")
        },
        "system": {
            icon: "adjust",
            tooltip: t("system_theme")
        }
    };
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
                                height="100%"
                                style={{
                                    backgroundImage: "url(https://miever.s3.ap-east-1.amazonaws.com/static/miever-logo.webp)",
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
                                <Tooltip
                                    overlay={t(i18n.language === "en" ? "tooltip_switch_to_zh" : "tooltip_switch_to_en")}
                                    placement="bottom"
                                >
                                    <Button
                                        style={{ padding: "8px" }}
                                        styleType="link"
                                        aria-label="Language"
                                        onClick={() => {
                                            const nextLocale = i18n.language === "en" ? "zh" : "en";
                                            i18n.changeLanguage(nextLocale);
                                            window.location.replace("/");
                                        }}
                                    >
                                        <Icon
                                            icon={["fas", "language"]}
                                            theme="primary"
                                            style={{ fontSize: "14px", cursor: "pointer" }}
                                        />
                                    </Button>
                                </Tooltip>
                                <Tooltip
                                    overlay={t(themeIconItems[currentTheme].tooltip)}
                                    placement="bottom"
                                >
                                    <Button
                                        style={{ padding: "8px" }}
                                        styleType="link"
                                        aria-label="Theme"
                                        onClick={() => {
                                            if (currentTheme === "light") {
                                                setTheme("dark");
                                            } else if (currentTheme === "dark") {
                                                setTheme("system");
                                            } else {
                                                setTheme("light");
                                            }
                                        }}
                                    >
                                        <Icon
                                            icon={["fas", themeIconItems[currentTheme].icon]}
                                            theme="primary"
                                            style={{ fontSize: "14px", cursor: "pointer" }}
                                        />
                                    </Button>
                                </Tooltip> 
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
                                <Tooltip overlay={t("mail")} placement="bottom">
                                    <Button
                                        style={{ padding: "8px"}}
                                        styleType="link"
                                        aria-label="Mail"
                                        onClick={() => window.location.href = 'mailto:miever1@163.com'}
                                    >
                                        <Icon icon={["fas", "envelope"]} theme="primary" style={{ fontSize: "14px", cursor: "pointer" }}/>
                                    </Button>
                                </Tooltip>
                                <Tooltip overlay={t("linkedin")} placement="bottom">
                                    <Button
                                        style={{ padding: "8px"}}
                                        styleType="link"
                                        aria-label="LinkedIn"
                                        onClick={() => window.open("https://www.linkedin.com/in/aerman-huofuer-413328280/")}
                                    >
                                        <Icon icon={["fab", "linkedin"]} theme="primary" style={{ fontSize: "14px", cursor: "pointer" }}/>
                                    </Button>
                                </Tooltip>
                            </Box>
                        )}
                        items={[
                            {
                                label: t("navigation_home"),
                                key: "home"
                            },
                            {
                                label: t("navigation_blogs"),
                                key: "blogs"
                            },
                            {
                                label: t("navigation_projects"),
                                key: "projects"
                            },
                            {
                                label: t("navigation_designs"),
                                key: "designs"
                            },
                            {
                                label: t("navigation_resume"),
                                key: "resume"
                            },
                            {
                                label: t("navigation_dashboard"),
                                key: "dashboard"
                            },
                            {
                                label: t("navigation_web_performance"),
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
                    <Box>
                        <Button
                            styleType="link"
                            size="sm"
                            onClick={() => navigate("/blogs/privacy-notice")}
                        >
                            {t("privacy_notice")}
                        </Button>
                        <Button
                            styleType="link"
                            size="sm"
                            onClick={() => window.open("https://components.miever.net")}
                        >
                            {t("footer_design_credit")}
                        </Button>
                        <Button
                            styleType="link"
                            size="sm"
                            onClick={() => navigate("https://github.com/Miever1/miever.net/blob/master/LICENSE")}
                        >
                            {t("license")}
                        </Button>
                    </Box>
                    <Box
                        paddingY={4}
                        style={{ fontSize: "12px" }}
                    >
                        {t("footer_copyright")}
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}

export default Layout;