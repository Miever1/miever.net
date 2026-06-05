import React from "react";
import i18n from "../../i18n";
import { useSiteMetadata } from "../../hooks/use-site-metadata";

export const SEO = ({
    title,
    description,
    pathname,
    image,
    lang,
    children
}: {
    title?: string;
    description?: string;
    pathname?: string;
    image?: string;
    /** Override the document language; defaults to the active i18n language. */
    lang?: string;
    children?: React.ReactNode;
}) => {
  const { title: defaultTitle, description: defaultDescription, siteUrl } = useSiteMetadata();
  const documentLang = lang || i18n.language || "en";

  const seo = {
    title: title || defaultTitle,
    description: description || defaultDescription,
    url: `${siteUrl}${pathname || ``}`,
    image: image || `https://miever.s3.ap-east-1.amazonaws.com/static/miever-logo.webp`
  };

  return (
    <>
      <html lang={documentLang} />
      <title>{seo.title}</title>
      <meta name="description" content={seo.description} />

      <meta property="og:title" content={seo.title} />
      <meta property="og:description" content={seo.description} />
      <meta property="og:type" content="article" />
      <meta property="og:url" content={seo.url} />
      <meta property="og:image" content={seo.image} />
      <meta property="og:site_name" content="Miever Blog" />

      <link rel="canonical" href={seo.url} />

      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          "headline": seo.title,
          "description": seo.description,
          "image": seo.image,
          "url": seo.url,
          "datePublished": new Date().toISOString(),
          "author": {
            "@type": "Person",
            "name": "Miever Team"
          },
          "publisher": {
            "@type": "Organization",
            "name": "Miever",
            "logo": {
              "@type": "ImageObject",
              "url": `${siteUrl}/static/logo.png`
            }
          },
          "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": seo.url
          }
        })}
      </script>

      <body>{children}</body>
    </>
  );
};