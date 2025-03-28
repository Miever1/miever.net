import * as React from "react"
import { graphql, HeadFC } from "gatsby"
import styled from '@emotion/styled'
import { Box, designs } from "miever_ui";
import { SEO } from "../../components/SEO";

const { BRAND_COLORS } = designs

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
  const commonStyle = `
    font-size: var(--chakra-fontSizes-6xl);
    margin: var(--chakra-space-6) 0;
    a {
      color: ${BRAND_COLORS.primary};
    }
  `
  let styleText = `
  background: rgba(255,255,255,.8);
  padding: var(--chakra-space-4);
  > h1 {
    ${commonStyle}
    font-size: var(--chakra-fontSizes-5xl);
    font-weight: 800;
  }
  > h2 {
    ${commonStyle}
    font-weight: 700;
    font-size: var(--chakra-fontSizes-4xl)
  }
  > h3 {
    ${commonStyle}
    font-weight: 500;
    font-size: var(--chakra-fontSizes-3xl)
  }
  > h4 {
    ${commonStyle}
    font-size: var(--chakra-fontSizes-2xl)
  }
  > h5 {
    ${commonStyle}
    font-size: var(--chakra-fontSizes-1xl)
  }
  > h6 {
    ${commonStyle}
    font-size: var(--chakra-fontSizes-lg)
  }
  > p {
    ${commonStyle}
    font-size: var(--chakra-fontSizes-lg);
  }
  > pre {
    color: #fff;
    padding: var(--chakra-space-2);
    background: rgb(42, 39, 52);
  }
  `
  return styleText
})

export default function BlogPostTemplate({
  data,
}: { data: any }) {
  const { markdownRemark } = data;
  const { html } = markdownRemark
  return (
      <BoxWrapper
        dangerouslySetInnerHTML={{ __html: html }}
      />
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

export const Head: HeadFC<BlogPostData> = ({ data }) => {
  if (!data?.markdownRemark) {
    return <SEO title="Miever Blog" description="Explore insightful articles on Miever." />;
  }

  const { frontmatter } = data.markdownRemark;
  const { title, description, slug, date, home_image } = frontmatter;

  const url = `https://miever.net/blogs/${slug}`;
  const image = home_image || "https://miever.s3.ap-east-1.amazonaws.com/static/main-logo.webp";
  const isoDate = new Date(date).toISOString();

  return (
    <SEO title={title} description={description} pathname={`/blogs/${slug}`} image={image}>
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="article" />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content="Miever Blog" />

      <link rel="canonical" href={url} />

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
              "url": "https://miever.s3.ap-east-1.amazonaws.com/static/main-logo.webp"
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
