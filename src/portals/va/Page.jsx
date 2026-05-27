import { useAuth } from "../../auth/AuthContext.jsx";
import { VAPortal } from "./Shell.jsx";
export default function VAPage() {
  const { user, activeProfile, switchProfile, signOut } = useAuth();
  return <VAPortal user={user} activeProfile={activeProfile} onSwitchProfile={switchProfile} onSignOut={signOut}/>;
}
