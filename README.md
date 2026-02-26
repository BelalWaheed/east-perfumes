# 🕌 East Perfumes

A premium e-commerce platform for luxury oriental and western fragrances, built with React 19 and modern web technologies.

## 🚀 Features

### User Experience

- **Bi-directional UI** — Full Arabic (RTL, default) & English (LTR) support with dynamic theme (Light/Dark)
- **Ambient Audio** — Integrated audio engine with Web Media Session API for immersive product exploration
- **Responsive Design** — Tailwind CSS 4 with premium micro-animations
- **SEO** — Dynamic per-page meta tags, OG, and Twitter cards in both languages

### Loyalty System

- **Flat 50-point rewards** — Earn 50 points per NFC verification
- **Points Redemption** — Redeem points via a dynamic pricing slider at checkout
- **Guest Verification** — Guests can verify products; points are saved and applied after login/signup

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

This generates a static `dist/` folder with all your files.

---

## 🌐 Deployment

### Hostinger

Since this is a **static SPA** (Single Page Application), you need to:

1. **Build the project**:

   ```bash
   npm run build
   ```

2. **Upload the `dist/` folder** to Hostinger:
   - Go to **Hostinger hPanel** → **File Manager**
   - Navigate to **`public_html`**
   - Delete any default files (index.html, etc.)
   - Upload **all contents** of the `dist/` folder into `public_html`

3. **Add `.htaccess` for SPA routing** — Create a `.htaccess` file inside `public_html` with:

   ```apache
   <IfModule mod_rewrite.c>
     RewriteEngine On
     RewriteBase /
     RewriteRule ^index\.html$ - [L]
     RewriteCond %{REQUEST_FILENAME} !-f
     RewriteCond %{REQUEST_FILENAME} !-d
     RewriteRule . /index.html [L]
   </IfModule>
   ```

   > This is **critical** — without it, direct links like `/verify/NFC-xxx` or `/products/123` will show 404 errors because the server won't know to serve `index.html` for all routes.

4. **Set your domain** — Point your domain to the Hostinger hosting in the Domains section if not already done.

5. **Enable SSL** — Activate the free SSL certificate from hPanel → **SSL** section.

### Vercel (Current)

Already configured via `vercel.json` with SPA rewrites. Just push to GitHub and it auto-deploys.

---

© 2026 East Perfumes. Crafted for excellence.
