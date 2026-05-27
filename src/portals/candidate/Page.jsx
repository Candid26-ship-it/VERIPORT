import { useAuth } from "../../auth/AuthContext.jsx";
import { CandidatePortal } from "./Shell.jsx";
export default function CandidatePage() {
  const { activeProfile, switchProfile, signOut } = useAuth();
  return <CandidatePortal activeProfile={activeProfile} onSwitchProfile={switchProfile} onSignOut={signOut}/>;
}
