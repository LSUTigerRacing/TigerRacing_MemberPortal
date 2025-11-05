import { lazy, Suspense } from "react"
import { Routes, Route, Navigate } from "react-router-dom"

// Public pages
const Home = lazy(() => import('./pages/Home.tsx').then(module => ({ default: module.Home })))
const Members = lazy(() =>
  import('@/pages/adminPortal/adPortalView.tsx').then(module => ({ default: module.PagesView }))
);

export const AppRoutes = () => {    
    return (
        <>
        <Suspense fallback={null}>
            <Routes>
                {/* public pages */}
                <Route path="/" element={<Home />} />
                <Route path="/members" element={<Members />} />

                {/* if they try to go elsewhere */}
                <Route path="*" element={<Navigate to="/" replace/>}/>
            </Routes>
        </Suspense>
        </>
    )
}
