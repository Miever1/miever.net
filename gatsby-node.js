const path = require(`path`);

const BLOG_POST_FILENAME_REGEX = /([0-9]+)-([0-9]+)-([0-9]+)-(.*?)\/index\.mdx$/;

const { createFilePath } = require(`gatsby-source-filesystem`);

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions;

  // Define a template for blog post
  const blogPostTemplate = path.resolve(`./src/templates/BlogPost/BlogPost.js`);

  // Get all markdown blog posts sorted by date
  const result = await graphql(
    `
      {
        allMdx(sort: { fields: [frontmatter___date], order: ASC }, limit: 1000) {
          edges {
            node {
              id
              frontmatter {
                date
                path
                title
              }
              fields {
                slug
              }
            }
          }
        }
      }
    `
  );

  if (result.errors) {
    reporter.panicOnBuild(`There was an error loading your blog posts`, result.errors);
    return;
  }
  const posts = result.data.allMdx.edges;
  // Create blog posts pages
  // But only if there's at least one markdown file found at "content/blog" (defined in gatsby-config.js)
  // `context` is available in the template as a prop and as a variable in GraphQL
  if (posts.length > 0) {
    posts.forEach(({ node: post }, index) => {
      createPage({
        path: post.fields.slug,
        component: blogPostTemplate,
        context: {
          prev: index === 0 ? null : posts[index - 1].frontmatter,
          next: index === posts.length - 1 ? null : posts[index + 1].frontmatter,
          slug: post.fields.slug,
          id: post.id,
        }, // additional data can be passed via context,
      });
    });
  }
};

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions;
  let slug;
  if (node.internal.type === `Mdx`) {
    const { relativePath } = getNode(node.parent);

    slug = createFilePath({ node, getNode, basePath: `blog/`, trailingSlash: false });
    const match = BLOG_POST_FILENAME_REGEX.exec(relativePath);

    if (match !== null) {
      const day = match[1];
      const month = match[2];
      const year = match[3];
      const filename = match[4];
      const date = new Date(year, month - 1, day);
      // Their slugs follow a pattern: /blog/<slug>.html
      // The date portion comes from the file name: <date>-<title>.mds
      createNodeField({
        name: `slug`,
        node,
        value: `/blog/${filename}`,
      });

      createNodeField({
        name: `date`,
        node,
        value: date.toJSON(),
      });
    } else {
      createNodeField({
        name: `slug`,
        node,
        value: slug,
      });
    }
  }
};

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions;

  // Explicitly define the siteMetadata {} object
  // This way those will always be defined even if removed from gatsby-config.js

  // Also explicitly define the Markdown frontmatter
  // This way the "MarkdownRemark" queries will return `null` even when no
  // blog posts are stored inside "content/blog" instead of returning an error
  createTypes(`
    type SiteSiteMetadata {
      author: Author
      siteUrl: String
      social: Social
    }
    type Author {
      name: String
      summary: String
    }
    type Social {
      twitter: String
    }
    type MarkdownRemark implements Node {
      frontmatter: Frontmatter
      fields: Fields
    }
    type Frontmatter {
      title: String
      description: String
      date: Date @dateformat
    }
    type Fields {
      slug: String
    }
  `);
};
