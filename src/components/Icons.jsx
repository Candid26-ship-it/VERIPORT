// Icons module
// ─── Icons ────────────────────────────────────────────────────────────────────
export const ShieldIcon = ({ size = 32 }) => (
  <svg viewBox="0 0 24 24" fill="white" width={size} height={size}><path d="M12 2L4 6v6c0 5.5 3.8 10.7 8 12 4.2-1.3 8-6.5 8-12V6l-8-4z"/></svg>
);
export const LockIcon = () => (
  <svg viewBox="0 0 24 24" fill="white" width="28" height="28"><path d="M18 8h-1V6c0-2.8-2.2-5-5-5S7 3.2 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.7 1.4-3.1 3.1-3.1 1.7 0 3.1 1.4 3.1 3.1v2z"/></svg>
);
export const EyeIcon = ({ show }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2" width="20" height="20">
    {show ? (<><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></>) : (<><path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94"/><path d="M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/></>)}
  </svg>
);
export const SI = ({ d, size = 18 }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width={size} height={size}><path d={d}/></svg>
);
export const ChevronRight = () => <SI d="M9 18l6-6-6-6" size={16}/>;
export const ChevronDown = () => <SI d="M6 9l6 6 6-6" size={16}/>;
export const ChevronLeft = () => <SI d="M15 18l-6-6 6-6" size={16}/>;
export const MenuIcon = () => <SI d="M3 12h18M3 6h18M3 18h18" size={20}/>;
export const SearchSm = () => <SI d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" size={16}/>;
export const BellIcon = () => <SI d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0" size={18}/>;
export const PeopleIcon = () => <SI d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M9 11a4 4 0 100-8 4 4 0 000 8zM23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" size={18}/>;
export const CheckIcon = () => <svg viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" width="16" height="16"><path d="M20 6L9 17l-5-5"/></svg>;
export const HomeIcon = () => <SI d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" size={14}/>;
