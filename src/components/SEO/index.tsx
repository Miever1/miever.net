import React from "react";
import i18n from "../../i18n";
import { useSiteMetadata } from "../../hooks/use-site-metadata";

export const SEO = ({
    title,
    description,
    pathname,
    image,
    lang,
    type = "website",
    children
}: {
    title?: string;
    description?: string;
    pathname?: string;
    image?: string;
    /** Override the document language; defaults to the active i18n language. */
    lang?: string;
    /** Open Graph type. Defaults to "website"; blog posts pass "article". */
    type?: string;
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
      <meta property="og:type" content={type} />
      <meta property="og:url" content={seo.url} />
      <meta property="og:image" content={seo.image} />
      <meta property="og:site_name" content={defaultTitle} />

      <link rel="canonical" href={seo.url} />

      {/* Site-wide schema only. Page-specific structured data (e.g. a
          BlogPosting with the real publish date) is supplied by the page's
          own Head — don't emit a dated Article here, where it would be wrong
          for non-article pages and stale on every render. */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          "name": defaultTitle,
          "description": defaultDescription,
          "url": siteUrl
        })}
      </script>

      <body>{children}</body>
    </>
  );
};