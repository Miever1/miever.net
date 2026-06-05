import React, { FunctionComponent } from "react";
import { navigate, graphql, useStaticQuery } from "gatsby"
import { getImage, getSrc, getSrcSet } from "gatsby-plugin-image"
import { Box, PageHeader } from "miever_ui";
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
                    fields {
                        homeImageFile {
                            childImageSharp {
                                gatsbyImageData(
                                    width: 700
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
            <PageHeader title={t("navigation_designs")} subtitle={t("designs.description")} />
            <div className="gallery-grid">
                {works.map((item) => {
                    const { title, slug, home_image, tags } = item.node.frontmatter;
                    const to = `/designs${slug}`;
                    const imageData = getImage((item.node as any).fields?.homeImageFile);
                    return (
                        <a
                            key={slug}
                            className="gallery-tile"
                            href={to}
                            aria-label={title}
                            onClick={(e) => {
                                e.preventDefault();
                                navigate(to);
                            }}
                        >
                            <img
                                className="gallery-tile-img"
                                src={imageData ? getSrc(imageData) : home_image}
                                srcSet={imageData ? getSrcSet(imageData) : undefined}
                                sizes="(max-width: 768px) 100vw, 33vw"
                                alt={title}
                                loading="lazy"
                            />
                            <div className="gallery-tile-overlay">
                                {tags?.length ? (
                                    <div className="gallery-tile-tags">
                                        {tags.slice(0, 3).map((tag) => (
                                            <span key={tag} className="gallery-tile-tag">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                ) : null}
                                <div className="gallery-tile-title">{title}</div>
                            </div>
                        </a>
                    );
                })}
            </div>
        </Box>
    );
}

export default Designs;
