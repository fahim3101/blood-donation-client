# Lifeline – Blood Donation Platform (Server)

Lifeline is a full-stack blood donation platform that connects willing blood donors
with patients and families in urgent need across Bangladesh. This repository contains
the backend (REST API) built with Node.js, Express, and MongoDB.

## Purpose

The server powers user authentication, role-based access control (Donor / Volunteer /
Admin), donation request management, donor search by blood group and location, and
Stripe-powered funding for the platform.

## Live API

https://blood-donation-server-brown-eight.vercel.app

## Key Features

- JWT-based authentication and protected private routes
- Role-based access control middleware (Admin, Volunteer, Donor)
- Full donation request lifecycle: pending → inprogress → done / canceled
- Donor search by blood group, district, and upazila
- Stripe payment integration for funding/donations
- Pagination and status filtering for users and donation requests
- Aggregated statistics and chart data for the admin dashboard
- Bangladesh district & upazila geo data endpoints

## NPM Packages Used

- express
- mongodb
- cors
- dotenv
- jsonwebtoken
- bcryptjs
- stripe
- nodemon (development only)

## Environment Variables

See `.env.example` for the required variables (MongoDB connection, JWT secret, Stripe
secret key).

## Running Locally

```bash
npm install
npm run dev
```