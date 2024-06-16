import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { SupabaseAuthProvider } from "./integrations/supabase/auth.jsx";

const colors = {
  brand: {
    900: "#1a365d",
    800: "#153e75",
    700: "#2a69ac",
  },
  background: {
    900: "#f5f5f5",
    800: "#ffffff",
  },
  text: {
    100: "#000000",
    200: "#4a4a4a",
    300: "#7a7a7a",
  },
  accent: {
    green: "#4caf50",
    yellow: "#ffeb3b",
    orange: "#ff9800",
    red: "#f44336",
  },
};

const theme = extendTheme({
  colors,
  styles: {
    global: {
      body: {
        bg: "background.900",
        color: "text.100",
      },
    },
  },
  fonts: {
    heading: "Arial, sans-serif",
    body: "Arial, sans-serif",
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <SupabaseAuthProvider>
        <App />
      </SupabaseAuthProvider>
    </ChakraProvider>
  </React.StrictMode>
);
