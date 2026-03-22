import fs from 'node:fs';
import { Product } from '../types/common.js';
import path from 'node:path';
import { products } from '../db/products.js';


const DB_PATH = path.resolve(process.cwd(), './src/db/products.json');;

export const getProducts = (): Product[] => {
  if (!fs.existsSync(DB_PATH)) return [];
  return JSON.parse(fs.readFileSync(DB_PATH, 'utf-8'));
};

export const saveProducts = (products: Product[]) => {
  fs.writeFileSync(DB_PATH, JSON.stringify(products));
};

const init = () => {
  saveProducts(products);
};

init();
