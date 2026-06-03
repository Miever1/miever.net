import React, { FunctionComponent, useState } from "react";
import { navigate, graphql, useStaticQuery } from "gatsby"
import { Box, Card, PageHeader, Pagination } from "miever_ui";

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

    return (
        <Box className="content-list">
            <PageHeader title={t("navigation_blogs")} subtitle={t("blogs.description")} />
            <div className="card-list">
                {paged.map((item) => {
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
                            meta={tags?.length ? `${date}  ·  ${tags.join("  ·  ")}` : date}
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
