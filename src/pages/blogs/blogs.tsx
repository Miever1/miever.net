import React, { FunctionComponent, ReactNode, useState } from "react";
import { navigate, graphql, useStaticQuery } from "gatsby"
import { Box, Card, PageHeader, Pagination, Tag } from "miever_ui";

const PAGE_SIZE = 6;
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

    const [page, setPage] = useState(1);
    const paged = posts.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

    // On the first page, lead with the top post (pinned/newest) as a large
    // featured card; the rest flow into a responsive grid.
    const featured = page === 1 ? paged[0] : undefined;
    const rest = page === 1 ? paged.slice(1) : paged;

    const renderMeta = (date: string, tags?: string[]): ReactNode => (
        <span className="card-meta-row">
            <span className="card-meta-date">{date}</span>
            {tags?.slice(0, 3).map((tag) => (
                <Tag key={tag} className="card-tag">{tag}</Tag>
            ))}
        </span>
    );

    const goTo = (to: string) => (e: React.MouseEvent) => {
        e.preventDefault();
        navigate(to);
    };

    return (
        <Box className="content-list">
            <PageHeader title={t("navigation_blogs")} subtitle={t("blogs.description")} />

            {featured && (() => {
                const { title, date, description, slug, home_image, tags } =
                    featured.node.frontmatter;
                const to = `/blogs${slug}`;
                return (
                    <Card
                        className="post-featured"
                        hoverable
                        orientation="horizontal"
                        clamp={3}
                        href={to}
                        onClick={goTo(to)}
                        cover={<img src={home_image} alt={title} loading="lazy" />}
                        title={title}
                        meta={renderMeta(date, tags)}
                    >
                        {description}
                    </Card>
                );
            })()}

            <div className="post-grid">
                {rest.map((item) => {
                    const { title, date, description, slug, home_image, tags } =
                        item.node.frontmatter;
                    const to = `/blogs${slug}`;
                    return (
                        <Card
                            key={slug}
                            hoverable
                            clamp={3}
                            href={to}
                            onClick={goTo(to)}
                            cover={<img src={home_image} alt={title} loading="lazy" />}
                            title={title}
                            meta={renderMeta(date, tags)}
                        >
                            {description}
                        </Card>
                    );
                })}
            </div>
            {posts.length > PAGE_SIZE && (
                <div className="pagination-row">
                    <Pagination
                        total={posts.length}
                        pageSize={PAGE_SIZE}
                        current={page}
                        onChange={(next) => {
                            setPage(next);
                            window.scrollTo({ top: 0, behavior: "smooth" });
                        }}
                    />
                </div>
            )}
        </Box>
    );
}

export default Blogs;
