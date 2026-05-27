import { useAuth } from "../../auth/AuthContext.jsx";
import { AdminShell } from "./Shell.jsx";
export default function AdminPage() {
  const { user, activeProfile, switchProfile, signOut } = useAuth();
  return <AdminShell user={user} activeProfile={activeProfile} onSwitchProfile={switchProfile} onSignOut={signOut}/>;
}
