import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { ThemeProvider } from "./components/theme/ThemeProvider.tsx";
import { Constants } from "./utils/Constants.ts";
import { Theme } from "./utils/useTheme.ts";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <ThemeProvider
      defaultTheme={Theme.System}
      storageKey={Constants.UI.UI_THEME_STORAGE_KEY}
    >
      <App />
    </ThemeProvider>
  </QueryClientProvider>,
);
