import React, { FunctionComponent, ReactNode, useState } from "react";
import { navigate, graphql, useStaticQuery } from "gatsby"
import { getImage, getSrc, getSrcSet } from "gatsby-plugin-image"
import { Box, Card, Input, PageHeader, Pagination, Tag } from "miever_ui";
import { BackToTop } from "../../components/ReadingAids";

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
                    fields {
                        homeImageFile {
                            childImageSharp {
                                gatsbyImageData(
                                    width: 800
                                    layout: CONSTRAINED
                                    formats: [AUTO, WEBP]
                                    placeholder: NONE
                                )
                            }
                        }
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

    const [query, setQuery] = useState("");
    const [page, setPage] = useState(1);

    // Client-side filter over the already-loaded posts: title, description, tags.
    const term = query.trim().toLowerCase();
    const filtered = term
        ? posts.filter(({ node: { frontmatter: f } }) =>
              [f.title, f.description, ...(f.tags || [])]
                  .join(" ")
                  .toLowerCase()
                  .includes(term),
          )
        : posts;

    // When browsing (no search), the top post is featured (full width) and the
    // grid paginates the *rest* — so each grid page holds a full PAGE_SIZE set
    // and rows stay even (1 featured + 6 grid, not 1 + 5). While searching,
    // every match flows into the plain grid.
    const showFeatured = !term;
    const gridSource = showFeatured ? filtered.slice(1) : filtered;
    const paged = gridSource.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
    const featured = showFeatured && page === 1 ? filtered[0] : undefined;
    const rest = paged;

    const onSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(e.target.value);
        setPage(1);
    };

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

    // Use the build-time optimized, responsive image when available; fall back
    // to the raw remote URL if the download failed at build.
    const renderCover = (node: any, title: string): ReactNode => {
        const imageData = getImage(node.fields?.homeImageFile);
        if (imageData) {
            return (
                <img
                    src={getSrc(imageData)}
                    srcSet={getSrcSet(imageData)}
                    sizes="(max-width: 768px) 100vw, 50vw"
                    alt={title}
                    loading="lazy"
                />
            );
        }
        return <img src={node.frontmatter.home_image} alt={title} loading="lazy" />;
    };

    return (
        <Box className="content-list">
            <PageHeader title={t("navigation_blogs")} subtitle={t("blogs.description")} />

            <div className="search-bar">
                <Input
                    icon="magnifying-glass"
                    placeholder={t("search_blogs")}
                    aria-label={t("search_blogs")}
                    value={query}
                    onChange={onSearch}
                />
            </div>

            {filtered.length === 0 && (
                <Box className="search-empty">{t("search_no_results")}</Box>
            )}

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
                        cover={renderCover(featured.node, title)}
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
                            cover={renderCover(item.node, title)}
                            title={title}
                            meta={renderMeta(date, tags)}
                        >
                            {description}
                        </Card>
                    );
                })}
            </div>
            {gridSource.length > PAGE_SIZE && (
                <div className="pagination-row">
                    <Pagination
                        total={gridSource.length}
                        pageSize={PAGE_SIZE}
                        current={page}
                        onChange={(next) => {
                            setPage(next);
                            window.scrollTo({ top: 0, behavior: "smooth" });
                        }}
                    />
                </div>
            )}
            <BackToTop />
        </Box>
    );
}

export default Blogs;
