import React from "react"
import { useSiteMetadata } from "../../hooks/use-site-metadata"

export const SEO = ({
    title,
    description,
    pathname,
    children
}: {
    title?: string,
    description?: string,
    pathname?: string,
    children?: React.ReactNode
}) => {
  const { title: defaultTitle, description: defaultDescription, siteUrl } = useSiteMetadata()

  const seo = {
    title: title || defaultTitle,
    description: description || defaultDescription,
    url: `${siteUrl}${pathname || ``}`,
  }

  return (
    <>
      <html lang="en"></html>
      <title>{seo.title}</title>
      <meta name="description" content={seo.description} />
      <body>
        {children}
      </body>
    </>
  )
}