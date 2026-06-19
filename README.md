# Lifeline – Blood Donation Platform (Client)

Lifeline is a full-stack blood donation platform connecting willing blood donors with
patients and families in urgent need across Bangladesh. This repository contains the
frontend, built with React, Vite, and Tailwind CSS.

## Purpose

The client provides a warm, story-driven interface for donor registration, donation
request browsing and creation, donor search, funding, and role-based dashboards for
Donors, Volunteers, and Admins.

## Live Site

https://blood-donation-client-indol.vercel.app

## Key Features

- Warm, emotionally resonant UI with a soft red/pink theme
- JWT-based authentication with persistent sessions (no logout on page reload)
- Role-based dashboards for Donor, Volunteer, and Admin
- Create, edit, delete, and filter donation requests with pagination
- Donate flow with a confirmation modal
- Public donor search by blood group, district, and upazila
- Stripe-powered funding page
- Admin statistics cards and a donation-requests-over-time chart (Recharts)
- Fully responsive design for mobile, tablet, and desktop
- Smooth page animations with Framer Motion

## NPM Packages Used

- react, react-dom, react-router-dom
- axios
- tailwindcss
- react-hot-toast
- react-icons
- sweetalert2
- recharts
- framer-motion
- @stripe/react-stripe-js, @stripe/stripe-js

## Environment Variables

See `.env.example` for the required variables (API URL, ImageBB key, Stripe publishable
key).

## Running Locally

```bash
npm install
npm run dev
```