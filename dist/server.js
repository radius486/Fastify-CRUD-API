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
    confKey: 'config',
    schema: schema,
    dotenv: true,
};
const start = async () => {
    try {
        await fastify.register(fastifyEnv, options);
        await fastify.register(swaggerPlugin);
        await fastify.register(productRoutes);
        const port = fastify.config.PORT;
        await fastify.listen({ port, host: '0.0.0.0' });
        console.log(`Server listening on port ${port}`);
        console.log(`Docs: http://localhost:${port}/docs`);
    }
    catch (err) {
        fastify.log.error(err);
        process.exit(1);
    }
};
start();
