import * as React from "react"
import { graphql, HeadFC } from "gatsby"
import { SEO } from "../../components/SEO";
import { BoxWrapper } from "../blogs/{markdownRemark.frontmatter__slug}";

export default function DesignsTemplate({
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
      }
    }
  }
`

export const Head: HeadFC = ({ data }) => {
  // @ts-ignore
  const title = data?.markdownRemark?.frontmatter?.title || "Default Title";
  // @ts-ignore
  const description = data?.markdownRemark?.frontmatter?.description || "Default Description";

  return (
    <SEO title={title} description={description} />
  );
};
