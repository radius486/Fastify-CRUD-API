import { randomUUID } from 'node:crypto';
import { getAllProductsSchema, getProductSchema, createProductSchema, updateProductSchema, deleteProductSchema } from '../schemas/product.js';
import { getProducts, saveProducts } from '../models/product.js';
export default async function (fastify) {
    fastify.get('/api/products', {
        schema: getAllProductsSchema,
    }, async () => {
        return getProducts();
    });
    fastify.get('/api/products/:id', {
        schema: getProductSchema,
    }, async (request, reply) => {
        const { id } = request.params;
        const products = getProducts();
        const product = products.find(p => p.id === id);
        if (!product) {
            return reply.status(404).send({ error: 'Product not found' });
        }
        return product;
    });
    fastify.post('/api/products', {
        schema: createProductSchema,
    }, async (request, reply) => {
        const { name, description, price, category, inStock } = request.body;
        const newProduct = {
            id: randomUUID(),
            name,
            description,
            price,
            category,
            inStock,
        };
        const products = getProducts();
        products.push(newProduct);
        saveProducts(products);
        return reply.status(201).send(newProduct);
    });
    fastify.put('/api/products/:id', {
        schema: updateProductSchema,
    }, async (request, reply) => {
        const { id } = request.params;
        const { name, description, price, category, inStock } = request.body;
        const products = getProducts();
        const index = products.findIndex(p => p.id === id);
        if (index === -1) {
            return reply.status(404).send({ error: 'Product not found' });
        }
        products[index] = { id: id, name, description, price, category, inStock };
        saveProducts(products);
        return products[index];
    });
    fastify.delete('/api/products/:id', {
        schema: deleteProductSchema,
    }, async (request, reply) => {
        const { id } = request.params;
        const products = getProducts();
        const index = products.findIndex(p => p.id === id);
        if (index === -1) {
            return reply.status(404).send({ error: 'Product not found' });
        }
        products.splice(index, 1);
        saveProducts(products);
        return reply.status(204).send();
    });
}
