import ReactDOM from "react-dom/client";
import App from "@src/App.tsx";
import "@src/index.css";
import { NextUIProvider } from "@nextui-org/react";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <NextUIProvider>
    <App />
  </NextUIProvider>
);
