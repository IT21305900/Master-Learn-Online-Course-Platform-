import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { KindeProvider } from "@kinde-oss/kinde-auth-react";
import { ThemeProvider } from "@mui/material";
import theme from "./theme/theme.js";

import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <KindeProvider
          clientId="dd3fb60cd1164f2b826364a96a2e1427"
          domain="https://isuruakalanka.kinde.com"
          redirectUri="http://localhost:5173"
          logoutUri="http://localhost:5173"
        >
          <App />
        </KindeProvider>
      </QueryClientProvider>
    </ThemeProvider>
  </React.StrictMode>
);
