import { useAuth } from "../auth/AuthContext.jsx";
import { CEShell } from "./ce.jsx";
export default function CEPage() {
  const { user, activeProfile, switchProfile, signOut, ceReturns } = useAuth();
  return <CEShell user={user} activeProfile={activeProfile} onSwitchProfile={switchProfile} onSignOut={signOut} ceReturns={ceReturns}/>;
}
