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

## Features

- **Auth Hub** — choose sign-in method without cluttered single-page forms
- **Email** — login & register with client-side mock validation
- **Social** — branded OAuth consent screens (Google, GitHub, Apple, Microsoft)
- **Phone** — SMS OTP two-step wizard with resend countdown
- **Magic Link** — passwordless email flow with simulate-click
- **Bilingual** — English & Persian with full RTL support
- **Theming** — dark / light mode with orange accent
- **Toast notifications** — welcome & logout feedback
- **Protected dashboard** — mock session overview + portfolio CTA

## Tech Stack

- React 19 · Vite · React Router
- Tailwind CSS 4
- Formik + Yup (forms)
- Context API (state, theme, i18n, toast)

## Setup

```bash
git clone https://github.com/devamir99/authlab-react.git
cd authlab-react
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

> **No API server required.** All authentication is simulated on the client.

## Deploy

Ready for static hosting (Vercel, Netlify, GitHub Pages):

```bash
npm run build
```

**Vercel:** connect repo — `vercel.json` included for SPA routing.

**Preview locally:**

```bash
npm run preview
```

## Scripts

```bash
npm run dev      # Development server
npm run build    # Production build
npm run preview  # Preview production build
npm run lint     # ESLint
```

## Demo flows

| Flow | Route |
|------|--------|
| Email login | `/auth/email/login` — demo@authlab.dev / 123456 |
| Social OAuth | `/auth/social` → pick provider |
| Phone OTP | `/auth/phone` → code **123456** |
| Magic link | `/auth/magic-link` → simulate click |

## License

MIT — see [LICENSE](LICENSE).

---

**Note:** UI showcase only — not for production auth without a real backend.
