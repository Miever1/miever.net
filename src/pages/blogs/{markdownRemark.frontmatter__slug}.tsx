import * as React from "react"
import { graphql, HeadFC } from "gatsby"
import styled from '@emotion/styled'
import { Box } from "miever_ui";

const BoxWrapper = styled(Box)(() => {
  const commonStyle = `
    font-size: var(--chakra-fontSizes-6xl);
    margin: var(--chakra-space-6) 0;
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
  > ul > li {
    font-weight: 800;
  }
  `
  return styleText
})

export default function BlogPostTemplate({
  data, // this prop will be injected by the GraphQL query below.
}: { data: any }) {
  const { markdownRemark } = data // data.markdownRemark holds your post data
  const { html } = markdownRemark
  return (
      <BoxWrapper
        //@ts-ignore
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

export const Head: HeadFC = ({ data }: {data: any}) => {
  const { markdownRemark: { frontmatter } } = data;
  return (
    <title>{`Miever-${frontmatter.title}`}</title>
  )
}