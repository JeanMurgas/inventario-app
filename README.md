# Inventory Management App

Technical test for inventory management built with Next.js App Router, Prisma, SQLite, JWT authentication and Server Actions.

## Tech Stack

* Next.js 16 (App Router)
* Prisma 7
* SQLite
* JWT Authentication
* bcryptjs
* Server Actions
* Tailwind CSS

## Features

### Authentication

* User registration
* Login / Logout
* JWT persistent authentication with httpOnly cookies
* Protected routes
* Admin role authorization

### Inventory

* Create item
* Edit item
* Delete item
* User ownership protection
* Inventory total calculation
* Quantity validation (0–9999)
* Delete logs

### Admin

* List users
* Create users
* Edit users
* Delete users
* Change user roles

### Profile

* Edit own profile
* Change password

### Theme

* Persistent light/dark mode

## Installation

```bash
npm install
npm run dev
```

## Environment Variables

Create a `.env` file:

```env
DATABASE_URL=file:./prisma/dev.db
JWT_SECRET=your_secret_here
```

## Seed Admin

```bash
npm run seed
```

Admin credentials:

Email:
[admin@test.com](mailto:admin@test.com)

Password:
admin123

## Deployment

Live URL:
inventario-app-production-eba8.up.railway.app
