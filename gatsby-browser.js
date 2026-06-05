import React from "react"
import { ThemeProvider } from "./src/components/Theme-Context/index.tsx"

// Prism theme for syntax-highlighted code blocks (gatsby-remark-prismjs).
import "prismjs/themes/prism-tomorrow.css"

import './src/i18n';

export const wrapRootElement = ({ element }) => {
  return <ThemeProvider>{element}</ThemeProvider>
}
