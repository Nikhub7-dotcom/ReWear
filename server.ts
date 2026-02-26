import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";
import Database from "better-sqlite3";
import dotenv from "dotenv";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const db = new Database("ecothrift.db");

// Initialize database
db.exec(`
  CREATE TABLE IF NOT EXISTS items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    price INTEGER NOT NULL,
    category TEXT NOT NULL,
    gender TEXT NOT NULL DEFAULT 'Men',
    size TEXT NOT NULL DEFAULT 'M',
    condition TEXT NOT NULL,
    brand TEXT,
    months_used INTEGER,
    image_url TEXT NOT NULL,
    seller_name TEXT NOT NULL,
    seller_id TEXT NOT NULL,
    trust_score INTEGER DEFAULT 100,
    water_saved INTEGER DEFAULT 0,
    co2_prevented INTEGER DEFAULT 0,
    waste_diverted INTEGER DEFAULT 0,
    landfill_prevented REAL DEFAULT 0,
    lifecycle_extended INTEGER DEFAULT 0,
    sustainability_grade TEXT DEFAULT 'Grade A',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    bio TEXT,
    avatar TEXT,
    total_impact_score INTEGER DEFAULT 0,
    items_reused INTEGER DEFAULT 0
  );
`);

// Simple migration logic to add columns if they don't exist
const tableInfo = db.prepare("PRAGMA table_info(items)").all() as any[];
const columns = tableInfo.map(col => col.name);

const migrations = [
  { name: 'gender', type: "TEXT NOT NULL DEFAULT 'Men'" },
  { name: 'size', type: "TEXT NOT NULL DEFAULT 'M'" },
  { name: 'trust_score', type: "INTEGER DEFAULT 100" },
  { name: 'water_saved', type: "INTEGER DEFAULT 0" },
  { name: 'co2_prevented', type: "INTEGER DEFAULT 0" },
  { name: 'waste_diverted', type: "INTEGER DEFAULT 0" },
  { name: 'landfill_prevented', type: "REAL DEFAULT 0" },
  { name: 'lifecycle_extended', type: "INTEGER DEFAULT 0" },
  { name: 'sustainability_grade', type: "TEXT DEFAULT 'Grade A'" }
];

for (const migration of migrations) {
  if (!columns.includes(migration.name)) {
    console.log(`Migrating database: adding ${migration.name} column`);
    db.exec(`ALTER TABLE items ADD COLUMN ${migration.name} ${migration.type}`);
  }
}

// Seed users if empty
const userCount = db.prepare("SELECT COUNT(*) as count FROM users").get() as { count: number };
if (userCount.count === 0) {
  const seedUsers = [
    {
      id: "demo_user",
      name: "EcoUser01",
      email: "eco@example.com",
      bio: "Passionate about circular fashion and reducing textile waste.",
      avatar: "https://picsum.photos/seed/eco/200/200",
      total_impact_score: 1250,
      items_reused: 12
    },
    {
      id: "admin",
      name: "Admin",
      email: "admin@ecothrift.com",
      bio: "Platform administrator and sustainability advocate.",
      avatar: "https://picsum.photos/seed/admin/200/200",
      total_impact_score: 5000,
      items_reused: 45
    }
  ];

  const insertUser = db.prepare(`
    INSERT INTO users (id, name, email, bio, avatar, total_impact_score, items_reused)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `);

  for (const user of seedUsers) {
    insertUser.run(user.id, user.name, user.email, user.bio, user.avatar, user.total_impact_score, user.items_reused);
  }
}

