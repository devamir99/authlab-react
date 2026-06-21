# AuthLab React

[![Portfolio](https://img.shields.io/badge/Portfolio-devamir.com-orange?style=flat-square)](https://devamir.com)
[![Author](https://img.shields.io/badge/Author-DevAmir-blue?style=flat-square)](https://github.com/devamirr)

**Auth Experience Lab** — a bilingual (EN/FA) mock authentication UI showcase built with React.  
Explore email, social OAuth, SMS OTP, and passwordless flows — **no backend, demonstration only**.

> Built by [Amir (DevAmir)](https://devamir.com) as a portfolio piece.

## Author — Amir (DevAmir)

| | |
|---|---|
| **Website** | [devamir.com](https://devamir.com) |
| **Email** | [devamir99@gmail.com](mailto:devamir99@gmail.com) |
| **GitHub** | [github.com/devamirr](https://github.com/devamirr) |
| **LinkedIn** | [linkedin.com/in/devamir](https://linkedin.com/in/devamir) |
| **Telegram** | [t.me/devamir99](https://t.me/devamir99) |
| **Phone** | [09205007494](tel:+989205007494) |

Interested in custom auth UI or full-stack work? **[Get in touch →](https://devamir.com)**

## Features (planned & in progress)

- **Auth Hub** — choose sign-in method without cluttered single-page forms
- **Email** — login & register (client-side mock)
- **Social** — Google, GitHub, Apple, Microsoft (mock OAuth screens)
- **Phone** — SMS OTP two-step flow (mock)
- **Magic Link** — passwordless email flow (mock)
- **Bilingual** — English & Persian with RTL support
- **Theming** — dark / light mode with orange accent
- **Protected routes** — demo dashboard after mock login

## Tech Stack

- React 19 · Vite · React Router
- Tailwind CSS 4
- Formik + Yup (forms)
- Context API (state)

## Project Structure

```
src/
├── config/
│   └── site.js              # Author info, links, CTA copy
├── locales/
│   ├── en.json
│   └── fa.json
├── layouts/                 # MainLayout (Phase 1)
├── context/
│   └── AuthContext.jsx
├── components/
├── pages/
│   ├── Home.jsx
│   ├── Dashboard.jsx
│   └── auth/
│       ├── email/           # Login & register flows
│       ├── social/          # OAuth provider screens
│       ├── phone/           # SMS OTP wizard
│       └── magic-link/      # Passwordless email
├── routes/
│   └── ProtectedRoute.jsx
├── App.jsx
└── main.jsx
```

## Setup

### Prerequisites

- Node.js 18+
- npm or yarn

### Install & run

```bash
git clone https://github.com/devamir99/authlab-react.git
cd authlab-react
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

> **No API server required.** All authentication is simulated on the client for UI demonstration.

## Scripts

```bash
npm run dev      # Development server
npm run build    # Production build
npm run preview  # Preview production build
npm run lint     # ESLint
```

## Roadmap

| Phase | Scope |
|-------|--------|
| **0** ✅ | Site config, folder structure, README |
| **1** ✅ | Theme (dark/light), i18n, layout, Navbar, Footer |
| **2** ✅ | Home + Auth Hub |
| **3** ✅ | Email login & register (mock) |
| **4** | Social OAuth screens (mock) |
| **5** | Phone OTP flow (mock) |
| **6** | Magic link flow (mock) |
| **7** | Dashboard polish + deploy |
| **8** | README GIF, live demo, case study |

## License

MIT — see [LICENSE](LICENSE).

---

**Note:** This is a **UI showcase only**. Do not use mock flows or client-only session logic in production without a real backend, secure tokens, and proper validation.
