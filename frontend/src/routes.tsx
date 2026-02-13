import { lazy, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

// Public pages.
const Home = lazy(() => import("./pages/Home.tsx"));

// Private pages.
const Admin = lazy(() => import("./pages/Admin.tsx"));
const Dashboard = lazy(() => import("./pages/Dashboard.tsx"));
const Orders = lazy(() => import("./pages/Orders.tsx"));
const Projects = lazy(() => import("./pages/Projects.tsx"));
const Tasks = lazy(() => import("./pages/Kanban.tsx"));

export const AppRoutes = () => {
    return (
        <main>
            <Suspense fallback={null}>
                <Routes>
                    {/* Public Pages */}
                    <Route path="/" element={<Home />} />

                    {/* Private Pages */}
                    <Route path="/admin" element={<Admin />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/orders" element={<Orders />} />
                    <Route path="/projects" element={<Projects />} />
                    <Route path="/tasks" element={<Tasks />} />

                    {/* 404 Redirect */}
                    <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
            </Suspense>
        </main>
    );
};
