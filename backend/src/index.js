import express from 'express';
import cors from 'cors';
import { initDb } from './db.js';
import productsRouter from './routes/products.js';
import categoriesRouter from './routes/categories.js';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/api/products', productsRouter);
app.use('/api/categories', categoriesRouter);

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

initDb().then(() => {
  app.listen(PORT, () => {
    console.log(`ShopFlow API running on http://localhost:${PORT}`);
  });
}).catch(console.error);
