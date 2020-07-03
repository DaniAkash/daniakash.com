/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */
import React from "react"
import DarkModeToggle from "./src/components/Common/DarkModeToggle"
import { PrimaryLayoutProvider } from "./src/LayoutEngine/PrimaryLayout"
import "./src/assets/styles/global.css"
import "typeface-roboto"
import "typeface-roboto-mono"

// You can delete this file if you're not using it

export const wrapRootElement = ({ element }) => {
  return (
    <PrimaryLayoutProvider>
      {element}
      <DarkModeToggle />
    </PrimaryLayoutProvider>
  )
}
