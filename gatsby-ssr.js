import React from "react"
import { ThemeProvider } from "./src/components/Theme-Context/index.tsx"

import './src/i18n';

// Mirror gatsby-browser's wrapRootElement so SSR and the browser wrap the app
// identically (Gatsby flags a mismatch as "invalid head element"). ThemeProvider
// is a pure context provider, so this adds no DOM and is SSR-safe.
export const wrapRootElement = ({ element }) => {
  return <ThemeProvider>{element}</ThemeProvider>
}
