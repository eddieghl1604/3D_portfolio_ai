import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { initSentry } from "@/lib/sentry";

// Initialize Sentry before rendering app
initSentry();

// Mount the React application
createRoot(document.getElementById("root")!).render(
  <App />
);
