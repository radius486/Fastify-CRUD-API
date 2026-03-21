import {
  getAllProductsSchema,
  getProductSchema,
  createProductSchema,
  updateProductSchema,
  deleteProductSchema
} from '../schemas/product.js';

import { products } from '../db/products.js';

export default async function (fastify) {
  fastify.get('/api/products', {
    schema: getAllProductsSchema,
  }, async () => {
    return products;
  });

  fastify.get('/api/products/:id', {
    schema: getProductSchema,
  }, async (request, reply) => {
    const { id } = request.params;
    const product = products.find(p => p.id === id);

    if (!product) {
      return reply.status(404).send({ error: 'Product not found' });
    }

    return product;
  });

  fastify.post('/api/products', {
    schema: createProductSchema,
  },async (request, reply) => {
    const { name, description, price, category, inStock } = request.body;

    const newProduct = {
      id: `id_${products.length + 1}`,
      name,
      description,
      price,
      category,
      inStock,
    };

    products.push(newProduct);

    return reply.status(201).send(newProduct);
  });

  fastify.put('/api/products/:id', {
    schema: updateProductSchema,
  }, async (request, reply) => {
    const { id } = request.params;
    const { name, description, price, category, inStock } = request.body;
    const index = products.findIndex(p => p.id === id);

    if (index === -1) {
      return reply.status(404).send({ error: 'Product not found' });
    }

    products[index] = { id: id, name, description, price, category, inStock };

    return products[index];
  });

  fastify.delete('/api/products/:id', {
    schema: deleteProductSchema,
  }, async (request, reply) => {
    const { id } = request.params;
    const index = products.findIndex(p => p.id === id);

    if (index === -1) {
      return reply.status(404).send({ error: 'Product not found' });
    }

    products.splice(index, 1);

    return reply.status(204).send();
  });
}
