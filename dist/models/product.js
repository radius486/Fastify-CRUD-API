import fs from 'node:fs';
import path from 'node:path';
import { products } from '../db/products.js';
const DB_PATH = path.resolve(process.cwd(), './src/db/products.json');
;
export const getProducts = () => {
    if (!fs.existsSync(DB_PATH))
        return [];
    return JSON.parse(fs.readFileSync(DB_PATH, 'utf-8'));
};
export const saveProducts = (products) => {
    fs.writeFileSync(DB_PATH, JSON.stringify(products));
};
const init = () => {
    saveProducts(products);
};
init();
