# Fastify Product Catalog API

A high-performance CRUD API for a product catalog built with **Fastify**, **TypeScript**, and **Zod**. This application features automated documentation, E2E testing, and a built-in Load Balancer using the Node.js Cluster API.

## 🚀 Features

- **Fastify v5**: Modern, low-overhead web framework.
- **TypeScript**: Strictly typed codebase using ES Modules (ESM).
- **Swagger UI**: Interactive API documentation and testing.
- **Zod Validation**: Schema-based testing and data integrity.
- **Cluster Mode**: Horizontal scaling with a Round-robin Load Balancer.
- **In-Memory Storage**: State management with UUID generation.

---

## 🛠 Available Scripts

Use the following commands to manage the application:


| Command | Description |
| :--- | :--- |
| `npm run start:dev` | **Development Mode**: Starts the server using `tsx` with hot-reload. |
| `npm run start:multi` | **Cluster Mode**: Launches a Load Balancer and multiple worker instances. |
| `npm run build` | **Production Build**: Compiles TypeScript files into the `dist` folder. |
| `npm run start:prod` | **Production Run**: Starts the compiled JavaScript application from `dist`. |
| `npm test` | **Testing**: Runs the E2E test suite using `vitest`. |

---

## 📋 API Documentation

Once the server is running, you can access the **Swagger UI** for interactive testing:
- **URL**: `http://localhost:4000/docs` (or your configured `PORT`)

### Endpoints
- `GET /api/products` — Retrieve all products.
- `GET /api/products/:id` — Get a specific product by its UUID.
- `POST /api/products` — Create a new product.
- `PUT /api/products/:id` — Update an existing product.
- `DELETE /api/products/:id` — Remove a product from the catalog.

---

## 🧪 Testing

The test suite ensures data consistency across the entire CRUD lifecycle. It verifies:
1. Initial empty state.
2. Successful record creation and UUID validation.
3. Read/Update operations using specific IDs.
4. Proper deletion and subsequent 404 error handling.

Run tests with:
```bash
npm test
