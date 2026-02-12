import { lazy, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router";

// Public pages.
const Home = lazy(() => import("./pages/Home.tsx"));

// Private pages.
const Admin = lazy(() => import("./pages/Admin.tsx"));
const Dashboard = lazy(() => import("./pages/Dashboard.tsx"));
const Orders = lazy(() => import("./pages/Orders.tsx"));
const ProjectDashboard = lazy(() => import("./pages/ProjectDashboard.tsx"));
const ProjectKanban = lazy(() => import("./pages/ProjectKanban.tsx"));
const Kanban = lazy(() => import("./pages/KanbanOld.tsx"));

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
                    <Route path="/projects" element={<ProjectDashboard />} />
                    <Route path="/projects/:id" element={<ProjectKanban />} />
                    <Route path="/projects2/:id" element={<Kanban />} />

                    {/* 404 Redirect */}
                    <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
            </Suspense>
        </main>
    );
};
