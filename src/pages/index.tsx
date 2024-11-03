import React, { FunctionComponent } from "react"
import type { PageProps } from "gatsby"
import Home from "./home"
import { SEO } from "../components/SEO";

const IndexPage: FunctionComponent<PageProps> = () => {
  return (
    <Home />
  )
}

export default IndexPage

export const Head = () => (
  <>
    <SEO title="Miever" description="Miever's Personal website!" pathname="/" />
  </>
)
