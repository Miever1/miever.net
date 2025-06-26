import React from "react"
import { ThemeProvider } from "./src/components/Theme-Context/index.tsx"

import './src/i18n';

export const wrapRootElement = ({ element }) => {
  return <ThemeProvider>{element}</ThemeProvider>
}
