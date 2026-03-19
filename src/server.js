import Fastify from 'fastify';

const fastify = Fastify({
  logger: true
})

let products = [
  {
    id: 'id_1',
    name: 'Product 2',
    description: 'Some product',
    price: 100,
    category: 'electronics',
    inStock: true,
  },
];

fastify.get('/api/products', async (request, reply) => {
  return products;
});

fastify.get('/api/products/:id', async (request, reply) => {
  const { id } = request.params;
  const product = products.find(p => p.id === id);

  if (!product) {
    return reply.status(404).send({ error: 'Product not found' });
  }

  return product;
});

fastify.post('/api/products', async (request, reply) => {
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

fastify.put('/api/products/:id', async (request, reply) => {
  const { id } = request.params;
  const { name, description, price, category, inStock } = request.body;
  const index = products.findIndex(p => p.id === id);

  if (index === -1) {
    return reply.status(404).send({ error: 'Product not found' });
  }

  products[index] = { id: id, name, description, price, category, inStock };

  return products[index];
});

fastify.delete('/api/products/:id', async (request, reply) => {
  const { id } = request.params;
  const initialLength = products.length;

  products = products.filter(p => p.id !== id);

  if (products.length === initialLength) {
    return reply.status(404).send({ error: 'Product not found' });
  }

  return reply.status(204).send();
});

const start = async () => {
  try {
    await fastify.listen({ port: 3000 });
    console.log(`Server is running at http://localhost:3000`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
