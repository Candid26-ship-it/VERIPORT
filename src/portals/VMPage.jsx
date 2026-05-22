import { useAuth } from "../auth/AuthContext.jsx";
import { VMShell } from "./vm.jsx";
export default function VMPage() {
  const { user, activeProfile, switchProfile, signOut } = useAuth();
  return <VMShell user={user} activeProfile={activeProfile} onSwitchProfile={switchProfile} onSignOut={signOut}/>;
}
