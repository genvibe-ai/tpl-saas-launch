import "@fontsource-variable/bricolage-grotesque/opsz.css"; // display font (headings)
import "@fontsource-variable/instrument-sans"; // body font
import "./index.css";

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { site, theme } from "./content";
import { applyTheme } from "./lib/theme";

// Colours, page title and description come from src/content.ts.
applyTheme(theme, site);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
