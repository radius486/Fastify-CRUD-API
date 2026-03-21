import fp from 'fastify-plugin';
import swagger from '@fastify/swagger';
import swaggerUi from '@fastify/swagger-ui';

export default fp(async (fastify) => {
  await fastify.register(swagger, {
    openapi: {
      info: {
        title: 'Product Catalog API',
        description: 'Simple CRUD API for product catalog',
        version: '1.0.0'
      }
    }
  });

  await fastify.register(swaggerUi, {
    routePrefix: '/api/docs'
  });
});
