import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { SWRConfig } from "swr";

createRoot(document.getElementById("root")!).render(
  <SWRConfig value={{}}>
    <App />
  </SWRConfig>,
);
