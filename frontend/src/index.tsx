import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./App.tsx";

import Header from "./components/layout/Header.tsx";

import "./assets/styles/index.css";

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <Header />
        <App />
    </StrictMode>
);
