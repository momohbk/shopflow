import { initDb, saveDb, getDb } from './db.js';

async function seed() {
  await initDb();
  const db = getDb();

  const categories = [
    { name: 'Electronics', slug: 'electronics' },
    { name: 'Clothing', slug: 'clothing' },
    { name: 'Home & Garden', slug: 'home-garden' },
    { name: 'Books', slug: 'books' },
    { name: 'Sports', slug: 'sports' },
  ];

  for (const c of categories) {
    db.run('INSERT OR IGNORE INTO categories (name, slug) VALUES (?, ?)', [c.name, c.slug]);
  }

  const products = [
    { name: 'Wireless Headphones', slug: 'wireless-headphones', description: 'Premium noise-canceling wireless headphones with 30hr battery life.', price: 149.99, stock: 45, category: 'electronics', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&q=80' },
    { name: 'Smart Watch', slug: 'smart-watch', description: 'Fitness tracker with heart rate monitor, GPS, and 7-day battery.', price: 199.99, stock: 30, category: 'electronics', image: 'https://images.unsplash.com/photo-1546868871-af0de0ae72b7?w=400&q=80' },
    { name: 'Bluetooth Speaker', slug: 'bluetooth-speaker', description: 'Portable waterproof speaker with rich bass and 12hr playtime.', price: 79.99, stock: 60, category: 'electronics', image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&q=80' },
    { name: 'Denim Jacket', slug: 'denim-jacket', description: 'Classic denim jacket with modern fit. 100% cotton.', price: 89.99, stock: 25, category: 'clothing', image: 'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=400&q=80' },
    { name: 'Running Shoes', slug: 'running-shoes', description: 'Lightweight mesh running shoes with responsive cushioning.', price: 129.99, stock: 40, category: 'clothing', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&q=80' },
    { name: 'Casual Sneakers', slug: 'casual-sneakers', description: 'Everyday canvas sneakers with comfort insole.', price: 59.99, stock: 80, category: 'clothing', image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=400&q=80' },
    { name: 'Indoor Plant Pot', slug: 'indoor-plant-pot', description: 'Ceramic planter with drainage tray. 8-inch diameter.', price: 34.99, stock: 55, category: 'home-garden', image: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=400&q=80' },
    { name: 'Scented Candle Set', slug: 'scented-candle-set', description: 'Set of 3 soy wax candles: lavender, vanilla, sandalwood.', price: 44.99, stock: 70, category: 'home-garden', image: 'https://images.unsplash.com/photo-1602523961352-f8e44c5b5d5e?w=400&q=80' },
    { name: 'Throw Blanket', slug: 'throw-blanket', description: 'Soft microfiber throw blanket. Machine washable.', price: 39.99, stock: 90, category: 'home-garden', image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&q=80' },
    { name: 'JavaScript: The Good Parts', slug: 'javascript-good-parts', description: 'Deep dive into the best features of JavaScript.', price: 29.99, stock: 100, category: 'books', image: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?w=400&q=80' },
    { name: 'Clean Code', slug: 'clean-code', description: 'A handbook of agile software craftsmanship.', price: 39.99, stock: 65, category: 'books', image: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?w=400&q=80' },
    { name: 'Yoga Mat', slug: 'yoga-mat', description: 'Non-slip exercise mat with carrying strap. 6mm thick.', price: 24.99, stock: 120, category: 'sports', image: 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=400&q=80' },
  ];

  for (const p of products) {
    const stmt = db.prepare('SELECT id FROM categories WHERE slug = ?');
    stmt.bind([p.category]);
    if (stmt.step()) {
      const catId = stmt.getAsObject().id;
      db.run(
        'INSERT OR IGNORE INTO products (name, slug, description, price, stock, category_id, image) VALUES (?, ?, ?, ?, ?, ?, ?)',
        [p.name, p.slug, p.description, p.price, p.stock, catId, p.image]
      );
    }
    stmt.free();
  }

  saveDb();
  console.log('Database seeded successfully!');
}

seed().catch(console.error);
