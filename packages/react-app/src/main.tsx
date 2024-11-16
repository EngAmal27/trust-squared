import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import DynamicProvider from "./providers/dynamic.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <DynamicProvider>
      <App />
    </DynamicProvider>
  </StrictMode>
);
