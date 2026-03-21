
import Fastify from 'fastify';
import swaggerPlugin from './plugins/swagger.js';
import productRoutes from './routes/products.js';
import fastifyEnv from '@fastify/env';

const fastify = Fastify({ logger: true });

const schema = {
  type: 'object',
  required: ['PORT'],
  properties: {
    PORT: {
      type: 'integer',
      default: 3000
    }
  }
};

const options = {
  confKey: 'config', // переменные будут доступны в fastify.config
  schema: schema,
  dotenv: true // загружать из .env файла
};

const start = async () => {
  try {
    await fastify.register(swaggerPlugin);
    await fastify.register(productRoutes);
    await fastify.register(fastifyEnv, options);

    await fastify.listen({ port: fastify.config.PORT });
    console.log(`Server listening on port ${fastify.config.PORT}`);
    console.log(`Docs: http://localhost:${fastify.config.PORT}/docs`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
