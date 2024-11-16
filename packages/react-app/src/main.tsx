import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import MyPrivyProvider from "./providers/privyProvider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <MyPrivyProvider>
      <App />
    </MyPrivyProvider>
  </StrictMode>
);
