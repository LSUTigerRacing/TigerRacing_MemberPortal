import { lazy, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

// Public pages.
const Home = lazy(() => import("./pages/Home.tsx"));

// Private pages.
const Admin = lazy(() => import("./pages/Admin.tsx"));
const Dashboard = lazy(() => import("./pages/Dashboard.tsx"));

export const AppRoutes = () => {
    return (
        <>
            <Suspense fallback={null}>
                <Routes>
                    {/* Public Pages */}
                    <Route path="/" element={<Home />} />

                    {/* Private Pages */}
                    <Route path="/admin" element={<Admin />} />
                    <Route path="/dashboard" element={<Dashboard />} />

                    {/* 404 Redirect */}
                    <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
            </Suspense>
        </>
    );
};
