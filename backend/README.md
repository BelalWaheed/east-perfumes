# TIVAQ Fragrance — Backend API

Express + MongoDB REST API that replaces MockAPI.

## Stack

| Layer    | Tech                          |
|----------|-------------------------------|
| Runtime  | Node.js 20+ (ESM)             |
| Framework| Express 4                     |
| Database | MongoDB via Mongoose 8        |
| Config   | dotenv                        |

---

## Setup

### 1 — Install dependencies

```bash
cd tivaq-backend
npm install
```

### 2 — Create `.env`

```bash
cp .env.example .env
```

Edit `.env`:

```env
PORT=5000

# Local MongoDB
MONGO_URI=mongodb://127.0.0.1:27017/tivaq

# OR MongoDB Atlas (recommended for production)
# MONGO_URI=mongodb+srv://<user>:<pass>@cluster0.xxxxx.mongodb.net/tivaq?retryWrites=true&w=majority
```

### 3 — Seed the database (first time only)

Paste your existing MockAPI data into `src/seed.js`, then run:

```bash
npm run seed
```

### 4 — Start the server

```bash
# Development (auto-restarts on file change)
npm run dev

# Production
npm start
```

Server starts at `http://localhost:5000`.

---

## API Reference

All responses mirror your old MockAPI shape. The `_id` MongoDB field is
automatically serialised as `"id"` (string) in every response.

### Products — `/products`

| Method | Path             | Description        |
|--------|------------------|--------------------|
| GET    | /products        | List all products  |
| GET    | /products/:id    | Get one product    |
| POST   | /products        | Create product     |
| PUT    | /products/:id    | Replace product    |
| PATCH  | /products/:id    | Update fields      |
| DELETE | /products/:id    | Delete product     |

### Users — `/users`

| Method | Path          | Description     |
|--------|---------------|-----------------|
| GET    | /users        | List all users  |
| GET    | /users/:id    | Get one user    |
| POST   | /users        | Create user     |
| PUT    | /users/:id    | Replace user    |
| PATCH  | /users/:id    | Update fields   |
| DELETE | /users/:id    | Delete user     |

---

## Updating your React frontend

In your frontend `.env` file, change `VITE_API_URL` to point to this server:

```env
# local development
VITE_API_URL=http://localhost:5000

# after deploying (e.g. Railway / Render)
VITE_API_URL=https://your-backend.up.railway.app
```

No other frontend changes are needed — the API shape is identical to MockAPI.

---

## Deploying to Railway (free tier)

1. Push this folder to a GitHub repo.
2. Create a new project on [railway.app](https://railway.app).
3. Add a **MongoDB** plugin — Railway gives you a `MONGO_URI` env var automatically.
4. Set `PORT` (Railway injects it automatically too).
5. Deploy — your API goes live in ~2 minutes.

---

## Project structure

```
tivaq-backend/
├── src/
│   ├── config/
│   │   └── db.js            # Mongoose connection
│   ├── middleware/
│   │   └── errorHandler.js  # asyncHandler + global error middleware
│   ├── models/
│   │   ├── Product.js       # Product schema
│   │   └── User.js          # User schema
│   ├── routes/
│   │   ├── products.js      # CRUD routes for products
│   │   └── users.js         # CRUD routes for users
│   ├── seed.js              # One-time data migration script
│   └── server.js            # Express app entry point
├── .env.example
├── .gitignore
└── package.json
```
