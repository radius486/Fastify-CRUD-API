const productProperties = {
  id: { type: 'string' },
  name: { type: 'string' },
  price: { type: 'number' },
  description: { type: 'string' },
  category: { type: 'string' },
  inStock: { type: 'boolean' },
};

const productIdParam = {
  type: 'object',
  properties: {
    id: { type: 'string' }
  },
  required: ['id']
};

export const getAllProductsSchema = {
  description: 'Get product list',
  tags: ['Products'],
  response: {
    200: {
      type: 'array',
      items: { type: 'object', properties: productProperties }
    }
  }
};

export const getProductSchema = {
  description: 'Get product by ID',
  tags: ['Products'],
  params: productIdParam,
  response: {
    200: { type: 'object', properties: productProperties },
    404: {
      type: 'object',
      properties: { error: { type: 'string' } }
    }
  }
};

export const createProductSchema = {
  description: 'Create new product',
  tags: ['Products'],
  body: {
    type: 'object',
    required: ['name', 'price', 'category', 'inStock'],
    properties: {
      name: { type: 'string', minLength: 2 },
      price: { type: 'number', minimum: 0 },
      description: { type: 'string', minLength: 2 },
      category: { type: 'string', minLength: 2 },
      inStock: { type: 'boolean' },
    }
  },
  response: {
    201: { type: 'object', properties: productProperties }
  }
};

export const updateProductSchema = {
  description: 'Update existing product',
  tags: ['Products'],
  params: productIdParam,
  body: {
    type: 'object',
    required: ['name', 'price', 'category', 'inStock'],
    properties: {
      name: { type: 'string', minLength: 2 },
      price: { type: 'number', minimum: 0 },
      description: { type: 'string', minLength: 2 },
      category: { type: 'string', minLength: 2 },
      inStock: { type: 'boolean' },
    }
  },
  response: {
    200: { type: 'object', properties: productProperties },
    404: { type: 'object', properties: { error: { type: 'string' } } }
  }
};

export const deleteProductSchema = {
  description: 'Delete existing product',
  tags: ['Products'],
  params: productIdParam,
  response: {
    204: { type: 'null', description: 'Product has been successfully deleted' },
    404: { type: 'object', properties: { error: { type: 'string' } } }
  }
};
