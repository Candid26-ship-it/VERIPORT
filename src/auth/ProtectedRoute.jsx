import { Navigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useAuth } from "./AuthContext.jsx";
import { roleHomePath } from "./MFAScreen.jsx";
import { useNavigate } from "react-router-dom";

export function ProtectedRoute({ children, expectedRoles }) {
  const { user, mfaVerified, activeProfile } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  // Whenever the active profile changes, route to its home portal.
  useEffect(() => {
    if (!user || !mfaVerified) return;
    const target = roleHomePath(activeProfile);
    if (!location.pathname.startsWith(target)) {
      navigate(target, { replace: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeProfile?.id]);

  if (!user) return <Navigate to="/login" replace />;
  if (!mfaVerified) return <Navigate to="/mfa" replace />;
  if (expectedRoles && !expectedRoles.includes(activeProfile?.role)) {
    return <Navigate to={roleHomePath(activeProfile)} replace />;
  }
  return children;
}
