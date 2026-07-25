# 🩸 Lifeline — Blood Donation Platform (Client)

A warm, story-driven frontend for **Lifeline**, a full-stack blood donation platform connecting willing blood donors with patients and families in urgent need across Bangladesh. Built with **React 19**, **Vite**, **Tailwind CSS**, and a soft red/pink visual identity.

> **Server repo:** [fahim3101/blood-donation-server](https://github.com/fahim3101/blood-donation-server)
> **Client repo:** [fahim3101/blood-donation-client](https://github.com/fahim3101/blood-donation-client)
> **Live Site:** https://blood-donation-client-indol.vercel.app
> **Live API:** https://blood-donation-server-brown-eight.vercel.app

---

## 📑 Table of Contents

- [Overview](#-overview)
- [Tech Stack](#-tech-stack)
- [Feature Tour](#-feature-tour)
- [Project Structure](#-project-structure)
- [Environment Variables](#-environment-variables)
- [Local Development](#-local-development)
- [Build & Preview](#-build--preview)
- [Routing & Role-Based Access](#-routing--role-based-access)
- [State, Auth & Data Fetching](#-state-auth--data-fetching)
- [Styling System](#-styling-system)
- [Deployment](#-deployment)
- [Roadmap](#-roadmap)
- [License](#-license)

---

## 🌟 Overview

Lifeline is built around a single emotional premise: **when minutes matter, a stranger's kindness matters more**. The client delivers that feeling through a calm, warm interface that guides donors, requesters, volunteers, and admins through the same set of actions with the appropriate level of access.

The application is a single-page React app. Authentication is JWT-based and persisted in `localStorage` so a page reload does not log the user out. Role-based dashboards unlock the right tools for each of the three user types: **Donor**, **Volunteer**, and **Admin**.

---

## 🧰 Tech Stack

| Layer                | Library                                    |
|----------------------|--------------------------------------------|
| UI framework         | React 19                                   |
| Routing              | React Router 7                             |
| Build tool           | Vite 8                                     |
| Styling              | Tailwind CSS 3 + PostCSS + Autoprefixer    |
| HTTP                 | Axios                                      |
| Forms & validation   | Native HTML + `sweetalert2` confirmation   |
| Auth storage         | `localStorage` (JWT)                       |
| Toasts               | `react-hot-toast`                          |
| Icons                | `react-icons`                              |
| Animations           | `framer-motion`                            |
| Charts               | `recharts`                                 |
| Payments             | `@stripe/react-stripe-js` + `@stripe/stripe-js` |
| Image hosting        | ImageBB (public API)                       |
| Linting              | ESLint + React Hooks plugin               |
| Deployment           | Vercel                                     |

---

## 🗺 Feature Tour

### For everyone
- **Landing page** with a hero, mission statement, featured pending requests, and a statistics strip
- **Public donor search** by blood group, district, and upazila
- **Pending donation requests** with infinite scroll
- **Authentication** — register, login, persistent sessions

### For authenticated donors
- **Personal dashboard** with recent activity
- **Create / edit / delete** donation requests
- **Donate flow** with a confirmation modal
- **Profile editor** — name, avatar, blood group, district, upazila

### For volunteers
- **All donation requests** table with status filters
- **Status override** (inprogress / done / canceled)
- **Dashboard statistics** view

### For admins
- **User management** — view, filter, block/unblock, change role
- **Funding history** with paginated list
- **Statistics cards** and a 30-day donation-requests time series chart
- Full volunteer capabilities

### Cross-cutting
- Fully responsive layout (mobile, tablet, desktop)
- Page-level entry animations via Framer Motion
- Accessible focus rings and keyboard-friendly nav
- Skeleton & empty states on every list

---

## 🏗 Project Structure

```
client/
├── public/                  # Static assets served as-is
├── src/
│   ├── assets/              # Local images, logos
│   ├── components/          # Reusable presentational + container components
│   ├── pages/               # Route-level views
│   ├── hooks/               # Custom hooks (auth, fetchers, etc.)
│   ├── context/             # React context providers (Auth, Theme)
│   ├── routes/              # Route definitions + role guards
│   ├── utils/               # Axios instance, formatters, helpers
│   ├── App.jsx              # Root layout
│   ├── main.jsx             # Entry point
│   └── index.css            # Tailwind layers + global styles
├── index.html               # Vite HTML entry
├── vite.config.js           # Vite config
├── tailwind.config.js       # Theme tokens (colors, fonts)
├── postcss.config.js        # PostCSS pipeline
├── eslint.config.js         # Lint rules
├── vercel.json              # SPA rewrite to /index.html
├── .env.example             # Template for required env vars
└── package.json
```

---

## 🌐 Environment Variables

Copy `.env.example` to `.env` and fill in the values. **Never commit `.env`.** All client-side variables must be prefixed with `VITE_`.

| Variable                      | Required | Description                                  |
|-------------------------------|----------|----------------------------------------------|
| `VITE_API_URL`                | ✅       | Base URL of the Lifeline server              |
| `VITE_IMGBB_API_KEY`          | ✅       | ImageBB public key (used for avatar uploads) |
| `VITE_STRIPE_PUBLISHABLE_KEY` | ✅       | Stripe publishable key (test mode starts with `pk_test_…`) |

---

## 🛠 Local Development

**Prerequisites:** Node.js 18+ and the [Lifeline server](../server) running locally.

```bash
# 1. Install dependencies
npm install

# 2. Configure environment
cp .env.example .env
# point VITE_API_URL to your local server, e.g. http://localhost:5000

# 3. Start the dev server
npm run dev
```

Vite will print a local URL (typically `http://localhost:5173`). Hot Module Replacement is enabled.

### Project scripts

| Script            | Description                              |
|-------------------|------------------------------------------|
| `npm run dev`     | Start the Vite dev server with HMR       |
| `npm run build`   | Produce a production build in `dist/`    |
| `npm run preview` | Serve the production build locally       |
| `npm run lint`    | Run ESLint over the project              |

---

## 📦 Build & Preview

```bash
npm run build      # outputs to dist/
npm run preview    # serves dist/ on http://localhost:4173
```

The production bundle is fully static and can be hosted on any CDN.

---

## 🔐 Routing & Role-Based Access

The router is built on React Router 7. Public routes are wrapped in a default layout; private routes go through an `AuthRequired` guard, and privileged routes go through a `RoleGuard` that checks the user's role from the persisted JWT.

```
/                     → public landing
/login, /register     → public auth
/donation-requests    → public list
/search-donors        → public directory
/dashboard            → private, role-aware
   ├── /dashboard     → donor home
   ├── /dashboard/admin/*
   └── /dashboard/volunteer/*
/funding              → private, any role
/profile              → private, self only
```

A 404 catch-all renders a friendly not-found page.

---

## 🧠 State, Auth & Data Fetching

- **Auth state** is held in a React context and persisted to `localStorage` under a single key. On reload, the context hydrates from storage before the first render, so protected routes render with the correct role on the first paint — no flash of logged-out UI.
- **HTTP** uses a single configured Axios instance that:
  - Reads the base URL from `VITE_API_URL`
  - Attaches `Authorization: Bearer <token>` automatically when a token is present
  - Surfaces errors through a `react-hot-toast` toast and, for 401/403, redirects to `/login`
- **Forms** are uncontrolled where possible; richer forms use controlled inputs with minimal state.
- **Mutations** that delete or change status go through `sweetalert2` confirmation dialogs to prevent accidental destructive actions.

---

## 🎨 Styling System

- **Tailwind** is the single source of truth. No CSS-in-JS, no Sass.
- The theme tokens in `tailwind.config.js` define the warm red/pink palette, typography stack, and shadow scale. All component styles compose these tokens.
- Global resets and a few utility classes (e.g. animated gradient background) live in `src/index.css`.
- Framer Motion handles entrance and exit animations; keep durations under 400ms to feel responsive on mobile.

---

## 🚀 Deployment

The project ships with a `vercel.json` that rewrites every route to `index.html`, which is the correct setup for a client-side React Router app:

```json
{ "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }] }
```

**Steps**

1. Push the `client/` directory to its own Git repository (or configure Vercel to use the `client` subdirectory as the root).
2. Import the repo into Vercel as a new project. Vite is auto-detected; the build command is `npm run build`, the output directory is `dist`.
3. Add every variable from the [Environment Variables](#-environment-variables) table to the Vercel project settings.
4. Deploy. Vercel will assign a URL and rebuild on every push to the default branch.

For other static hosts (Netlify, Cloudflare Pages, GitHub Pages), configure the same SPA rewrite — every request should serve `index.html` so React Router can take over.

---

## 🧭 Roadmap

- [ ] Server-side rendering for the landing page for better SEO
- [ ] Push notifications when a new matching donation request is created
- [ ] Multilingual UI (Bangla + English)
- [ ] Map view of nearby donors using district/upazila centroids
- [ ] Story page — case studies of patients who found a match
- [ ] Dark mode

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feat/your-feature`
3. Commit your changes
4. Open a pull request describing the change and any screenshots

Run `npm run lint` before pushing.

---

## 📄 License

MIT © Lifeline contributors
