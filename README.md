# Lifeline - Blood Donation Platform (Client)

This is the frontend (React + Vite + Tailwind CSS) for **Lifeline**, a blood donation
platform connecting donors with people who need blood — featuring role-based dashboards
for Donors, Volunteers, and Admins.

## Live Site
https://your-client-link.vercel.app

## Features
- Warm, story-driven UI design with a soft red/pink theme
- JWT based authentication (register/login) with persistent sessions
- Role-based dashboards (Donor / Volunteer / Admin)
- Create, edit, delete, and search donation requests
- Donate flow with confirmation modal
- Donor search by blood group, district & upazila
- Stripe powered funding/donation page
- Admin charts and statistics (Recharts)
- Fully responsive (mobile, tablet, desktop)
- Smooth animations using Framer Motion

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

## Setup Instructions (local)
1. `npm install`
2. Copy `.env.example` to `.env` and fill in your API URL, ImageBB key, and Stripe publishable key
3. `npm run dev`

The app will start on `http://localhost:5173`

## Test Credentials
After deploying, register a normal account first, then manually change that user's
`role` field to `admin` in your MongoDB Atlas collection to access the Admin Dashboard.
