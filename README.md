# Next Pizza 🍕

An interactive pizza ordering platform built with Next.js 14, featuring a modern tech stack and seamless user experience.

## Features

- 🛒 Real-time shopping cart with persistent storage
- 🔍 Advanced filtering and search capabilities
- 💳 Secure payment processing with Stripe integration
- 📱 Responsive design for all devices
- 🔐 User authentication with email verification
- 📦 Order tracking and history
- 🎨 Modern UI with Tailwind CSS animations

## Tech Stack

- **Frontend:**
  - Next.js 14 (App Router)
  - React
  - TypeScript
  - Tailwind CSS
  - Zustand (State Management)
  - Lucide Icons

- **Backend:**
  - Prisma (ORM)
  - PostgreSQL
  - Next.js API Routes
  - NextAuth.js

- **Payment:**
  - Stripe Integration

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/denys-semanchuk/Next-Pizza
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```

4. Set up the database:
```bash
npx prisma migrate dev
```

5. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Environment Variables

Create a `.env` file with the following variables:

```env
POSTGRES_URL=
POSTGRES_URL_NON_POOLING=
NEXT_PUBLIC_API_URL=/api
RESEND_API_KEY=
NEXT_PUBLIC_GOOGLE_PLACES_API_KEY=
NEXT_PUBLIC_URL=
STRIPE_SECRET_KEY=
STRIPE_CALLBACK_URL=


GITHUB_ID=
GITHUB_SECRET=

NEXTAUTH_SECRET=secret

GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
```

## Project Structure

```
├── app/                 # Next.js app router pages
├── components/          # Reusable UI components
├── lib/                 # Utility functions and helpers
├── prisma/             # Database schema and migrations
├── public/             # Static assets
└── shared/             # Shared types, hooks, and store
```

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
