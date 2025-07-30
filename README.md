```Domain-Based Architecture (Feature-Sliced Architecture)
nilgiris_angular_app/
├── src/
│ ├── app/
│ │ ├── models/ # All TypeScript interfaces
│ │ │ ├── session.model.ts
│ │ │ ├── address.model.ts
│ │ │ ├── customer.model.ts
│ │ │ ├── user-database.model.ts
│ │ │ ├── product/
│ │ │ │ ├── package-size.model.ts
│ │ │ │ ├── product-status.model.ts
│ │ │ │ ├── product.model.ts
│ │ │ │ └── product-database.model.ts
│ │ │ ├── order/
│ │ │ │ ├── order-item.model.ts
│ │ │ │ ├── shipping.model.ts
│ │ │ │ ├── order-status.model.ts
│ │ │ │ ├── payment-method.model.ts
│ │ │ │ ├── payment-details.model.ts
│ │ │ │ ├── order.model.ts
│ │ │ │ └── order-database.model.ts
│ │ │ ├── transaction.model.ts
│ │ │ ├── category.model.ts
│ │ │ ├── app-database.model.ts #main starting
│ │ │ ├── brand.model.ts
│ │ │ ├── wishlist-item.model.ts
│ │ │ ├── cart-item.model.ts
│ │ │ ├── coupon.model.ts
│ │ │ └── index.ts # Barrel file for exports
│ │ │
│ │ │
│ │ ├── admin/ # Admin section (lazy loaded)
│ │ │ ├── admin-shared/ # Admin shared module
│ │ │ │ ├── components/
│ │ │ │ │ └── admin-sidebar/
│ │ │ │ └── admin-shared.module.ts
│ │ │ │
│ │ │ ├── components/ # Admin feature components
│ │ │ │ ├── admin-profile/
│ │ │ │ ├── admin-layout/
│ │ │ │ ├── brands/
│ │ │ │ ├── categories/
│ │ │ │ ├── content/
│ │ │ │ ├── coupon-code/
│ │ │ │ ├── customers/
│ │ │ │ ├── dashboard/
│ │ │ │ ├── orders/
│ │ │ │ ├── products/
│ │ │ │ └── transaction/
│ │ │ ├── admin-routing.module.ts
│ │ │ └── admin.module.ts
│ │ │
│ │ ├── customer/ # Customer section (lazy loaded)
│ │ │ ├── customer-shared/ # Customer shared module
│ │ │ │ ├── components/
│ │ │ │ │ ├── customer-nav/
│ │ │ │ │ ├── product-slider/
│ │ │ │ │ └── customer-footer/
│ │ │ │ └── customer-shared.module.ts
│ │ │ │
│ │ │ ├── components/ # Customer feature components
│ │ │ │ ├── cart/
│ │ │ │ ├── contact-us/
│ │ │ │ ├── home/
│ │ │ │ ├── product-page/
│ │ │ │ └── wishlist/
│ │ │ ├── customer-routing.module.ts/
│ │ │ └── customer.module.ts
│ │ │
│ │ ├── app-shared/ # Public routes
│ │ │ ├── mock-data/
│ │ │ │ ├── data-to-mongodb.ts
│ │ │ │ ├── mock-data.ts
│ │ │ │ └── post-data.ts
│ │ │ ├── components/
│ │ │ │ └── login/
│ │ │ └── app-shared.module.ts
│ │ │
│ │ ├── app.component.specs.ts
│ │ ├── app.component.ts
│ │ ├── app.config.server.ts  
│ │ ├── app.config.ts
│ │ ├── app.routes.server.ts
│ │ └── app.routes.ts  
│ │
│ ├── assets/
│ └── environments/

commands to run
ng serve --open```


# 🛍️ Nilgiris Commerce Web App

An enterprise-level, full-featured e-commerce platform developed with **Angular**, supporting **domain-based architecture** for scalability and maintainability. The application is split into two main portals:

- 👤 **Customer Portal** – for browsing, wishlist, ordering, and user interactions.
- 🛠️ **Admin Portal** – for complete management of the platform.

The frontend communicates with the backend via a **middleware gateway microservice** (Node.js/Express) connected to a **MongoDB** database using RESTful APIs.

---

## 📌 Table of Contents

