# 🕌 East Perfumes

A premium e-commerce platform for luxury oriental and western fragrances, built with React 19 and modern web technologies.

## 🚀 Features

### User Experience

- **Bi-directional UI** — Full Arabic (RTL) & English (LTR) support with dynamic theme (Light/Dark)
- **Ambient Audio** — Integrated audio engine with Web Media Session API for immersive product exploration
- **Responsive Design** — Tailwind CSS 4 with premium micro-animations

### Loyalty System

- **Flat 50-point rewards** — Earn 50 points per product purchase/NFC verification
- **Points Redemption** — Redeem points via a dynamic pricing slider at checkout
- **Guest Promotion** — Drives conversion by showcasing the points system to guests

### Product Security

- **NFC Authentication** — Verify product authenticity via unique NFC codes on physical packaging
- **Rolling Codes** — NFC codes rotate after each verification for security

### Commerce

- **WhatsApp Checkout** — Seamless order flow via WhatsApp API integration
- **Cart Management** — Persistent cart with quantity controls and price recalculation

### Admin Dashboard

- **Product Management** — Full CRUD for products including NFC code and audio management
- **User Management** — User CRUD with role-based access (Admin/User)

---

## 🛠️ Tech Stack

| Layer    | Technology                           |
| -------- | ------------------------------------ |
| Frontend | React 19, Vite 7                     |
| State    | Redux Toolkit (Slices + Thunks)      |
| Routing  | React Router DOM 7                   |
| Styling  | Tailwind CSS 4                       |
| i18n     | Custom hook-based translation system |
| API      | RESTful with centralized client      |
| Hosting  | Vercel                               |

---

## 📁 Project Structure

```
src/
├── components/     # Reusable UI components
├── context/        # React context providers (Audio)
├── hooks/          # Custom hooks (Translation, SEO)
├── i18n/           # Localization (ar.json, en.json)
├── layouts/        # Page layout wrappers
├── lib/            # Utilities & API client
├── pages/
│   ├── admin/      # Dashboard views
│   └── user/       # Storefront pages
└── redux/
    └── slices/     # Redux state (profile, products, cart, etc.)
```

---

## 🛠️ Setup

### Prerequisites

- Node.js (LTS)
- npm

### Install & Run

```bash
npm install
npm run dev
```

### Environment Variables

Create a `.env` file:

```env
VITE_API_URL=your_api_endpoint
VITE_WHATSAPP_PHONE=your_business_phone
```

### Production Build

```bash
npm run build
```

---

## 🌐 Deployment

Hosted on **Vercel** with SPA rewrites configured in `vercel.json`. All client-side routes (including NFC deep links like `/verify/:nfcCode`) are handled correctly.

---

© 2026 East Perfumes. Crafted for excellence.
