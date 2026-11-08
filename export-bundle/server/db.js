import Database from 'better-sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dbPath = path.join(__dirname, 'little_loops.db');
const db = new Database(dbPath);

// Enable WAL mode for high performance & reliability
db.pragma('journal_mode = WAL');

// Initialize orders table with all customized details & customer info
db.exec(`
  CREATE TABLE IF NOT EXISTS orders (
    id TEXT PRIMARY KEY,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    customer_name TEXT NOT NULL,
    customer_phone TEXT NOT NULL,
    customer_address TEXT NOT NULL,
    customer_city TEXT NOT NULL,
    customer_note TEXT,
    item_count INTEGER NOT NULL,
    pair_count INTEGER NOT NULL,
    total_amount INTEGER NOT NULL,
    savings_amount INTEGER NOT NULL,
    status TEXT DEFAULT 'pending', -- pending, confirmed, crafting, dispatched, completed, cancelled
    items_json TEXT NOT NULL
  );

  CREATE INDEX IF NOT EXISTS idx_orders_created ON orders(created_at DESC);
  CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
`);

export default db;
