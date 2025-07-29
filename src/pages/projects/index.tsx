import React from "react";
import { HeadFC } from "gatsby";
import { useTranslation } from "react-i18next";

import Projects from "./projects";
import { SEO } from "../../components/SEO";

export default Projects;

export const Head: HeadFC = () => {
  const { t } = useTranslation();
  const projectsList = [
    {
      title: "Miever.net",
      thumbnailPath: "https://miever.s3.ap-east-1.amazonaws.com/static/projects/thumbnail-miever.webp",
    },
    {
      title: "Miever UI",
      thumbnailPath: "https://miever.s3.ap-east-1.amazonaws.com/static/projects/thumbnail-components.webp",
    },
    {
      title: "News Manager",
      thumbnailPath: "https://miever.s3.ap-east-1.amazonaws.com/static/projects/thumbnail-news-project.webp",
    }
  ];

  const defaultImage = "https://miever.s3.ap-east-1.amazonaws.com/static/miever-logo.webp";
  const image = projectsList.length > 0 ? projectsList[0].thumbnailPath : defaultImage;
  const url = "https://miever.net/projects";

  return (
    <SEO title={t("projects.title")} description={t("projects.description")} pathname="/projects" image={image}>
      <meta property="og:title" content="Projects - Miever" />
      <meta property="og:description" content="Explore various projects developed by Miever, including open-source tools and web applications." />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content="Miever" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="Projects - Miever" />
      <meta name="twitter:description" content="Explore various projects developed by Miever, including open-source tools and web applications." />
      <meta name="twitter:image" content={image} />

      <link rel="canonical" href={url} />

      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          "headline": "Projects - Miever",
          "description": "Explore various projects developed by Miever, including open-source tools and web applications.",
          "image": image,
          "url": url,
          "creator": {
            "@type": "Person",
            "name": "Miever"
          },
          "publisher": {
            "@type": "Person",
            "name": "Miever",
            "logo": {
              "@type": "ImageObject",
              "url": "https://miever.s3.ap-east-1.amazonaws.com/static/miever-logo.webp"
            }
          }
        })}
      </script>
    </SEO>
  );
};