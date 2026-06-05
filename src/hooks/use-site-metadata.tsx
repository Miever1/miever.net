import { graphql, useStaticQuery } from "gatsby"

export const useSiteMetadata = () => {
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
          description
          siteUrl
          author
          social {
            github
            linkedin
            email
          }
        }
      }
    }
  `)

  return data.site.siteMetadata
}