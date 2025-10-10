import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./App.tsx";

import Navbar from "./components/layout/Navbar.tsx";

import "./assets/styles/index.css";

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <Navbar />
        <App />
    </StrictMode>
);
