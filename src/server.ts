import Fastify from 'fastify';
import { AppConfig } from './types/common.js';
import { buildApp } from './app.js';

declare module 'fastify' {
  interface FastifyInstance {
    config: AppConfig;
  }
}

const fastify = Fastify({ logger: true });

const start = async () => {
  try {
    const fastify = await buildApp();
    const port = Number(process.env.PORT) || 4000;

    await fastify.listen({ port, host: '0.0.0.0' });

    console.log(`Server listening on port ${port}`);
    console.log(`Docs: http://localhost:${port}/docs`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
