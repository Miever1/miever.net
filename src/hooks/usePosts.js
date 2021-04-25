import { graphql, useStaticQuery } from 'gatsby';

export const usePosts = () => {
  const data = useStaticQuery(graphql`
    query {
      allMdx(sort: { order: DESC, fields: [frontmatter___date] }) {
        totalCount
        edges {
          node {
            id
            fields {
              slug
            }
            frontmatter {
              title
              date(formatString: "MMMM DD, YYYY")
              path
              tags
              excerpt
              headerImage {
                childImageSharp {
                  gatsbyImageData(width: 300, height: 300, placeholder: BLURRED, formats: [AUTO, WEBP, AVIF])
                }
              }
              featuredImage {
                childImageSharp {
                  gatsbyImageData(width: 300, height: 300, placeholder: BLURRED, formats: [AUTO, WEBP, AVIF])
                }
              }
            }
          }
        }
      }
    }
  `);
  return {
    totalCount: data.allMdx.totalCount,
    posts: data.allMdx.edges.map(({ node: { frontmatter, id, fields } }) => ({
      title: frontmatter.title,
      tags: frontmatter.tags,
      path: frontmatter.path,
      excerpt: frontmatter.excerpt,
      date: frontmatter.date,
      id: id,
      slug: fields.slug,
      featuredImage: frontmatter.featuredImage,
    })),
  };
};

export default usePosts;
