import { lazy, Suspense } from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";
import { LoginScreen } from "./auth/LoginScreen.jsx";
import { MFAScreen } from "./auth/MFAScreen.jsx";
import { ProtectedRoute } from "./auth/ProtectedRoute.jsx";

const AdminPage     = lazy(() => import("./portals/AdminPage.jsx"));
const CEPage        = lazy(() => import("./portals/CEPage.jsx"));
const VOPage        = lazy(() => import("./portals/VOPage.jsx"));
const VAPage        = lazy(() => import("./portals/VAPage.jsx"));
const VEPage        = lazy(() => import("./portals/VEPage.jsx"));
const VMPage        = lazy(() => import("./portals/VMPage.jsx"));
const CandidatePage = lazy(() => import("./portals/CandidatePage.jsx"));
const ClientPage    = lazy(() => import("./portals/ClientPage.jsx"));

const Fallback = () => (
  <div style={{minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center",color:"#6b7280",fontFamily:"system-ui"}}>
    Loading…
  </div>
);

const wrap = (el, roles) => (
  <ProtectedRoute expectedRoles={roles}>
    <Suspense fallback={<Fallback/>}>{el}</Suspense>
  </ProtectedRoute>
);

export const router = createBrowserRouter([
  { path: "/", element: <Navigate to="/login" replace /> },
  { path: "/login", element: <LoginScreen /> },
  { path: "/mfa",   element: <MFAScreen /> },
  { path: "/admin/*",     element: wrap(<AdminPage />,     ["System Administrator"]) },
  { path: "/ce/*",        element: wrap(<CEPage />,        ["CE Officer"]) },
  { path: "/vo/*",        element: wrap(<VOPage />,        ["Verification Officer"]) },
  { path: "/va/*",        element: wrap(<VAPage />,        ["Verification Authority"]) },
  { path: "/ve/*",        element: wrap(<VEPage />,        ["Executive"]) },
  { path: "/vm/*",        element: wrap(<VMPage />,        ["Manager"]) },
  { path: "/candidate/*", element: wrap(<CandidatePage />, ["Candidate Portal"]) },
  { path: "/client/*",    element: wrap(<ClientPage />,    ["Client Portal"]) },
  { path: "*", element: <Navigate to="/login" replace /> },
]);
