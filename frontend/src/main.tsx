import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { ThemeProvider } from "./components/theme/ThemeProvider.tsx";
import { Constants } from "./utils/Constants.ts";
import { Theme } from "./utils/useTheme.ts";

createRoot(document.getElementById("root")!).render(
  <ThemeProvider
    defaultTheme={Theme.System}
    storageKey={Constants.UI.THEME_STORAGE_KEY}
  >
    <App />
  </ThemeProvider>,
);
