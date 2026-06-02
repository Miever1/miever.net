import React, { FunctionComponent } from "react";
import { navigate, graphql, useStaticQuery } from "gatsby"
import { Box, Card } from "miever_ui";
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
    pinned?: boolean;
}

const Blogs:FunctionComponent<{}> = () => {
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
                        language,
                        pinned
                    }
                  }
                }
              }
        }
    `);

    const posts: { node: { frontmatter: BlogInfo } }[] = edges
        .filter((item: { node: { frontmatter: BlogInfo } }) => {
            const { type, language } = item.node.frontmatter;
            return type === "blogs" && language === currentLanguage;
        })
        .sort((a: { node: { frontmatter: BlogInfo } }, b: { node: { frontmatter: BlogInfo } }) => {
            const aPinned = a.node.frontmatter.pinned ? 1 : 0;
            const bPinned = b.node.frontmatter.pinned ? 1 : 0;
            if (aPinned !== bPinned) {
                return bPinned - aPinned;
            }
            return (
                new Date(b.node.frontmatter.date).getTime() -
                new Date(a.node.frontmatter.date).getTime()
            );
        });

    return (
        <Box className="content-list">
            <header className="page-header">
                <h1 className="page-title">{t("navigation_blogs")}</h1>
                <p className="page-subtitle">{t("blogs.description")}</p>
            </header>
            <div className="card-list">
                {posts.map((item) => {
                    const { title, date, description, slug, home_image, tags } =
                        item.node.frontmatter;
                    const to = `/blogs${slug}`;
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
                            meta={date}
                            footer={
                                tags?.length ? (
                                    <span className="card-tags">
                                        {tags.map((tag) => (
                                            <span className="card-tag" key={tag}>
                                                {tag}
                                            </span>
                                        ))}
                                    </span>
                                ) : undefined
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

export default Blogs;
