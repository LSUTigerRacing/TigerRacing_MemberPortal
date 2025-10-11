import { lazy, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

// Public pages
const Home = lazy(() => import("./pages/Home.tsx").then(module => ({ default: module.Home })));

// Private pages.
const Dashboard = lazy(() => import("./pages/Dashboard.tsx").then(module => ({ default: module.Dashboard })));
const Members = lazy(() => import("@/pages/adminPortal/adPortalView.tsx").then(module => ({ default: module.PagesView })));
const Purchases = lazy(() => import("./pages/Purchases.tsx").then(module => ({ default: module.Purchases })));

export const AppRoutes = () => {
    return (
        <main>
            <Suspense fallback={null}>
                <Routes>
                    {/* Public Pages */}
                    <Route path="/" element={<Home />} />

                    {/* Private Pages */}
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/members" element={<Members />} />
                    <Route path="/purchases" element={<Purchases />} />

                    {/* 404 Redirect */}
                    <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
            </Suspense>
        </main>
    );
};
