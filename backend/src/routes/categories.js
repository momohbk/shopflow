import { Router } from 'express';
import { getDb, saveDb } from '../db.js';

const router = Router();

router.get('/', (req, res) => {
  const db = getDb();
  const stmt = db.prepare(`
    SELECT c.id, c.name, c.slug, c.created_at, COUNT(p.id) as product_count
    FROM categories c
    LEFT JOIN products p ON p.category_id = c.id
    GROUP BY c.id
    ORDER BY c.name
  `);
  const categories = [];
  while (stmt.step()) {
    categories.push(stmt.getAsObject());
  }
  stmt.free();
  res.json(categories);
});

router.post('/', (req, res) => {
  const db = getDb();
  const { name, slug } = req.body;
  if (!name || !slug) return res.status(400).json({ error: 'Name and slug are required' });
  try {
    const stmt = db.prepare('INSERT INTO categories (name, slug) VALUES (?, ?)');
    stmt.run([name, slug]);
    stmt.free();
    saveDb();
    res.status(201).json({ id: db.exec('SELECT last_insert_rowid()')[0].values[0][0] });
  } catch (err) {
    if (err.message && err.message.includes('UNIQUE')) return res.status(409).json({ error: 'Category already exists' });
    res.status(500).json({ error: err.message || 'Failed to create category' });
  }
});

router.delete('/:id', (req, res) => {
  const db = getDb();
  try {
    const stmt = db.prepare('DELETE FROM categories WHERE id = ?');
    stmt.run([parseInt(req.params.id)]);
    stmt.free();
    saveDb();
    const check = db.exec('SELECT changes() as changes');
    const changed = check[0].values[0][0];
    if (changed === 0) return res.status(404).json({ error: 'Category not found' });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message || 'Failed to delete category' });
  }
});

export default router;
