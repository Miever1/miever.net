import * as path from "path";
import type { GatsbyNode } from "gatsby";

/**
 * When developing miever_ui locally via `npm link`, the linked package resolves
 * `react` / `react-dom` from its own node_modules, producing a second React
 * instance and the dreaded "Invalid hook call" error. Force every import to
 * resolve to this project's single copy.
 */
export const onCreateWebpackConfig: GatsbyNode["onCreateWebpackConfig"] = ({
  actions,
}) => {
  actions.setWebpackConfig({
    resolve: {
      alias: {
        react: path.resolve(__dirname, "node_modules/react"),
        "react-dom": path.resolve(__dirname, "node_modules/react-dom"),
      },
    },
  });
};
