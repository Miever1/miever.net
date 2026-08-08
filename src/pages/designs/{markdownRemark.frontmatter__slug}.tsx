import * as React from "react"
import { graphql, HeadFC } from "gatsby"
import { useTranslation } from "react-i18next";
import { SEO } from "../../components/SEO";
import Comments  from "../../components/Comments";
import Breadcrumb from "../../components/Breadcrumb";
import ShareButtons from "../../components/ShareButtons";
import ErrorBoundary from "../../components/ErrorBoundary";

import { Box } from "miever_ui";
import { BoxWrapper } from "../blogs/{markdownRemark.frontmatter__slug}";
import { ReadingProgress, BackToTop } from "../../components/ReadingAids";

export default function DesignsTemplate({
  data,
}: { data: any }) {
  const { t } = useTranslation();
  const { markdownRemark } = data;
  const { html, frontmatter } = markdownRemark;
  const { title, date, slug } = frontmatter;
  return (
      <Box className="design-post">
        <ReadingProgress />
        <Breadcrumb
          items={[
            { label: t("navigation_home"), to: "/" },
            { label: t("navigation_designs"), to: "/designs" },
            { label: title },
          ]}
        />
        {date && (
          <div className="blog-meta">
            <span>{date}</span>
          </div>
        )}
        <ErrorBoundary fallback={<p className="content-error">{t("content_error")}</p>}>
          <BoxWrapper
            dangerouslySetInnerHTML={{ __html: html }}
          />
        </ErrorBoundary>
        <ShareButtons url={`https://miever.net/designs${slug}`} title={title} />
        <Comments />
        <BackToTop />
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
        title,
        description,
        home_image
      }
    }
  }
`

interface DesignsPostData {
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

export const Head: HeadFC<DesignsPostData> = ({ data }) => {
  if (!data?.markdownRemark) {
    return <SEO title="Miever Designs" description="Explore design projects and case studies on Miever." />;
  }

  const { frontmatter } = data.markdownRemark;
  const { title, description, slug, date, home_image } = frontmatter;

  const url = `https://miever.net/designs${slug}`;
  const image = home_image || "https://miever.s3.ap-east-1.amazonaws.com/static/miever-logo.webp";
  const isoDate = new Date(date).toISOString();

  return (
    <SEO title={title} description={description} pathname={`/designs${slug}`} image={image}>
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "CreativeWork",
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
