import Fastify from 'fastify';
import fastifyEnv from '@fastify/env';
import productRoutes from './routes/products.js';
import swaggerPlugin from './plugins/swagger.js';

const schema = {
  type: 'object',
  required: ['PORT'],
  properties: {
    PORT: {
      type: 'integer',
      default: 4000
    }
  }
} as const;

const options = {
  confKey: 'config',
  schema: schema,
  dotenv: true,
};


export const buildApp = async () => {
  const fastify = Fastify({ logger: false });

  await fastify.register(fastifyEnv, options);
  await fastify.register(swaggerPlugin);
  await fastify.register(productRoutes);

  return fastify;
};
