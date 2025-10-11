import { lazy, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

// Public pages
const Home = lazy(() => import("./pages/Home.tsx").then(module => ({ default: module.Home })));
const Dashboard = lazy(() => import("./pages/Dashboard.tsx").then(module => ({ default: module.Dashboard })));

export const AppRoutes = () => {
    return (
        <main>
            <Suspense fallback={null}>
                <Routes>
                    {/* public pages */}
                    <Route path="/" element={<Home />} />

                    <Route path="/dashboard" element={<Dashboard />} />

                    {/* if they try to go elsewhere */}
                    <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
            </Suspense>
        </main>
    );
};