- [🌐 Live Demo](#-live-demo)
- [✨ Features](#-features)
- [🗂️ Project Structure](#-project-structure)
- [⚙️ Tech Stack](#-tech-stack)
- [🚀 Getting Started](#-getting-started)
- [🧠 Architecture Highlights](#-architecture-highlights)
- [📦 Microservices Gateway](#-microservices-gateway)
- [🧪 Testing](#-testing)
- [📄 License](#-license)

---

## 🌐 Live Demo

> _**Coming Soon**_ – Can be deployed on Vercel/Netlify for frontend and Render/Heroku/AWS for backend.

---

## ✨ Features

### 👤 Customer Portal

- User-friendly responsive interface
- Browse products by **categories** and **brands**
- Add items to **cart** or **wishlist**
- Place **orders** and track them
- View product details, ratings, and sizes
- Contact Us form & customer footer
- Hero banners and category flash cards via dynamic content management

### 🛠️ Admin Portal

- Secure login and profile management
- **Dashboard** with summaries and statistics
- Full **Product Management**
  - Add, update, delete products
  - Manage package size and stock
- **Customer Management** with CRUD
- **Order Management** with payment and shipping status
- **Coupon Code Management**
- **Category and Brand Management**
- **Content Management**
  - Manage Hero section banners
  - Update Social Media links
  - Edit Category Flash Cards
- **Transaction & Reports Management**
- **Low Stock Alerts** with restock functionality
- Help Center & Admin Profile section

---

## 🗂️ Project Structure

```frontend/
├── src/
│   ├── app/
│   │   ├── models/                  # Domain models (Customer, Order, Product, etc.)
│   │   ├── admin/                   # Admin features (Lazy-loaded)
│   │   ├── customer/                # Customer features (Lazy-loaded)
│   │   ├── app-shared/             # Shared modules/components (e.g., Login, mock data)
│   │   └── app.component.ts        # Root component
│   │   └── app.routes.ts           # Main routes
│   ├── assets/                     # Static assets
│   └── environments/               # Environment configs
```

---

## ⚙️ Tech Stack

| Frontend        | Backend         | Database     | Others             |
|-----------------|------------------|--------------|--------------------|
| Angular 17+     | Node.js (Express Gateway) | MongoDB (via Compass) | Lazy Loading, Modular Imports |
| TypeScript      | RESTful API      | Mongoose ORM | Feature-Sliced Architecture |
| HTML, SCSS      | Middleware Proxy |              | Authentication (Basic) |

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/nilgiris_angular_app.git
cd nilgiris_angular_app
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Run Angular App

```bash
ng serve --open
```

This will open the app in your default browser at `http://localhost:4200/`.

### 4. Backend Setup (Gateway Microservice)

- Clone/start your middleware gateway microservice (e.g., `node-middleware-gateway`)
- Update proxy configuration or services in Angular to hit gateway URLs like:

```ts
http://localhost:5000/api/products
http://localhost:5000/api/orders
```

- Backend should be connected to your **MongoDB instance** via `mongoose`.

---

## 🧠 Architecture Highlights

### 🔹 Feature-Sliced Design

Each domain (admin, customer) is isolated and lazy-loaded, enhancing performance and maintainability.

### 🔹 Modular Models

All data interfaces/types are organized inside `models/`, segmented by domain (product, order, user, etc.)

### 🔹 Shared Modules

- `admin-shared` and `customer-shared` contain reusable components (e.g., nav, footers, sliders).

### 🔹 Routing and Environment Separation

- Separate routing for server and client environments.
- All API endpoints are easily configurable via `environments`.

---

## 📦 Microservices Gateway

A custom-built **Node.js Express Gateway** is used to:

- Handle requests from frontend Angular app
- Forward requests to backend REST APIs
- Manage authentication headers or sessions if needed
- Enable secure communication between microservices

### Example Architecture:

```
Angular App (4200)
   ↓
Gateway (5000)
   ↓
Node.js/Express REST APIs (Backend)(3000)
   ↓
MongoDB Database (Compass (27017))
```

---

## 🧪 Testing

Basic unit testing is supported via:

- Jasmine
- Karma (Angular CLI test runner)
- Postman for backend API testing

---

## 📄 License

This project is under the [MIT License](LICENSE).

---

> Made with ❤️ by Aravind P
