import React, { FunctionComponent } from "react"
import type { HeadFC, PageProps } from "gatsby"

import Home from "./home"

const IndexPage: FunctionComponent<PageProps> = () => {
  return (
    <div
      style={{ color: "#fff" }}
    >
      <Home />
    </div>
  )
}

export default IndexPage

export const Head: HeadFC = () => <title>Home</title>
