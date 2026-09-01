<div align="center">

# 🩸 Lifeline — Blood Donation Platform (Client)

### *A drop of yours can be someone's lifetime.*

Warm, story-driven frontend for Lifeline — connecting donors & patients across Bangladesh

<br/>

[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-8-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev)
[![Tailwind](https://img.shields.io/badge/Tailwind-3-38BDF8?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![React Router](https://img.shields.io/badge/React_Router-7-CA4245?style=for-the-badge&logo=reactrouter&logoColor=white)](https://reactrouter.com)

<br/>

[![Live Site](https://img.shields.io/badge/Live_Client-Vercel-c0392b?style=for-the-badge&logo=vercel)](https://blood-donation-client-indol.vercel.app)
[![Live API](https://img.shields.io/badge/Live_API-Vercel-2c3e50?style=for-the-badge&logo=vercel)](https://blood-donation-server-brown-eight.vercel.app)
[![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)](LICENSE)

[🌐 Live Demo](https://blood-donation-client-indol.vercel.app) • [⚡ API](https://blood-donation-server-brown-eight.vercel.app) • [📖 Root Docs](../README.md) • [🔧 Server Docs](../server/README.md)

</div>

---

## 📑 Table of Contents

- [Overview](#-overview)
- [Live Links & Repos](#-live-links--repos)
- [Demo Accounts](#-demo-accounts)
- [Preview](#️-preview)
- [Tech Stack](#-tech-stack)
- [Features](#-features)
- [Project Structure](#-project-structure)
- [Routing & Role Guards](#-routing--role-guards)
- [State, Auth & Data Fetching](#-state-auth--data-fetching)
- [Styling System](#-styling-system)
- [Environment Variables](#-environment-variables)
- [Local Development](#-local-development)
- [Build & Preview](#-build--preview)
- [Deployment](#-deployment)
- [Roadmap](#-roadmap)
- [Contributing & License](#-contributing--license)

---

## 🌟 Overview

**Lifeline Client** is a single-page React app with a soft red/pink identity, built around one emotional premise:

> **When minutes matter, a stranger's kindness matters more.**

- **JWT auth** persisted in `localStorage` — no flash of logged-out UI on reload
- **Role-aware dashboards** for **Donor / Volunteer / Admin**
- **Framer Motion** page transitions, **Recharts** analytics, **Stripe** funding
- **Fully responsive** — mobile, tablet, desktop

---

## 🔗 Live Links & Repos

| Resource | Link |
|----------|------|
| 🌐 **Live Client** | [blood-donation-client-indol.vercel.app](https://blood-donation-client-indol.vercel.app) |
| ⚡ **Live API** | [blood-donation-server-brown-eight.vercel.app](https://blood-donation-server-brown-eight.vercel.app) |
| 💻 Client Repo | [fahim3101/blood-donation-client](https://github.com/fahim3101/blood-donation-client) |
| 🔧 Server Repo | [fahim3101/blood-donation-server](https://github.com/fahim3101/blood-donation-server) |

---

## 🔑 Demo Accounts

> For evaluators — click **Copy** on the Home page or use these directly on `/login`:

| Role | Email | Password | What you can see |
|------|-------|----------|------------------|
| 👑 **Admin** | `fr87817833@gmail.com` | `Admin@123` | Users, all requests, funding, stats & charts |
| 🤝 **Volunteer** | `bcd@gmail.com` | `Demo@123` | All requests, status override, stats |
| ❤️ **Donor** | `abc@gmail.com` | `Demo@123` | Create / edit / delete own requests, donate flow |

---

## 🖼️ Preview

| Home Hero | Search Donors | Dashboard |
|:---:|:---:|:---:|
| Gradient hero + stats strip + demo cards + *How it Works* + story | Filter by bloodGroup / district / upazila (protected) | Role-aware home, charts, tables |
| ![Home](https://images.unsplash.com/photo-1615461066159-fea0960485d5?auto=format&fit=crop&w=600&q=80) | ![Search](https://images.unsplash.com/photo-1576669801820-a9ab287ac2d1?auto=format&fit=crop&w=600&q=80) | ![Dashboard](https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80) |

> Replace placeholders with real screenshots in `public/screenshots/` for submission.

---

## 🧰 Tech Stack

| Layer | Library |
|-------|---------|
| **UI Framework** | React 19 |
| **Routing** | React Router 7 (`createBrowserRouter`) |
| **Build Tool** | Vite 8 |
| **Styling** | Tailwind CSS 3 + PostCSS + Autoprefixer |
| **HTTP** | Axios (secure instance with JWT interceptor) |
| **Auth Storage** | `localStorage` (`access-token` + `user-email`) |
| **Forms** | Native HTML + controlled inputs + `sweetalert2` confirms |
| **Toasts** | `react-hot-toast` |
| **Icons** | `react-icons` |
| **Animations** | `framer-motion` |
| **Charts** | `recharts` |
| **Payments** | `@stripe/react-stripe-js` + `@stripe/stripe-js` |
| **Image Hosting** | ImageBB (public API) |
| **Linting** | ESLint + `eslint-plugin-react-hooks` |
| **Deployment** | Vercel (SPA rewrite) |

---

## ✨ Features

### 🌍 For Everyone
- **Landing page:** hero, mission, live stats (`/public-stats`), *How it Works* (3 steps), emotional story, contact form
- **Pending requests:** public paginated list at `/blood-donation-requests`
- **Auth:** Register, Login, Forgot / Reset Password (email link, 15-min expiry)
- **404:** friendly `ErrorPage` via `errorElement`

### 🔒 For Authenticated Users
- **Donor Search** at `/search` (protected) — filter by `bloodGroup`, `district`, `upazila`, availability toggle
- **Request Details** at `/donation-requests/:id` — donate flow with confirm modal (`inprogress`)
- **Funding** at `/funding` — Stripe PaymentIntent + funding history (paginated)

### ❤️ For Donors (default role)
- **Dashboard Home** — recent 3 requests + quick actions
- **My Donation Requests** — paginated + status filter (`pending / inprogress / done / canceled`)
- **Create / Edit / Delete** — `isAvailable` + auto-cancel if `donationDate < today`
- **Profile** — name, avatar (ImageBB), bloodGroup, district/upazila, availability toggle

### 🤝 For Volunteers
- **All Blood Donation Requests** — full table with status filter + override (`done / canceled`)
- **Dashboard Stats** — `totalUsers`, `totalRequests`, `totalFunding` + 30-day time series

### 👑 For Admins
- **All Users** — list, paginate, filter `active/blocked`, block/unblock, change role (`donor ↔ volunteer ↔ admin`)
- **Funding History** — paginated list
- **Statistics Cards + Recharts** time series
- Inherits all Volunteer capabilities

### 🎨 Cross-Cutting
- Responsive (mobile → desktop), skeleton & empty states, focus rings & keyboard nav
- Motion entry animations < 400ms, `react-hot-toast` + `sweetalert2` for destructive actions

---

## 🏗 Project Structure

```text
client/
├── public/
│   ├── blood-drop.svg
│   └── screenshots/            # ← add your screenshots here
├── src/
│   ├── assets/                 # Local images, logos
│   ├── components/             # Navbar, Footer, Shared, RoleRoute, PrivateRoute,
│   │                           # DonationRequestsTable, AddressSelector, CheckoutForm, Spinner
│   ├── pages/
│   │   ├── Home.jsx            # Hero, stats, demo cards, How it Works, contact
│   │   ├── Login.jsx / Register.jsx / ForgotPassword.jsx / ResetPassword.jsx
│   │   ├── Search.jsx          # Protected donor directory
│   │   ├── BloodDonationRequests.jsx
│   │   ├── DonationRequestDetails.jsx
│   │   ├── Funding.jsx         # Stripe flow
│   │   ├── ErrorPage.jsx
│   │   └── Dashboard/
│   │       ├── DashboardHome.jsx   # Role-aware router
│   │       ├── DonorHome.jsx / AdminHome.jsx
│   │       ├── MyDonationRequests.jsx
│   │       ├── CreateDonationRequest.jsx / EditDonationRequest.jsx
│   │       ├── AllUsers.jsx
│   │       └── AllBloodDonationRequests.jsx
│   ├── layouts/
│   │   ├── MainLayout.jsx
│   │   └── DashboardLayout.jsx
│   ├── contexts/AuthProvider.jsx  # JWT rehydration via /users/:email
│   ├── hooks/useAuth.js
│   ├── routes/Router.jsx          # createBrowserRouter + RoleRoute
│   ├── utils/
│   │   ├── axiosSecure.js         # Axios instance + Bearer token + 401 redirect
│   │   └── uploadImage.js         # ImageBB helper
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css               # Tailwind layers + globals
├── index.html                  # Vite entry + SEO + OG + Fraunces/Inter fonts
├── vite.config.js
├── tailwind.config.js          # Warm red/pink tokens
├── postcss.config.js
├── eslint.config.js
├── vercel.json                 # { "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }] }
├── .env.example
└── package.json
```

---

## 🔐 Routing & Role Guards

Built on **React Router 7**. Public routes use `MainLayout`; all `/dashboard/*` is wrapped in `PrivateRoute` → `RoleRoute`.

```text
/                                →  Home (public)
/register, /login                →  Auth (public)
/forgot-password, /reset-password→  Password reset (public)
/blood-donation-requests         →  Pending list (public, paginated)
/search                          →  🔒 Private — donor directory
/donation-requests/:id           →  🔒 Private — details + donate
/funding                         →  🔒 Private — Stripe + history

/dashboard                       →  🔒 Private, role-aware
  /                              →    DashboardHome (donor/volunteer/admin switch)
  /profile                       →    Profile (self)
  /my-donation-requests          →    donor | volunteer | admin
  /create-donation-request       →    donor | volunteer | admin
  /edit-donation-request/:id     →    donor | volunteer | admin
  /all-users                     →    admin only
  /all-blood-donation-requests   →    admin | volunteer
  /all-blood-donation-request    →    legacy alias → same as above
/*                               →  ErrorPage (404)
```

**Guards:**
- `PrivateRoute` — checks `localStorage access-token` + `AuthContext`, redirects to `/login` if missing/invalid
- `RoleRoute({ allowedRoles })` — checks `user.role` from hydrated JWT

---

## 🧠 State, Auth & Data Fetching

- **AuthContext** (`src/contexts/AuthProvider.jsx:1`) holds `{ user, loading, register, login, logout, refreshUser }`
  - On mount, reads `access-token` + `user-email` from `localStorage` and calls `GET /users/:email` via `axiosSecure` — no flash of logged-out UI
  - `register` → `POST /users` → `login`; `login` → `POST /jwt` → stores `token` + `user`
- **axiosSecure** (`src/utils/axiosSecure.js:1`)
  - BaseURL = `VITE_API_URL`, auto-attaches `Authorization: Bearer <token>`
  - Intercepts `401/403` → toast + redirect to `/login`
- **Forms:** uncontrolled where possible, controlled for richer forms; destructive mutations confirm via `sweetalert2`

---

## 🎨 Styling System

- **Tailwind** is the single source — no CSS-in-JS, no Sass
- Tokens in `tailwind.config.js` — warm `primary` (red/pink), `blush`, `cream`, `Fraunces` + `Inter`
- Globals & animated gradients in `src/index.css`
- **Framer Motion** for entrance/exit — keep durations ≤ 400ms for mobile snappiness

---

## 🌐 Environment Variables

Copy `.env.example` → `.env`. **Never commit `.env`.** All Vite vars need `VITE_` prefix.

| Variable | Required | Description |
|----------|----------|-------------|
| `VITE_API_URL` | ✅ | Base URL of Lifeline server — `http://localhost:5000` locally |
| `VITE_IMGBB_API_KEY` | ✅ | ImageBB public key for avatar uploads ([api.imgbb.com](https://api.imgbb.com/)) |
| `VITE_STRIPE_PUBLISHABLE_KEY` | ✅ | Stripe publishable key — test mode starts `pk_test_…` |

```bash
VITE_API_URL=http://localhost:5000
VITE_IMGBB_API_KEY=your_imgbb_api_key
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_xxxxxxxxxxxxxxxxxxxxxx
```

---

## 🛠 Local Development

**Prerequisites:** Node.js 18+ and the Lifeline server running (see [`../server/README.md`](../server/README.md)).

```bash
# 1. Install
npm install

# 2. Env
cp .env.example .env
# set VITE_API_URL to http://localhost:5000

# 3. Dev server (HMR)
npm run dev
# → http://localhost:5173
```

| Script | Description |
|--------|-------------|
| `npm run dev` | Vite dev server with HMR |
| `npm run build` | Production build → `dist/` |
| `npm run preview` | Serve `dist/` at `http://localhost:4173` |
| `npm run lint` | ESLint |

> Ensure `VITE_API_URL` points to your local server. The bundle is fully static — hostable on any CDN.

---

## 📦 Build & Preview

```bash
npm run build      # → dist/
npm run preview    # serves dist/ locally for final check
```

---

## 🚀 Deployment

`vercel.json` handles SPA routing:

```json
{ "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }] }
```

**Vercel steps:**
1. Push `client/` as its own repo (or set Vercel **Root Directory** to `client`)
2. Import into Vercel — Vite auto-detected (`npm run build` → `dist`)
3. Add all vars from [Environment Variables](#-environment-variables) in Project Settings
4. Deploy — rebuilds on every push to default branch

> **Other hosts** (Netlify, Cloudflare Pages): configure the same SPA rewrite — every request should serve `index.html`.

---

## 🧭 Roadmap

- [ ] SSR for Home (better SEO)
- [ ] Push notifications for matching requests
- [ ] Bangla + English i18n
- [ ] Map view via district/upazila centroids
- [ ] Case-study story page
- [ ] Dark mode

---

## 🤝 Contributing & License

```bash
git checkout -b feat/your-feature
npm run lint
# open PR with description + screenshots
```

**MIT** © Lifeline contributors

<div align="center">

Made with ❤️ for Bangladesh — *One drop. One life.*

[⬆ Back to Top](#-lifeline--blood-donation-platform-client)

</div>
