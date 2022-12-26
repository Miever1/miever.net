import React, { FunctionComponent } from "react"
import type { HeadFC, PageProps } from "gatsby"

import Home from "./home"

import "miever_ui/dist/index.css"

const IndexPage: FunctionComponent<PageProps> = () => {
  return (
    <div>
      <Home />
    </div>
  )
}

export default IndexPage

export const Head: HeadFC = () => (
  <>
    <title>Home</title>
    <link rel="icon" type="image/png" sizes="16x16" href="./static/icon.png" ></link>
  </>
)
