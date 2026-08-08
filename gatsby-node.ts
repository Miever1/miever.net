import * as path from "path";
import * as fs from "fs";
import type { GatsbyNode } from "gatsby";
import { createRemoteFileNode } from "gatsby-source-filesystem";
import { projects, ProjectDomain } from "./src/data/projectsData";

/** Uppercase domain eyebrow for the generated OG cards. */
const OG_DOMAIN: Record<ProjectDomain, string> = {
  ai: "AI",
  graphics: "GRAPHICS & 3D",
  hci: "HUMAN-COMPUTER INTERACTION",
  frontend: "FRONT-END",
  design_system: "DESIGN SYSTEM",
};

/**
 * Generate a branded 1200×630 Open Graph card per page (home + each project) at
 * build time with satori (JSX→SVG) + resvg (SVG→PNG), written to /public/og.
 * Pages point og:image at these, so shared links show a titled card instead of
 * a bare logo.
 */
export const onPostBuild: GatsbyNode["onPostBuild"] = async ({ reporter }) => {
  // satori is ESM-only; the `new Function` indirection keeps the bundler from
  // rewriting this dynamic import to require() (which would throw on ESM).
  const satori = (await (new Function("m", "return import(m)")("satori"))).default;
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const { Resvg } = require("@resvg/resvg-js");

  const fontDir = path.resolve(__dirname, "node_modules/@fontsource/inter/files");
  const fontBold = fs.readFileSync(path.join(fontDir, "inter-latin-800-normal.woff"));
  const fontReg = fs.readFileSync(path.join(fontDir, "inter-latin-400-normal.woff"));
  const fonts = [
    { name: "Inter", data: fontBold, weight: 800 as const, style: "normal" as const },
    { name: "Inter", data: fontReg, weight: 400 as const, style: "normal" as const },
  ];

  const outDir = path.resolve(__dirname, "public/og");
  fs.mkdirSync(outDir, { recursive: true });

  // Inter's latin subset lacks a few glyphs (→, ×); swap them for safe text.
  const clean = (s: string) => s.replace(/→/g, " to ").replace(/×/g, "x").replace(/\s+/g, " ").trim();

  const card = (eyebrow: string, title: string, subtitle: string) => ({
    type: "div",
    props: {
      style: {
        display: "flex", flexDirection: "column", justifyContent: "space-between",
        width: "100%", height: "100%", padding: "72px",
        background: "linear-gradient(135deg, #0b1020 0%, #0e1630 100%)", color: "#fff",
      },
      children: [
        { type: "div", props: { style: { display: "flex", fontSize: 30, color: "#0cc0df", fontWeight: 800, letterSpacing: 4 }, children: eyebrow } },
        { type: "div", props: { style: { display: "flex", flexDirection: "column" }, children: [
          { type: "div", props: { style: { display: "flex", fontSize: title.length > 28 ? 76 : 92, fontWeight: 800, lineHeight: 1.05 }, children: title } },
          { type: "div", props: { style: { display: "flex", fontSize: 34, color: "#9aa4b2", marginTop: 20, fontWeight: 400 }, children: subtitle } },
        ] } },
        { type: "div", props: { style: { display: "flex", fontSize: 30, color: "#cbd5e1", fontWeight: 400 }, children: "Aerman Huofuer · miever.net" } },
      ],
    },
  });

  const render = async (file: string, eyebrow: string, title: string, subtitle: string) => {
    const svg = await satori(card(clean(eyebrow), clean(title), clean(subtitle)), { width: 1200, height: 630, fonts });
    const png = new Resvg(svg, { fitTo: { mode: "width", value: 1200 } }).render().asPng();
    fs.writeFileSync(path.join(outDir, file), png);
  };

  try {
    await render("home.png", "AERMAN HUOFUER", "I build software, and I care how it feels to use.", "Software engineer · HCI, graphics & AI · Helsinki");
    for (const p of projects) {
      await render(`project-${p.id}.png`, OG_DOMAIN[p.domain], p.title.en, p.subTitle.en);
    }
    reporter.info(`Generated ${projects.length + 1} OG images → /og`);
  } catch (e) {
    reporter.warn(`OG image generation failed: ${(e as Error).message}`);
  }
};

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
 * Generate a case-study detail page (/projects/<id>) for each project in the
 * structured projectsData. Content is data-driven (bilingual) rather than
 * markdown, so these are plain createPage calls against a single template.
 */
export const createPages: GatsbyNode["createPages"] = async ({ actions }) => {
  const template = path.resolve(__dirname, "src/templates/project.tsx");
  projects.forEach((project) => {
    actions.createPage({
      path: `/projects/${project.id}`,
      component: template,
      context: { id: project.id },
    });
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
