
import React, { FunctionComponent, ReactElement, useState, useEffect } from "react";
import { navigate } from "gatsby";
// Gatsby 5's router (NOT @reach/router) — listen here so the active nav item
// follows client-side navigation on the persisted layout.
import { globalHistory } from "@gatsbyjs/reach-router";
import { useScroll } from 'ahooks';
import { useTheme } from "../components/Theme-Context";
import { Menu, Icon, Box, Button, Tooltip, Drawer, useBreakpoint } from "miever_ui";
import { useTranslation } from "react-i18next";

import ParticlesContainer from "./particles-container";

import "./layout.css"
import "miever_ui/style";

const Layout: FunctionComponent<{
    children: ReactElement;
    // Provided by gatsby-plugin-layout; updates on every navigation.
    location: { pathname: string };
}> = ({ children, location }) => {
    if (typeof document === 'undefined') return null;
    const { t, i18n } = useTranslation();
    const scroll = useScroll(document);
    // Track the path reactively: the location prop is correct on mount but the
    // persisted layout doesn't get a fresh one on client-side navigation.
    const [pathname, setPathname] = useState(location.pathname);
    useEffect(
        () => globalHistory.listen(({ location: loc }) => setPathname(loc.pathname)),
        [],
    );
    const { currentTheme, setTheme } = useTheme();
    const { isMobile } = useBreakpoint();
    const [drawerOpen, setDrawerOpen] = useState(false);

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

    const navItems = [
        { label: t("navigation_home"), key: "home" },
        { label: t("navigation_blogs"), key: "blogs" },
        { label: t("navigation_projects"), key: "projects" },
        { label: t("navigation_designs"), key: "designs" },
        { label: t("navigation_resume"), key: "resume" },
        { label: t("navigation_dashboard"), key: "dashboard" },
        { label: t("navigation_web_performance"), key: "performance" },
    ];

    const handleNavigate = (value: string) => {
        navigate(value === "home" ? "/" : `/${value}`);
        setDrawerOpen(false);
    };

    const toggleTheme = () => {
        if (currentTheme === "light") {
            setTheme("dark");
        } else if (currentTheme === "dark") {
            setTheme("system");
        } else {
            setTheme("light");
        }
    };

    const toggleLanguage = () => {
        const nextLocale = i18n.language === "en" ? "zh" : "en";
        i18n.changeLanguage(nextLocale);
        window.location.replace("/");
    };

    // Action buttons (language / theme / social) reused in the desktop suffix
    // and the mobile drawer. `inline` keeps the desktop tooltip+row layout.
    const renderActions = (inline: boolean) => (
        <Box
            flexBox
            direction={inline ? "row" : "column"}
            alignItems={inline ? "center" : "flex-start"}
            style={inline ? { marginRight: "24px" } : { gap: "8px", marginTop: "16px" }}
        >
            <Tooltip
                overlay={t(i18n.language === "en" ? "tooltip_switch_to_zh" : "tooltip_switch_to_en")}
                placement="bottom"
            >
                <Button style={{ padding: "8px" }} type="link" aria-label="Language" onClick={toggleLanguage}>
                    <Icon icon={["fas", "language"]} theme="primary" style={{ fontSize: "14px", cursor: "pointer" }} />
                    {!inline && <span style={{ marginLeft: "8px" }}>{t("language")}</span>}
                </Button>
            </Tooltip>
            <Tooltip overlay={t(themeIconItems[currentTheme].tooltip)} placement="bottom">
                <Button style={{ padding: "8px" }} type="link" aria-label="Theme" onClick={toggleTheme}>
                    <Icon icon={["fas", themeIconItems[currentTheme].icon]} theme="primary" style={{ fontSize: "14px", cursor: "pointer" }} />
                    {!inline && <span style={{ marginLeft: "8px" }}>{t(themeIconItems[currentTheme].tooltip)}</span>}
                </Button>
            </Tooltip>
            <Tooltip overlay="Github" placement="bottom">
                <Button style={{ padding: "8px" }} type="link" aria-label="Github" onClick={() => window.open("https://github.com/Miever1")}>
                    <Icon icon={["fab", "github"]} theme="primary" style={{ fontSize: "14px", cursor: "pointer" }} />
                    {!inline && <span style={{ marginLeft: "8px" }}>Github</span>}
                </Button>
            </Tooltip>
            <Tooltip overlay={t("mail")} placement="bottom">
                <Button style={{ padding: "8px" }} type="link" aria-label="Mail" onClick={() => window.location.href = 'mailto:miever1@163.com'}>
                    <Icon icon={["fas", "envelope"]} theme="primary" style={{ fontSize: "14px", cursor: "pointer" }} />
                    {!inline && <span style={{ marginLeft: "8px" }}>{t("mail")}</span>}
                </Button>
            </Tooltip>
            <Tooltip overlay={t("linkedin")} placement="bottom">
                <Button style={{ padding: "8px" }} type="link" aria-label="LinkedIn" onClick={() => window.open("https://www.linkedin.com/in/aerman-huofuer-413328280/")}>
                    <Icon icon={["fab", "linkedin"]} theme="primary" style={{ fontSize: "14px", cursor: "pointer" }} />
                    {!inline && <span style={{ marginLeft: "8px" }}>{t("linkedin")}</span>}
                </Button>
            </Tooltip>
        </Box>
    );

    const logo = (
        <Box
            width="240px"
            height="100%"
            style={{
                backgroundImage: "url(https://miever.s3.ap-east-1.amazonaws.com/static/miever-logo.webp)",
                backgroundPosition: "24px",
                backgroundSize: "180px",
                backgroundRepeat: "no-repeat",
                cursor: "pointer",
                width: "240px",
                minHeight: "48px",
            }}
            onClick={() => window.location.replace("/")}
        />
    );

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
                    {isMobile ? (
                        <Box
                            flexBox
                            justifyContent="space-between"
                            alignItems="center"
                            style={{ padding: "4px 16px", height: "56px" }}
                        >
                            {logo}
                            <Button
                                type="link"
                                aria-label={t("navigation_menu") || "Menu"}
                                style={{ padding: "8px" }}
                                onClick={() => setDrawerOpen(true)}
                            >
                                <Icon icon={["fas", "bars"]} theme="primary" style={{ fontSize: "20px", cursor: "pointer" }} />
                            </Button>
                        </Box>
                    ) : (
                        <Menu
                            style={{ margin: 0 }}
                            activeKey={defaultKey}
                            prefix={logo}
                            suffix={renderActions(true)}
                            items={navItems}
                            onSelect={handleNavigate}
                        />
                    )}
                </Box>

                <Drawer
                    open={drawerOpen}
                    placement="right"
                    title="MIEVER"
                    onClose={() => setDrawerOpen(false)}
                >
                    <Menu
                        mode="vertical"
                        activeKey={defaultKey}
                        items={navItems}
                        onSelect={handleNavigate}
                    />
                    {renderActions(false)}
                </Drawer>

                <Box
                    className={`content-area${
                        ["/dashboard/", "/performance/"].includes(pathname) ? " content-flush" : ""
                    }`}
                    style={{ height: `${["/dashboard/", "/performance/"].includes(pathname) ? "100vh" : ""}` }}
                >
                    {children}
                </Box>
                <footer className="site-footer">
                    <div className="site-footer-inner">
                        <div className="site-footer-brand">
                            <span className="site-footer-name">Aerman</span>
                            <span className="site-footer-tagline">{t("hero_eyebrow")}</span>
                            <div className="site-footer-social">
                                <a
                                    href="https://github.com/Miever1"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="GitHub"
                                >
                                    <Icon icon={["fab", "github"]} />
                                </a>
                                <a
                                    href="https://www.linkedin.com/in/aerman-huofuer-413328280/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="LinkedIn"
                                >
                                    <Icon icon={["fab", "linkedin"]} />
                                </a>
                                <a href="mailto:miever1@163.com" aria-label={t("mail")}>
                                    <Icon icon={["fas", "envelope"]} />
                                </a>
                            </div>
                        </div>
                        <nav className="site-footer-col" aria-label={t("footer_explore")}>
                            <span className="site-footer-col-title">{t("footer_explore")}</span>
                            {[
                                { to: "/", key: "navigation_home" },
                                { to: "/blogs", key: "navigation_blogs" },
                                { to: "/projects", key: "navigation_projects" },
                                { to: "/designs", key: "navigation_designs" },
                                { to: "/resume", key: "navigation_resume" },
                            ].map((item) => (
                                <a
                                    key={item.to}
                                    href={item.to}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        navigate(item.to);
                                    }}
                                >
                                    {t(item.key)}
                                </a>
                            ))}
                        </nav>
                        <nav className="site-footer-col" aria-label={t("footer_resources")}>
                            <span className="site-footer-col-title">{t("footer_resources")}</span>
                            <a
                                href="/blogs/privacy-notice"
                                onClick={(e) => {
                                    e.preventDefault();
                                    navigate("/blogs/privacy-notice");
                                }}
                            >
                                {t("privacy_notice")}
                            </a>
                            <a href="https://components.miever.net" target="_blank" rel="noopener noreferrer">
                                {t("footer_design_credit")}
                            </a>
                            <a
                                href="https://github.com/Miever1/miever.net/blob/master/LICENSE"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                {t("license")}
                            </a>
                        </nav>
                    </div>
                    <div className="site-footer-bottom">{t("footer_copyright")}</div>
                </footer>
            </Box>
        </Box>
    );
}

export default Layout;
