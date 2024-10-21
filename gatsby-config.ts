import type { GatsbyConfig } from "gatsby";
require("dotenv").config({
  path: `.env`,
})

const config: GatsbyConfig = {
  siteMetadata: {
    title: `miever.net`,
    description: "Everyone needs their own little spot on the interwebs, and this is mine. Welcome to miever's website!",
    siteUrl: `https://miever.net`
  },
  graphqlTypegen: true,
  plugins: [
    "gatsby-plugin-emotion",
    `gatsby-transformer-remark`,
    `gatsby-plugin-layout`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `content`,
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
        theme_color: `#12aa9c`,
        display: `standalone`,
        icons: [
          {
            src: `/favicon-48x48.png`,
            sizes: `48x48`,
            type: `image/png`,
          },
          {
            src: `/web-app-manifest-192x192.png`,
            sizes: `192x192`,
            type: `image/png`,
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
          {
            src: `/maskable_icon_x48.png`,
            sizes: `48x48`,
            type: `image/png`,
            purpose: `maskable`,
          },
        ],
      },
    },
    `gatsby-plugin-offline`,
  ]
};

export default config;