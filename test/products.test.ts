import { describe, it, expect, beforeAll } from 'vitest';
import { buildApp } from '../src/app.js'
import { ProductSchema } from './schemas.js';
import { products } from '../src/db/products.js';
import { getProducts, saveProducts } from '../src/models/product.js';

describe('Product API E2E Scenario', () => {
  let app: any;
  let createdId: string;

  beforeAll(async () => {
    app = await buildApp();
    const products = getProducts();

    products.length = 0;

    saveProducts(products);
  });

  it('1. GET /api/products — array should be empty', async () => {
    const res = await app.inject({ method: 'GET', url: '/api/products' });

    expect(res.statusCode).toBe(200);
    expect(res.json()).toEqual([]);
  });

  it('2. POST /api/products — should create new product', async () => {
    const payload = { name: 'Product 1', price: 500, category: 'electronics', inStock: true };
    const res = await app.inject({ method: 'POST', url: '/api/products', payload });

    expect(res.statusCode).toBe(201);

    const body = res.json();
    const result = ProductSchema.safeParse(body);

    expect(result.success).toBe(true);

    createdId = body.id;

    expect(body.name).toBe(payload.name);
  });

  it('3. GET /api/products/{id} — should get new product', async () => {
    const res = await app.inject({ method: 'GET', url: `/api/products/${createdId}` });

    expect(res.statusCode).toBe(200);

    const body = res.json();

    expect(ProductSchema.safeParse(body).success).toBe(true);
    expect(body.id).toBe(createdId);
  });

  it('4. PUT /api/products/{id} — should update existing product', async () => {
    const updatePayload = { name: 'Product 1 modified', price: 600, category: 'electronics', inStock: true  };
    const res = await app.inject({
      method: 'PUT',
      url: `/api/products/${createdId}`,
      payload: updatePayload
    });

    expect(res.statusCode).toBe(200);

    const body = res.json();

    expect(body.id).toBe(createdId);
    expect(body.name).toBe('Product 1 modified');
    expect(body.price).toBe(600);
  });

  it('5. DELETE /api/products/{id} — should delete existing product', async () => {
    const res = await app.inject({ method: 'DELETE', url: `/api/products/${createdId}` });

    expect(res.statusCode).toBe(204);
  });

  it('6. GET /api/products/{id} — should be 404 error', async () => {
    const res = await app.inject({ method: 'GET', url: `/api/products/${createdId}` });

    expect(res.statusCode).toBe(404);
  });
});
