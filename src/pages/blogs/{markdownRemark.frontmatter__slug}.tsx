import * as React from "react"
import { graphql, HeadFC, navigate } from "gatsby"
import styled from '@emotion/styled'
import { Box, designs } from "miever_ui";
import { useTranslation } from "react-i18next";
import { SEO } from "../../components/SEO";
import Comments from "../../components/Comments";

interface BlogPostData {
  markdownRemark: {
    frontmatter: {
      title: string;
      description: string;
      slug: string;
      date: string;
      home_image?: string;
    };
  };
}

export const BoxWrapper = styled(Box)(() => {
  const { BRAND_COLORS: { primary } } = designs;
  const commonStyle = `
    font-size: var(--chakra-fontSizes-6xl);
    margin: var(--chakra-space-6) 0;
    color: ${primary};
  `
  let styleText = `
  background: var(--body-bg);
  padding: var(--chakra-space-4);
  a {
      color: ${primary};
  }
  > h1 {
    ${commonStyle}
    font-size: var(--chakra-fontSizes-5xl);
    font-weight: 800;
  }
  > h2 {
    ${commonStyle}
    font-weight: 700;
    font-size: var(--chakra-fontSizes-4xl);
  }
  > h3 {
    ${commonStyle}
    font-weight: 500;
    font-size: var(--chakra-fontSizes-3xl);
  }
  > h4 {
    ${commonStyle}
    font-size: var(--chakra-fontSizes-2xl);
  }
  > h5 {
    ${commonStyle}
    font-size: var(--chakra-fontSizes-1xl);
    color: ${primary};
  }
  > h6 {
    ${commonStyle}
    font-size: var(--chakra-fontSizes-lg);
    color: ${primary};
  }
  > p {
    font-size: var(--chakra-fontSizes-lg);
  }
  img {
    max-width: 100%;
    height: auto;
    border-radius: var(--radius-lg);
  }
  `
  return styleText
})

// Strip any inline HTML (e.g. `<code>`) a heading may contain.
const stripTags = (value: string): string => value.replace(/<[^>]+>/g, "");

// github-slugger-compatible slug, matching gatsby-remark-autolink-headers ids.
const slugify = (value: string): string =>
  stripTags(value)
    .trim()
    .toLowerCase()
    .replace(/[^\p{L}\p{N} -]+/gu, "")
    .replace(/\s+/g, "-");

// Rough reading time that also accounts for CJK text (no word spaces).
const readingMinutes = (html: string): number => {
  const text = html.replace(/<[^>]+>/g, " ");
  const cjk = (text.match(/[一-鿿]/g) || []).length;
  const words = (text.replace(/[一-鿿]/g, " ").match(/[A-Za-z0-9]+/g) || []).length;
  return Math.max(1, Math.round(words / 200 + cjk / 350));
};

export default function BlogPostTemplate({
  data,
}: { data: any }) {
  const { t } = useTranslation();
  const { markdownRemark, allMarkdownRemark } = data;
  const { html, headings, frontmatter } = markdownRemark;
  const { slug, date, language } = frontmatter;

  const minutes = readingMinutes(html);

  // TOC from h2/h3 headings (the body's single h1 is the title).
  const toc = (headings || []).filter((h: any) => h.depth === 2 || h.depth === 3);

  // Previous/next within the same language, by date (newest first).
  const siblings = (allMarkdownRemark?.nodes || []).filter(
    (n: any) => n.frontmatter.language === language,
  );
  const idx = siblings.findIndex((n: any) => n.frontmatter.slug === slug);
  const older = idx >= 0 ? siblings[idx + 1] : undefined;
  const newer = idx > 0 ? siblings[idx - 1] : undefined;

  const go = (to: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    navigate(to);
  };

  return (
    <Box className="blog-post">
      <div className="blog-meta">
        <span>{date}</span>
        <span className="blog-meta-dot">·</span>
        <span>{t("reading_time", { count: minutes })}</span>
      </div>

      {toc.length > 1 && (
        <nav className="blog-toc" aria-label={t("table_of_contents")}>
          <div className="blog-toc-title">{t("table_of_contents")}</div>
          <ul>
            {toc.map((h: any) => (
              <li key={h.value} className={`blog-toc-h${h.depth}`}>
                <a href={`#${slugify(h.value)}`}>{stripTags(h.value)}</a>
              </li>
            ))}
          </ul>
        </nav>
      )}

      <BoxWrapper dangerouslySetInnerHTML={{ __html: html }} />

      {(older || newer) && (
        <nav className="blog-prevnext" aria-label={t("post_navigation")}>
          {older ? (
            <a
              className="blog-prevnext-link blog-prevnext-prev"
              href={`/blogs${older.frontmatter.slug}`}
              onClick={go(`/blogs${older.frontmatter.slug}`)}
            >
              <span className="blog-prevnext-dir">← {t("older_post")}</span>
              <span className="blog-prevnext-title">{older.frontmatter.title}</span>
            </a>
          ) : (
            <span />
          )}
          {newer && (
            <a
              className="blog-prevnext-link blog-prevnext-next"
              href={`/blogs${newer.frontmatter.slug}`}
              onClick={go(`/blogs${newer.frontmatter.slug}`)}
            >
              <span className="blog-prevnext-dir">{t("newer_post")} →</span>
              <span className="blog-prevnext-title">{newer.frontmatter.title}</span>
            </a>
          )}
        </nav>
      )}

      <Comments />
    </Box>
  )
}

export const pageQuery = graphql`
  query($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      headings {
        depth
        value
      }
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        slug
        title
        description
        home_image
        language
      }
    }
    allMarkdownRemark(
      filter: { frontmatter: { type: { eq: "blogs" } } }
      sort: { frontmatter: { date: DESC } }
    ) {
      nodes {
        frontmatter {
          slug
          title
          language
        }
      }
    }
  }
`

export const Head: HeadFC<BlogPostData> = ({ data }) => {
  if (!data?.markdownRemark) {
    return <SEO title="Miever Blog" description="Explore insightful articles on Miever." />;
  }

  const { frontmatter } = data.markdownRemark;
  const { title, description, slug, date, home_image } = frontmatter;

  const url = `https://miever.net/blogs${slug}`;
  const image = home_image || "https://miever.s3.ap-east-1.amazonaws.com/static/miever-logo.webp";
  const isoDate = new Date(date).toISOString();

  return (
    <SEO title={title} description={description} pathname={`/blogs${slug}`} image={image} type="article">
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          "headline": title,
          "description": description,
          "image": image,
          "url": url,
          "datePublished": isoDate,
          "dateModified": isoDate,
          "author": {
            "@type": "Person",
            "name": "Miever"
          },
          "publisher": {
            "@type": "Person",
            "name": "Miever",
            "logo": {
              "@type": "ImageObject",
              "url": "https://miever.s3.ap-east-1.amazonaws.com/static/miever-logo.webp"
            }
          },
          "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": url
          }
        })}
      </script>
    </SEO>
  );
};
