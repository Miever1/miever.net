import type { GatsbyConfig } from "gatsby";

require("dotenv").config({
  path: `.env`,
})

const config: GatsbyConfig = {
  siteMetadata: {
    title: `miever.net`,
    description: "Everyone needs their own little spot on the interwebs, and this is mine. Welcome to miever's website!",
    siteUrl: `https://miever.net`,
    image: "https://miever.net/static/default-og-image.jpg",
    author: "Miever",
    social: {
      github: "https://github.com/Miever1",
      linkedin: "https://www.linkedin.com/in/aerman-huofuer-413328280/",
      email: "aerman.huofuer@gmail.com"
    }
  },
  graphqlTypegen: true,
  plugins: [
    "gatsby-plugin-emotion",
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          // Add slug ids + anchor links to headings (powers the post TOC).
          {
            resolve: `gatsby-remark-autolink-headers`,
            options: { icon: false, maintainCase: false, removeAccents: true },
          },
          // Syntax-highlight fenced code blocks.
          {
            resolve: `gatsby-remark-prismjs`,
            options: { showLineNumbers: false, noInlineHighlight: false },
          },
        ],
      },
    },
    `gatsby-plugin-layout`,
    "gatsby-plugin-preload-fonts",
    "gatsby-plugin-image",
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
    {
      resolve: `gatsby-plugin-sitemap`,
      options: {
        query: `
          {
            allSitePage {
              nodes {
                path
              }
            }
          }
        `,
        resolveSiteUrl: () => "https://miever.net",
        serialize: ({ path }: { path: string }) => ({
          url: `https://miever.net${path}`,
          changefreq: "daily",
          priority: 0.7,
        }),
      },
    },
    {
      resolve: "gatsby-plugin-robots-txt",
      options: {
        policy: [
          { userAgent: "*", allow: "/" },
        ],
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `content`,
        path: `${__dirname}/src/content`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `designs`,
        path: `${__dirname}/src/content`,
      },
    },
    {
      resolve: '@chakra-ui/gatsby-plugin',
      options: {
        resetCSS: true,
        isUsingColorMode: true,
      },
    },
    {
      resolve: "gatsby-plugin-datadog",
      options: {
        site: 'us5.datadoghq.com',
        sampleRate: 100,
        enabled: true,
        rum: {
          applicationId: process.env.APPLICATION_ID,
          clientToken: process.env.CLIENT_TOKEN,
        },
        logs: {
          clientToken: process.env.CLIENT_TOKEN,
        }
      }
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `miever.net`,
        short_name: `miever`,
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: "#0CC0DF",
        display: `standalone`,
        icons: [
          {
            src: `/favicon-48x48.png`,
            sizes: `48x48`,
            type: `image/png`,
            purpose: `maskable`
          },
          {
            src: `/web-app-manifest-192x192.png`,
            sizes: `192x192`,
            type: `image/png`,
            purpose: `maskable`
          },
          {
            src: `/web-app-manifest-512x512.png`,
            sizes: `512x512`,
            type: `image/png`,
          },
          {
            src: `/apple-touch-icon.png`,
            sizes: `180x180`,
            type: `image/png`,
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-feed`,
      options: {
        query: `
          {
            site {
              siteMetadata {
                title
                description
                siteUrl
              }
            }
          }
        `,
        feeds: [
          {
            serialize: ({ query: { site, allMarkdownRemark } }: any) =>
              allMarkdownRemark.nodes.map((node: any) => ({
                title: node.frontmatter.title,
                description: node.frontmatter.description,
                date: node.frontmatter.date,
                url: `${site.siteMetadata.siteUrl}/blogs${node.frontmatter.slug}`,
                guid: `${site.siteMetadata.siteUrl}/blogs${node.frontmatter.slug}`,
              })),
            query: `
              {
                allMarkdownRemark(
                  filter: { frontmatter: { type: { eq: "blogs" }, language: { eq: "en" } } }
                  sort: { frontmatter: { date: DESC } }
                ) {
                  nodes {
                    frontmatter {
                      title
                      description
                      slug
                      date
                    }
                  }
                }
              }
            `,
            output: "/rss.xml",
            title: "miever.net — Blog",
          },
        ],
      },
    },
    `gatsby-plugin-offline`,
  ]
};

export default config;