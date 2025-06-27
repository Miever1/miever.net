import * as React from "react"
import { graphql, HeadFC } from "gatsby"
import { SEO } from "../../components/SEO";
import Comments  from "../../components/Comments";

import { Box } from "miever_ui";
import { BoxWrapper } from "../blogs/{markdownRemark.frontmatter__slug}";

export default function DesignsTemplate({
  data,
}: { data: any }) {
  const { markdownRemark } = data;
  const { html } = markdownRemark
  return (
      <Box>
        <BoxWrapper
          dangerouslySetInnerHTML={{ __html: html }}
        />
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

  const url = `https://miever.net/designs/${slug}`;
  const image = home_image || "https://miever.s3.ap-east-1.amazonaws.com/static/miever-logo.webp";
  const isoDate = new Date(date).toISOString();

  return (
    <SEO title={title} description={description} pathname={`/designs/${slug}`} image={image}>
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content="Miever Designs" />

      <link rel="canonical" href={url} />

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
