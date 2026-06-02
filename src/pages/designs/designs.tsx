import React, { FunctionComponent } from "react";
import { navigate, graphql, useStaticQuery } from "gatsby"
import { Box, Card, Button } from "miever_ui";
import { useTranslation } from "react-i18next";

interface BlogInfo {
    type: "blogs" | "designs";
    language: "en" | "zh";
    title: string;
    date: string;
    description: string;
    slug: string;
    home_image: string;
    tags: string[];
    liveDemoPath: string;
}

const Designs:FunctionComponent<{}> = () => {
    const { t, i18n } = useTranslation();
    const currentLanguage = i18n.language;

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
                        type,
                        liveDemoPath,
                        language
                    }
                  }
                }
              }
        }
    `);

    const works: { node: { frontmatter: BlogInfo } }[] = edges
        .filter((item: { node: { frontmatter: BlogInfo } }) => {
            const { type, language } = item.node.frontmatter;
            return type === "designs" && language === currentLanguage;
        })
        .sort((a: { node: { frontmatter: BlogInfo } }, b: { node: { frontmatter: BlogInfo } }) =>
            (b.node?.frontmatter?.date || "").localeCompare(a.node?.frontmatter?.date || "")
        );

    return (
        <Box className="content-list">
            <header className="page-header">
                <h1 className="page-title">{t("navigation_designs")}</h1>
                <p className="page-subtitle">{t("designs.description")}</p>
            </header>
            <div className="card-list">
                {works.map((item) => {
                    const { title, liveDemoPath, description, slug, home_image, tags } =
                        item.node.frontmatter;
                    const to = `/designs${slug}`;
                    return (
                        <Card
                            key={slug}
                            hoverable
                            orientation="horizontal"
                            clamp={3}
                            href={to}
                            onClick={(e) => {
                                e.preventDefault();
                                navigate(to);
                            }}
                            cover={<img src={home_image} alt={title} loading="lazy" />}
                            title={title}
                            footer={
                                <>
                                    {tags?.length ? (
                                        <span className="card-tags">
                                            {tags.map((tag) => (
                                                <span className="card-tag" key={tag}>
                                                    {tag}
                                                </span>
                                            ))}
                                        </span>
                                    ) : null}
                                    {liveDemoPath && (
                                        <Button
                                            size="sm"
                                            type="link"
                                            style={{ marginLeft: "auto" }}
                                            onClick={(e) => {
                                                e.preventDefault();
                                                e.stopPropagation();
                                                window.open(liveDemoPath);
                                            }}
                                        >
                                            {t("live_demo")} ↗
                                        </Button>
                                    )}
                                </>
                            }
                        >
                            {description}
                        </Card>
                    );
                })}
            </div>
        </Box>
    );
}

export default Designs;
