// const postQuery = `{
//     posts: allMarkdownRemark(
//       filter: { fileAbsolutePath: { regex: "/posts/" } }
//     ) {
//       edges {
//         node {
//           objectID: id
//           frontmatter {
//             title
//             path
//             date(formatString: "MMM D, YYYY")
//             tags
//           }
//           excerpt(pruneLength: 5000)
//         }
//       }
//     }
//   }`;
// const flatten = arr =>
//   arr.map(({ node: { frontmatter, ...rest } }) => ({
//     ...frontmatter,
//     ...rest,
//   }));
// const settings = { attributesToSnippet: [`excerpt:20`] };
// const queries = [
//   {
//     query: pageQuery,
//     transformer: ({ data }) => flatten(data.pages.edges),
//     indexName: `Pages`,
//     settings,
//   },
//   {
//     query: postQuery,
//     transformer: ({ data }) => flatten(data.posts.edges),
//     indexName: `Posts`,
//     settings,
//   },
// ];
// module.exports = queries;
