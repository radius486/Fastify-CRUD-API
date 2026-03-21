
import Fastify from 'fastify';
import swaggerPlugin from './plugins/swagger.js';
import productRoutes from './routes/products.js';

const fastify = Fastify({ logger: true });

const start = async () => {
  try {
    await fastify.register(swaggerPlugin);
    await fastify.register(productRoutes);

    await fastify.listen({ port: 3000 });
    console.log('Docs: http://localhost:3000/docs');
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
