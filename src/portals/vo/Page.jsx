import { useAuth } from "../../auth/AuthContext.jsx";
import { VOShell } from "./Shell.jsx";
export default function VOPage() {
  const { user, activeProfile, switchProfile, signOut, addCeReturn } = useAuth();
  return <VOShell user={user} activeProfile={activeProfile} onSwitchProfile={switchProfile} onSignOut={signOut} onReturnToCE={addCeReturn}/>;
}
