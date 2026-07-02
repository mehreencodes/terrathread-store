# 🧵 TerraThread — Modern Fashion Ecommerce Store

TerraThread is a fully responsive, feature-rich ecommerce web application for a clothing brand — built with React, React Router, and Tailwind CSS. It includes product browsing, cart & wishlist management, authentication, an admin panel, and a polished, animated UI designed to feel like a real production storefront.

**🔗 Live Demo:** [terrathread-store.vercel.app](https://terrathread-store.vercel.app/)

---

## ✨ Features

- 🛍️ **Product Catalog** — browse products by category with search and filtering
- 🛒 **Shopping Cart** — add, update quantity, and remove items
- ❤️ **Wishlist** — save favorite products for later
- 🔐 **Authentication** — login/signup flow with protected account pages
- 👤 **Account Settings & Order History** — manage profile and view past orders
- 🛠️ **Admin Panel** — dedicated dashboard for store management
- 🔎 **Live Search** — instant product search with category suggestions in the navbar
- 📱 **Fully Responsive** — optimized experience across mobile, tablet, and desktop
- 🎨 **Custom Animations** — scroll-triggered text reveals, animated counters, a custom cursor, and smooth section transitions
- 🧭 **Smooth Navigation** — smart scroll-to-section behavior from any page
- 📰 **Newsletter Signup** — email capture section
- ⭐ **Customer Testimonials** — carousel with dot navigation

---

## 🖥️ Pages

| Page | Description |
|---|---|
| Home | Hero, categories, featured products, testimonials, newsletter |
| Shop | Full product listing |
| New Arrivals | Latest products |
| Sale | Discounted items |
| Product Detail | Individual product view |
| Cart | Review and manage cart items |
| Wishlist | Saved products |
| About | Brand story |
| Contact | Contact form |
| Account Settings | User profile management |
| Orders | Order history |
| Admin | Store management dashboard |

---

## 🛠️ Tech Stack

- **React** — component-based UI
- **React Router DOM** — client-side routing
- **Tailwind CSS** — utility-first styling
- **Context API** — global state for Cart, Wishlist, and Auth
- **Vite** — fast build tool and dev server
- **Vercel** — deployment and hosting

---

## 📁 Project Structure

```
TerraThread/
├── public/
├── src/
│   ├── assets/            # Images
│   ├── components/        # Navbar, Footer, ProductCard, TestimonialCard, etc.
│   ├── context/           # CartContext, WishlistContext, AuthContext
│   ├── data/               # Product data
│   ├── pages/              # Home, Shop, Cart, About, Admin, etc.
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── package.json
└── vite.config.js
```

---

## 🚀 Getting Started

Clone the repository and install dependencies:

```bash
git clone https://github.com/mehreencodes/terrathread-store.git
cd terrathread-store
npm install
```

Run the development server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

---

## 📌 Roadmap

- [ ] Payment gateway integration (Stripe/PayPal)
- [ ] Product reviews & ratings on product detail pages
- [ ] Backend API integration for real order/user data
- [ ] Order tracking

---

## 👩‍💻 Author

**Mehreen** — [github.com/mehreencodes](https://github.com/mehreencodes)

---

## 📄 License

This project is open source and available for learning purposes.
