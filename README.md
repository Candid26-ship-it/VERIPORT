# VeriPort

Enterprise verification platform — multi-portal React app (Admin, CE, VO, VA, VE, VM, Candidate, Client).

## Stack

- **Vite 6** — dev server + bundler
- **React 18**
- **React Router v7** (`react-router-dom`) — `createBrowserRouter` with lazy-loaded portal routes
- Plain JS (`.jsx`), no TypeScript

## Scripts

```bash
npm install
npm run dev      # http://localhost:5173
npm run build
npm run preview
```

## Project structure

```
src/
├── main.jsx                  # ReactDOM bootstrap
├── router.jsx                # createBrowserRouter — lazy portals
├── index.css                 # Global styles + responsive media queries
├── auth/
│   ├── AuthContext.jsx       # User + profile + clientAuthed + ceReturns
│   ├── ProtectedRoute.jsx    # Route guard + role-switch redirect
│   ├── LoginScreen.jsx
│   ├── MFAScreen.jsx         # Also exports roleHomePath()
│   └── ClientLoginScreen.jsx
├── components/
│   ├── Icons.jsx             # All shared SVG icons
│   ├── Topbar.jsx
│   ├── Breadcrumb.jsx
│   └── RoleSwitcher.jsx
├── data/
│   └── index.js              # LOGIN_USERS, ROLE_PROFILES, BATCHES, etc.
└── portals/
    ├── Pages.jsx             # Page wrappers (wire AuthContext → Shell props)
    ├── admin.jsx             # AdminShell + all admin sub-screens
    ├── ce.jsx                # CEShell + Drafts/Collection/Active/Complete + Returns + Reports
    ├── vo.jsx                # VOShell + workboards + drawers
    ├── va.jsx                # VAPortal + onboarding/auth/verification/evidential
    ├── ve.jsx                # VEShell
    ├── vm.jsx                # VMShell + VA registry + coverage gaps
    ├── candidate.jsx         # CandidatePortal
    └── client.jsx            # ClientPortal
```

## Routes

| Path           | Portal                       | Guarded role            |
|----------------|------------------------------|-------------------------|
| `/login`       | Sign in (Dragnet users)      | —                       |
| `/mfa`         | MFA code entry               | requires `user`         |
| `/admin/*`     | Admin shell                  | System Administrator    |
| `/ce/*`        | Client Engagement            | CE Officer              |
| `/vo/*`        | Verification Officer         | Verification Officer    |
| `/va/*`        | Verification Authority       | Verification Authority  |
| `/ve/*`        | Executive                    | Executive               |
| `/vm/*`        | Manager                      | Manager                 |
| `/candidate/*` | Candidate portal             | Candidate Portal        |
| `/client/*`    | Client portal                | Client Portal (+ login) |

Each portal's internal screen navigation remains state-driven inside the shell (drill-down chains, drawers, wizards). The router dispatches at the *portal* level; the `RoleSwitcher` in the topbar updates `activeProfile`, and `ProtectedRoute` re-routes accordingly.

## Demo credentials

| User    | Email                 | Password      | Role    |
|---------|-----------------------|---------------|---------|
| Alice   | alice@dragnet.ng      | alice1234     | Admin   |
| Emeka   | emeka@dragnet.ng      | emeka1234     | CE      |
| Mariam  | mariam@dragnet.ng     | mariam1234    | Manager |
| Kelechi | kelechi@dragnet.ng    | kelechi1234   | Officer |

MFA: any 6-digit code. Client portal: `admin@zenithbank.com` / `zenith1234`.

## Responsive design

- Viewport meta + responsive utility classes in `index.css`
- Sidebars collapse on screens ≤ 900 px (toggle via topbar menu)
- Tables horizontal-scroll on ≤ 700 px
- `font-size: 16px` on inputs to suppress iOS auto-zoom

The legacy screens still use inline styles internally; the global CSS layer plus the topbar/sidebar class hooks (`vp-sidebar`, `vp-sidebar-open`, `vp-mobile-only`, `vp-desktop-only`) make the shells mobile-friendly. Further per-screen polish (drawers, wizards) can layer on top of the same class hooks.
