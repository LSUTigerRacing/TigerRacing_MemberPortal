import { lazy, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

// Public pages.
const Home = lazy(() => import("./pages/Home.tsx"));

// Private pages.
const Admin = lazy(() => import("./pages/Admin.tsx"));
const Dashboard = lazy(() => import("./pages/Dashboard.tsx"));
const Orders = lazy(() => import("./pages/Orders.tsx"));

export const AppRoutes = () => {
    return (
        <main className="fixed min-w-screen min-h-screen max-w-screen max-h-screen overflow-y-auto">
            <Suspense fallback={null}>
                <Routes>
                    {/* Public Pages */}
                    <Route path="/" element={<Home />} />

                    {/* Private Pages */}
                    <Route path="/admin" element={<Admin />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/orders" element={<Orders />} />

                    {/* 404 Redirect */}
                    <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
            </Suspense>
        </main>
    );
};
