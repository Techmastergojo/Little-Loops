import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import db from './db.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 4000;
const ADMIN_SECRET_KEY = process.env.ADMIN_SECRET_KEY || 'll_sec_admin_78294a91fbc84d128e';

app.use(cors());
app.use(express.json());

// Path to compiled production frontend
const distPath = path.join(__dirname, '..', 'dist');

// Pricing calculation helper: 1 for 199, 2 for 299
function calculatePricing(totalQuantity) {
  const qty = Math.max(1, parseInt(totalQuantity, 10) || 1);
  const pairCount = Math.floor(qty / 2);
  const singleCount = qty % 2;
  const totalAmount = (pairCount * 299) + (singleCount * 199);
  const originalAnchor = (pairCount * 400) + (singleCount * 250);
  const savings = Math.max(0, originalAnchor - totalAmount);

  return {
    itemCount: qty,
    pairCount,
    singleCount,
    totalAmount,
    originalAnchor,
    savings,
  };
}

// ─────────────────────────────────────────────────────────────
// SEO SITEMAP & ROBOTS.TXT (FOR REAL GOOGLE SEARCH RESULTS)
// ─────────────────────────────────────────────────────────────

app.get('/robots.txt', (req, res) => {
  const host = req.get('host');
  const protocol = req.protocol;
  const content = `User-agent: *
Allow: /
Disallow: /admin
Disallow: /api/admin/

Sitemap: ${protocol}://${host}/sitemap.xml
`;
  res.header('Content-Type', 'text/plain');
  res.send(content);
});

app.get('/sitemap.xml', (req, res) => {
  const host = req.get('host');
  const protocol = req.protocol;
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${protocol}://${host}/</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${protocol}://${host}/#customizer</loc>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>${protocol}://${host}/#catalog</loc>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
</urlset>`;
  res.header('Content-Type', 'application/xml');
  res.send(xml);
});

// ─────────────────────────────────────────────────────────────
// PUBLIC STORE APIS
// ─────────────────────────────────────────────────────────────

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', store: 'Little Loops Atelier', time: new Date().toISOString() });
});

app.post('/api/quote', (req, res) => {
  const { itemCount } = req.body;
  const quote = calculatePricing(itemCount);
  res.json(quote);
});

app.post('/api/orders', (req, res) => {
  try {
    const {
      customerName,
      customerPhone,
      customerAddress,
      customerCity,
      customerNote,
      items,
    } = req.body;

    if (!customerName || !customerPhone || !customerAddress || !items || !items.length) {
      return res.status(400).json({
        error: 'Missing required customer delivery information or order items.',
      });
    }

    const totalQty = items.reduce((sum, item) => sum + (parseInt(item.quantity, 10) || 1), 0);
    const pricing = calculatePricing(totalQty);
    const orderId = 'LL-' + Math.floor(100000 + Math.random() * 900000);

    const insertStmt = db.prepare(`
      INSERT INTO orders (
        id,
        customer_name,
        customer_phone,
        customer_address,
        customer_city,
        customer_note,
        item_count,
        pair_count,
        total_amount,
        savings_amount,
        status,
        items_json
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'pending', ?)
    `);

    insertStmt.run(
      orderId,
      customerName.trim(),
      customerPhone.trim(),
      customerAddress.trim(),
      (customerCity || 'Pakistan').trim(),
      (customerNote || '').trim(),
      pricing.itemCount,
      pricing.pairCount,
      pricing.totalAmount,
      pricing.savings,
      JSON.stringify(items)
    );

    res.status(201).json({
      success: true,
      orderId,
      totalAmount: pricing.totalAmount,
      itemCount: pricing.itemCount,
      savings: pricing.savings,
      message: 'Order placed successfully in Little Loops system.',
    });
  } catch (err) {
    console.error('Order creation error:', err);
    res.status(500).json({ error: 'Failed to record order. Please retry.' });
  }
});

// ─────────────────────────────────────────────────────────────
// SECURE ADMIN APIS
// ─────────────────────────────────────────────────────────────

function requireAdminAuth(req, res, next) {
  const authHeader = req.headers['x-admin-key'] || req.headers['authorization'];
  if (!authHeader) {
    return res.status(401).json({ error: 'Unauthorized. Admin key required.' });
  }

  const cleanKey = authHeader.replace(/^Bearer\s+/i, '').trim();
  if (cleanKey !== ADMIN_SECRET_KEY) {
    return res.status(403).json({ error: 'Forbidden. Invalid admin key.' });
  }

  next();
}

app.get('/api/admin/verify', requireAdminAuth, (req, res) => {
  res.json({ verified: true, role: 'atelier_owner' });
});

app.get('/api/admin/orders', requireAdminAuth, (req, res) => {
  try {
    const orders = db.prepare('SELECT * FROM orders ORDER BY created_at DESC').all();
    const totalOrders = orders.length;
    const totalRevenue = orders.reduce((sum, o) => sum + (o.status !== 'cancelled' ? o.total_amount : 0), 0);
    const pendingCount = orders.filter((o) => o.status === 'pending').length;
    const dispatchedCount = orders.filter((o) => o.status === 'dispatched' || o.status === 'completed').length;

    const formattedOrders = orders.map((o) => ({
      ...o,
      items: JSON.parse(o.items_json),
    }));

    res.json({
      metrics: {
        totalOrders,
        totalRevenue,
        pendingCount,
        dispatchedCount,
      },
      orders: formattedOrders,
    });
  } catch (err) {
    console.error('Admin fetch orders error:', err);
    res.status(500).json({ error: 'Failed to retrieve orders.' });
  }
});

app.patch('/api/admin/orders/:id/status', requireAdminAuth, (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const validStatuses = ['pending', 'confirmed', 'crafting', 'dispatched', 'completed', 'cancelled'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ error: 'Invalid status code.' });
    }

    const updateStmt = db.prepare('UPDATE orders SET status = ? WHERE id = ?');
    const result = updateStmt.run(status, id);

    if (result.changes === 0) {
      return res.status(404).json({ error: 'Order not found.' });
    }

    res.json({ success: true, orderId: id, status });
  } catch (err) {
    console.error('Admin update status error:', err);
    res.status(500).json({ error: 'Failed to update order status.' });
  }
});

app.delete('/api/admin/orders/:id', requireAdminAuth, (req, res) => {
  try {
    const { id } = req.params;
    const delStmt = db.prepare('DELETE FROM orders WHERE id = ?');
    const result = delStmt.run(id);

    if (result.changes === 0) {
      return res.status(404).json({ error: 'Order not found.' });
    }

    res.json({ success: true, message: `Order ${id} deleted.` });
  } catch (err) {
    console.error('Admin delete error:', err);
    res.status(500).json({ error: 'Failed to delete order.' });
  }
});

// ─────────────────────────────────────────────────────────────
// SERVE PRODUCTION FRONTEND & SPA FALLBACK
// ─────────────────────────────────────────────────────────────

if (fs.existsSync(distPath)) {
  app.use(express.static(distPath));

  app.get('*', (req, res) => {
    res.sendFile(path.join(distPath, 'index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`✓ Little Loops Production Server running on port ${PORT}`);
});
