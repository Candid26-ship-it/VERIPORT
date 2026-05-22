import { useAuth } from "../auth/AuthContext.jsx";
import { ClientLoginScreen } from "../auth/ClientLoginScreen.jsx";
import { ClientPortal } from "./client.jsx";
export default function ClientPage() {
  const { activeProfile, switchProfile, signOut, clientAuthed, setClientAuthed } = useAuth();
  if (!clientAuthed) return <ClientLoginScreen/>;
  const fullSignOut = () => { setClientAuthed(false); signOut(); };
  return <ClientPortal activeProfile={activeProfile} onSwitchProfile={switchProfile} onSignOut={fullSignOut}/>;
}
