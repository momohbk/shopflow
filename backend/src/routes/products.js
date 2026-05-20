import { Router } from 'express';
import { getDb, saveDb } from '../db.js';

const router = Router();

router.get('/', (req, res) => {
  const db = getDb();
  const { search, category, page = 1, limit = 12 } = req.query;
  const p = parseInt(page);
  const l = parseInt(limit);
  const offset = (p - 1) * l;

  let where = [];
  let params = [];

  if (search) {
    where.push('(p.name LIKE ? OR p.description LIKE ?)');
    params.push(`%${search}%`, `%${search}%`);
  }

  if (category) {
    where.push('c.slug = ?');
    params.push(category);
  }

  const whereClause = where.length ? 'WHERE ' + where.join(' AND ') : '';

  const countSql = `SELECT COUNT(*) as total FROM products p LEFT JOIN categories c ON p.category_id = c.id ${whereClause}`;
  const countStmt = db.prepare(countSql);
  if (params.length > 0) countStmt.bind(params);
  if (countStmt.step()) {
    var total = countStmt.getAsObject({ total: 'number' }).total;
  } else {
    var total = 0;
  }
  countStmt.free();

  const dataSql = `
    SELECT p.id, p.name, p.slug, p.description, p.price, p.stock, p.category_id, p.image, p.created_at, p.updated_at, c.name as category_name, c.slug as category_slug
    FROM products p
    LEFT JOIN categories c ON p.category_id = c.id
    ${whereClause}
    ORDER BY p.created_at DESC
    LIMIT ? OFFSET ?
  `;
  const dataStmt = db.prepare(dataSql);
  dataStmt.bind([...params, l, offset]);
  const products = [];
  while (dataStmt.step()) {
    products.push(dataStmt.getAsObject());
  }
  dataStmt.free();

  res.json({ products, total, page: p, totalPages: Math.ceil(total / l) || 1 });
});

router.get('/:id', (req, res) => {
  const db = getDb();
  const stmt = db.prepare(`
    SELECT p.id, p.name, p.slug, p.description, p.price, p.stock, p.category_id, p.image, p.created_at, p.updated_at, c.name as category_name, c.slug as category_slug
    FROM products p
    LEFT JOIN categories c ON p.category_id = c.id
    WHERE p.id = ?
  `);
  stmt.bind([parseInt(req.params.id)]);
  if (!stmt.step()) {
    stmt.free();
    return res.status(404).json({ error: 'Product not found' });
  }
  const product = stmt.getAsObject();
  stmt.free();
  res.json(product);
});

router.post('/', (req, res) => {
  const db = getDb();
  const { name, slug, description, price, stock, category_id, image } = req.body;
  if (!name || !slug || !price) {
    return res.status(400).json({ error: 'Name, slug, and price are required' });
  }
  try {
    const stmt = db.prepare(
      'INSERT INTO products (name, slug, description, price, stock, category_id, image) VALUES (?, ?, ?, ?, ?, ?, ?)'
    );
    stmt.run([name, slug, description || '', parseFloat(price), parseInt(stock) || 0, category_id ? parseInt(category_id) : null, image || '']);
    stmt.free();
    saveDb();
    res.status(201).json({ id: db.exec('SELECT last_insert_rowid()')[0].values[0][0] });
  } catch (err) {
    if (err.message && err.message.includes('UNIQUE')) return res.status(409).json({ error: 'Product slug already exists' });
    res.status(500).json({ error: err.message || 'Failed to create product' });
  }
});

router.put('/:id', (req, res) => {
  const db = getDb();
  const { name, slug, description, price, stock, category_id, image } = req.body;
  try {
    const stmt = db.prepare(
      'UPDATE products SET name = ?, slug = ?, description = ?, price = ?, stock = ?, category_id = ?, image = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?'
    );
    stmt.run([name, slug, description, parseFloat(price), parseInt(stock), category_id ? parseInt(category_id) : null, image, parseInt(req.params.id)]);
    stmt.free();
    saveDb();
    const check = db.exec(`SELECT changes() as changes`);
    const changed = check[0].values[0][0];
    if (changed === 0) return res.status(404).json({ error: 'Product not found' });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message || 'Failed to update product' });
  }
});

router.delete('/:id', (req, res) => {
  const db = getDb();
  try {
    const stmt = db.prepare('DELETE FROM products WHERE id = ?');
    stmt.run([parseInt(req.params.id)]);
    stmt.free();
    saveDb();
    const check = db.exec(`SELECT changes() as changes`);
    const changed = check[0].values[0][0];
    if (changed === 0) return res.status(404).json({ error: 'Product not found' });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message || 'Failed to delete product' });
  }
});

export default router;
