import { createContext, useContext, useState, useCallback } from "react";
import { ROLE_PROFILES, BATCH_RETURNS } from "../data/index.js";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [mfaVerified, setMfaVerified] = useState(false);
  const [activeProfile, setActiveProfile] = useState(ROLE_PROFILES[0]);
  const [clientAuthed, setClientAuthed] = useState(false);
  const [ceReturns, setCeReturns] = useState([...BATCH_RETURNS]);

  const addCeReturn = useCallback((entry) => setCeReturns(p => [entry, ...p]), []);

  const switchProfile = useCallback((p) => {
    if (p.role !== "Client Portal") setClientAuthed(false);
    setActiveProfile(p);
  }, []);

  const signIn = useCallback((u) => {
    setUser(u);
    setActiveProfile(u.role === "Admin" ? ROLE_PROFILES[0] : ROLE_PROFILES[1]);
    setMfaVerified(false);
  }, []);

  const completeMfa = useCallback(() => setMfaVerified(true), []);

  const signOut = useCallback(() => {
    setUser(null);
    setMfaVerified(false);
    setActiveProfile(ROLE_PROFILES[0]);
    setClientAuthed(false);
  }, []);

  const value = {
    user, mfaVerified, activeProfile, clientAuthed, ceReturns,
    signIn, completeMfa, signOut, switchProfile, setClientAuthed, addCeReturn,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>");
  return ctx;
}
