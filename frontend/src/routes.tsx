import { lazy, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

// Public pages
const Home = lazy(() => import("./pages/Home.tsx").then(module => ({ default: module.Home })));

// Private pages.
const Dashboard = lazy(() => import("./pages/Dashboard.tsx").then(module => ({ default: module.Dashboard })));
const Orders = lazy(() => import("./pages/Orders.tsx").then(module => ({ default: module.Orders })));

export const AppRoutes = () => {
    return (
        <main>
            <Suspense fallback={null}>
                <Routes>
                    {/* Public Pages */}
                    <Route path="/" element={<Home />} />

                    {/* Private Pages */}
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/orders" element={<Orders />} />

                    {/* 404 Redirect */}
                    <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
            </Suspense>
        </main>
    );
};
