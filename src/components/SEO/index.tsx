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
      <title>{seo.title}</title>
      <meta name="description" content={seo.description} />
      <link rel="icon" type="image/png" sizes="16x16" href="/static/icon.png" ></link>
      {children}
    </>
  )
}