// Seed data if empty
const count = db.prepare("SELECT COUNT(*) as count FROM items").get() as { count: number };
if (count.count === 0) {
  const seedItems = [
    {
      name: "Blue Denim Jeans",
      price: 450,
      category: "Jeans",
      gender: "Men",
      size: "L",
      condition: "Like New",
      brand: "Levi's",
      months_used: 4,
      image_url: "https://picsum.photos/seed/jeans1/800/1000",
      seller_name: "EcoUser01",
      seller_id: "demo_user"
    },
    {
      name: "Black T-shirt",
      price: 180,
      category: "T-shirt",
      gender: "Unisex",
      size: "M",
      condition: "Good",
      brand: "Uniqlo",
      months_used: 6,
      image_url: "https://picsum.photos/seed/tshirt1/800/1000",
      seller_name: "EcoUser01",
      seller_id: "demo_user"
    },
    {
      name: "Grey Hoodie",
      price: 550,
      category: "Hoodie",
      gender: "Unisex",
      size: "XL",
      condition: "Like New",
      brand: "H&M",
      months_used: 2,
      image_url: "https://picsum.photos/seed/hoodie1/800/1000",
      seller_name: "Admin",
      seller_id: "admin"
    },
    {
      name: "White Kurti",
      price: 320,
      category: "Kurti",
      gender: "Women",
      size: "S",
      condition: "Good",
      brand: "FabIndia",
      months_used: 5,
      image_url: "https://picsum.photos/seed/kurti1/800/1000",
      seller_name: "Admin",
      seller_id: "admin"
    },
    {
      name: "Oversized Unisex Jacket",
      price: 780,
      category: "Jacket",
      gender: "Unisex",
      size: "L",
      condition: "Like New",
      brand: "Zara",
      months_used: 3,
      image_url: "https://picsum.photos/seed/jacket1/800/1000",
      seller_name: "EcoUser01",
      seller_id: "demo_user"
    }
  ];

  const insert = db.prepare(`
    INSERT INTO items (
      name, price, category, gender, size, condition, brand, months_used, 
      image_url, seller_name, seller_id, trust_score, 
      water_saved, co2_prevented, waste_diverted, landfill_prevented, lifecycle_extended, sustainability_grade
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  for (const item of seedItems) {
    insert.run(
      item.name, item.price, item.category, item.gender, item.size, item.condition, 
      item.brand, item.months_used, item.image_url, 
      item.seller_name, item.seller_id, 100, 2700, 15, 150, 0.5, 8, 'Grade A'
    );
  }
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: '10mb' }));

  // API Routes
  app.get("/api/items", (req, res) => {
    const items = db.prepare("SELECT * FROM items ORDER BY created_at DESC").all();
    res.json(items);
  });

  app.get("/api/items/:id", (req, res) => {
    const item = db.prepare("SELECT * FROM items WHERE id = ?").get(req.params.id);
    if (item) {
      res.json(item);
    } else {
      res.status(404).json({ error: "Item not found" });
    }
  });

  app.get("/api/profile/:id", (req, res) => {
    const user = db.prepare("SELECT * FROM users WHERE id = ?").get(req.params.id);
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ error: "User not found" });
    }
  });

  app.put("/api/profile/:id", (req, res) => {
    const { name, bio, avatar } = req.body;
    db.prepare("UPDATE users SET name = ?, bio = ?, avatar = ? WHERE id = ?")
      .run(name, bio, avatar, req.params.id);
    res.json({ success: true });
  });

  app.post("/api/items", (req, res) => {
    const { 
      name, price, category, gender, size, condition, brand, months_used, 
      image_url, seller_name, seller_id, trust_score, 
      water_saved, co2_prevented, waste_diverted,
      landfill_prevented, lifecycle_extended, sustainability_grade
    } = req.body;
    
    if (!name || !price || !category || !image_url || !size) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const info = db.prepare(`
      INSERT INTO items (
        name, price, category, gender, size, condition, brand, months_used, 
        image_url, seller_name, seller_id, trust_score, 
        water_saved, co2_prevented, waste_diverted,
        landfill_prevented, lifecycle_extended, sustainability_grade
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
      name, price, category, gender, size, condition, brand, months_used, 
      image_url, seller_name, seller_id, trust_score || 100, 
      water_saved || 0, co2_prevented || 0, waste_diverted || 0,
      landfill_prevented || 0, lifecycle_extended || 0, sustainability_grade || 'Grade A'
    );

    res.json({ id: info.lastInsertRowid });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, "dist")));
    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "dist", "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
