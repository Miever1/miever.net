import * as path from "path";
import type { GatsbyNode } from "gatsby";
import { createRemoteFileNode } from "gatsby-source-filesystem";

/**
 * When developing miever_ui locally via `npm link`, the linked package resolves
 * `react` / `react-dom` from its own node_modules, producing a second React
 * instance and the dreaded "Invalid hook call" error. Force every import to
 * resolve to this project's single copy.
 */
export const onCreateWebpackConfig: GatsbyNode["onCreateWebpackConfig"] = ({
  actions,
}) => {
  actions.setWebpackConfig({
    resolve: {
      alias: {
        react: path.resolve(__dirname, "node_modules/react"),
        "react-dom": path.resolve(__dirname, "node_modules/react-dom"),
      },
    },
  });
};

/**
 * Download each post's remote `home_image` (hosted on S3) at build time and
 * attach it as a File node, so gatsby-plugin-image can emit responsive,
 * WebP/blur-up optimized covers instead of shipping the full-size original.
 */
export const onCreateNode: GatsbyNode["onCreateNode"] = async ({
  node,
  actions: { createNode, createNodeField },
  createNodeId,
  getCache,
}) => {
  if (node.internal.type !== "MarkdownRemark") return;
  const frontmatter = (node as any).frontmatter;
  const url: string | undefined = frontmatter?.home_image;
  if (!url || !/^https?:\/\//.test(url)) return;

  try {
    const fileNode = await createRemoteFileNode({
      url,
      parentNodeId: node.id,
      createNode,
      createNodeId,
      getCache,
    });
    if (fileNode) {
      createNodeField({ node, name: "homeImageFile", value: fileNode.id });
    }
  } catch (e) {
    // Don't fail the build if one remote image is unreachable.
    // eslint-disable-next-line no-console
    console.warn(`Could not fetch home_image for ${frontmatter?.slug}: ${url}`);
  }
};

/** Link the downloaded File node so `gatsbyImageData` is queryable on it. */
export const createSchemaCustomization: GatsbyNode["createSchemaCustomization"] = ({
  actions,
}) => {
  actions.createTypes(`
    type MarkdownRemarkFields {
      homeImageFile: File @link(from: "homeImageFile")
    }
    type MarkdownRemark implements Node {
      fields: MarkdownRemarkFields
    }
  `);
};
