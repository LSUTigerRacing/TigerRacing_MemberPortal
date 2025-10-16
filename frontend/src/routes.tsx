import { lazy, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { MemberTabs } from "./pages/Task-portal/Kanban.tsx";

// Public pages
const Home = lazy(() => import("./pages/Home.tsx").then(module => ({ default: module.Home })));
const TaskPortal = lazy(() => import("./pages/Task-portal/Kanban.tsx").then(module => ({ default: module.MemberTabs })));

export const AppRoutes = () => {
    return (
        <>
            <Suspense fallback={null}>
                <Routes>
                    {/* public pages */}
                    <Route path="/" element={<Home />} />
                    <Route path="TaskPortal" element={<MemberTabs />} />
                    {/* if they try to go elsewhere */}
                    <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
            </Suspense>
        </>
    );
};
