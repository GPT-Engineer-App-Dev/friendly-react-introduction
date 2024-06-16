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
    900: "#000000",
  },
  text: {
    100: "#FFFFFF",
  },
  accent: {
    purple: "#D6C1FF",
    yellow: "#FFEB3B",
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
