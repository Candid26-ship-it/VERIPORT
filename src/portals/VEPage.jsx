import { useAuth } from "../auth/AuthContext.jsx";
import { VEShell } from "./ve.jsx";
export default function VEPage() {
  const { user, activeProfile, switchProfile, signOut } = useAuth();
  return <VEShell user={user} activeProfile={activeProfile} onSwitchProfile={switchProfile} onSignOut={signOut}/>;
}
