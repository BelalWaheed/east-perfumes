# 🕌 East Perfumes

A premium, immersive e-commerce platform specializing in luxury oriental and western fragrances. This project is built with a focus on high-end aesthetics, accessibility, and unique user engagement features.

## 🚀 Key Features

### 💎 Immersive User Experience

- **Ambient Scent Descriptions**: Integrated custom audio engine utilizing the **Web Media Session API** for background playback control. Provides an immersive auditory layer to product exploration.
- **Fluid UI/UX**: Built with **Tailwind CSS 4** and **Framer-style micro-animations**, delivering a "premium-first" visual experience.
- **Responsive & Bi-directional**: Full support for **Arabic (RTL)** and **English (LTR)**, with a dynamic theme engine (Light/Dark mode).

### 🎁 Advanced Loyalty Ecosystem

- **Points Redemption Engine**: A sophisticated loyalty system allowing users to earn points on purchases and redeem them via a dynamic pricing slider.
- **Gamified Guest Experience**: Proactively promotes the points system to guest users to drive conversion and registration.

### 🛡️ Product Integrity & Security

- **NFC Authentication Protocol**: Integrated product verification system. Users can verify the authenticity of their scents using unique NFC codes or serial numbers.
- **Privacy-First Design**: NFC codes are masked from public view and strictly managed within the secure Admin Dashboard.

### 🛍️ Unified Commerce

- **Omnichannel Checkout**: Seamless transition from digital browsing to personalized sales via **WhatsApp API** integration.
- **Real-time Cart Management**: Persistence-ready cart handling with instant quantity updates and price recalculations.

### ⚙️ Professional Admin Suite

- **Dashboard Analytics**: At-a-glance management of products and users.
- **Resource Management**: Full CRUD operations for products (including NFC management) and user profiles with multi-role support (Admin/User).

---

## 🛠️ Technical Stack

- **Frontend**: React 19 (Functional Components, Hooks)
- **State Management**: Redux Toolkit (Slices, Thunks, Persistence logic)
- **Routing**: React Router DOM 7
- **Styling**: Tailwind CSS 4 (Custom design tokens, HSL palettes)
- **Internationalization**: Custom I18n implementation for high-performance localized lookup.
- **API Integration**: RESTful architecture with centralized API wrapper and error handling.
- **Build Tool**: Vite (Ultra-fast HMR and optimized production bundling)

---

## 📁 Project Architecture

```text
src/
├── components/     # Atomic UI components & layout wrappers
├── i18n/           # Localization dictionaries (AR/EN)
├── hooks/          # Custom hooks (Translation, SEO, Interactions)
├── layouts/        # Page layout orchestration
├── lib/            # Utilities, API clients, and core logic
├── pages/          # Feature-based page components
│   ├── admin/      # Secure dashboard views
│   └── user/       # Public-facing storefront
└── redux/          # Global state engine (Slices & Store)
```

---

## 🛠️ Development Setup

### Prerequisites

- Node.js (LTS version recommended)
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file based on the environment requirements:
   ```env
   VITE_API_URL=your_api_endpoint
   VITE_WHATSAPP_PHONE=your_business_phone
   ```

### Running Locally

```bash
npm run dev
```

### Production Build

```bash
npm run build
```

---

## 🛡️ Production Readiness

- **SEO Optimized**: Dynamic meta tags and semantic HTML structure.
- **Performance Focused**: Lazy loading, optimized assets, and efficient Redux state updates.
- **Build Stability**: Continuous verification via automated Vite build processes.

---

© 2026 East Perfumes. Crafted for excellence.
