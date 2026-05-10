# ShopFlow 🛒

<div align="center">

[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)](https://react.dev)
[![Laravel](https://img.shields.io/badge/Laravel-11-FF2D20?logo=laravel)](https://laravel.com)
[![MySQL](https://img.shields.io/badge/MySQL-8-4479A1?logo=mysql)](https://mysql.com)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss)](https://tailwindcss.com)
[![Stripe](https://img.shields.io/badge/Stripe-Payments-008CDD?logo=stripe)](https://stripe.com)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

**A headless e-commerce platform with real-time inventory management, Stripe payment processing, and a powerful admin dashboard with analytics and reporting.**

[Live Demo](https://shopflow-demo.vercel.app) · [Report Bug](https://github.com/momohbk/shopflow/issues) · [Request Feature](https://github.com/momohbk/shopflow/issues)

</div>

---

## ✨ Key Features

- **Headless Architecture** — Decoupled frontend and backend for maximum flexibility and scalability
- **Real-time Inventory** — Live stock updates with websocket-based sync across all channels
- **Stripe Payments** — Secure payment processing with support for cards, wallets, and subscriptions
- **Admin Dashboard** — Comprehensive analytics with revenue charts, order management, and customer insights
- **Product Management** — Advanced catalog with variants, categories, tags, and bulk import/export
- **Multi-currency** — Automatic currency conversion and localized pricing for global markets

## 🛠 Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | React 19, Vite, Tailwind CSS 4, React Router |
| **Backend** | Laravel 11, Sanctum Auth, Stripe API |
| **Database** | MySQL 8, Redis (caching) |
| **DevOps** | Docker, Vercel (frontend), Forge (backend) |

## 📸 Screenshots

> _Screenshots coming soon_

## 🚀 Installation

### Prerequisites

- Node.js 20+
- PHP 8.2+
- Composer 2+
- MySQL 8+
- Stripe account

### Frontend Setup

```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```

### Backend Setup

```bash
cd backend
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate --seed
php artisan serve
```

## 📁 Project Structure

```
shopflow/
├── frontend/          # React SPA
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── store/
│   │   └── api/
│   └── package.json
├── backend/           # Laravel API
│   ├── app/
│   │   ├── Models/
│   │   ├── Http/
│   │   └── Services/
│   ├── database/
│   │   └── migrations/
│   └── routes/
└── README.md
```

## 🤝 Contributing

Contributions are welcome! Feel free to open issues or submit PRs.

## 📄 License

Distributed under the MIT License. See [LICENSE](LICENSE) for details.

---

<div align="center">
  Built with ❤️ by <a href="https://github.com/momohbk">Mohamed Boukahel</a>
</div>
