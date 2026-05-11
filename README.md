# E-commerce Backend API

Production-style REST API backend for an e-commerce platform built using Node.js, Express.js and MongoDB.

## Features

- JWT authentication
- Role-based access control (admin / user)
- Product CRUD
- Filtering and pagination
- Cart management
- Stock-aware cart logic
- Order placement
- Order status lifecycle
- Centralized error handling
- Request validation

## Tech Stack

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- Joi

## Folder Structure

project/
│
├── config/
├── controllers/
├── middleware/
├── models/
├── routes/
├── utils/
├── validators/
└── server.js

## API Endpoints

### Auth

| Method | Endpoint |
|---|---|
| POST | /api/auth/register |
| POST | /api/auth/login |
| GET | /api/auth/profile |

### Products

| Method | Endpoint |
|---|---|
| POST | /api/products |
| GET | /api/products |
| GET | /api/products/:id |
| PUT | /api/products/:id |
| DELETE | /api/products/:id |

### Cart

| Method | Endpoint |
|---|---|
| POST | /api/cart |
| GET | /api/cart |
| DELETE | /api/cart/:productId |

### Orders

| Method | Endpoint |
|---|---|
| POST | /api/orders |
| GET | /api/orders/my-orders |
| PUT | /api/orders/:id/status |

## Local Setup

```bash
git clone <repo-url>
cd ecommerce-backend
npm install
npm run dev
```

## Environment Variables

Create a `.env` file:

```env
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret
```

---

## End-to-End Flow

1. Register user
2. Login
3. Admin creates product
4. User adds cart
5. User places order
6. Stock reduces
7. Cart clears
8. Admin marks delivered

---

## Postman Collection

https://c9565365-9495459.postman.co/workspace/Chandrashekar's-Workspace~bcac3da3-4b4b-417a-8511-f626e99e72c8/collection/54323415-21ad12e4-6f82-4af7-a6b4-f9059a8a7f6b?action=share&source=copy-link&creator=54323415

---

## Swagger Docs

https://ecommerce-backend-q0jj.onrender.com/api/docs

---

## Live API

https://ecommerce-backend-q0jj.onrender.com