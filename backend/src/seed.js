/**
 * Seed script — run once to populate the DB with your existing data.
 * Usage: node src/seed.js
 *
 * You can also paste your full MockAPI exports into the arrays below.
 */
import 'dotenv/config';
import mongoose from 'mongoose';
import { connectDB } from './config/db.js';
import { Product } from './models/Product.js';
import { User } from './models/User.js';

// ─── Paste your exported MockAPI products here ─────────────
const PRODUCTS = [
  {
    name: 'White Musk',
    description: 'Soft clean musk scent with a calm spiritual character.',
    price: 1000,
    discount: 20,
    image: 'https://m.media-amazon.com/images/I/61asg+7RSoL._AC_UF350,350_QL80_.jpg',
    category: 'Musk',
    gender: 'men',
    nfcCode: [
      { code: 'NFC-WM01-BLQH', used: '0' },
      { code: 'NFC-WM02-KGJL', used: '0' },
      { code: 'NFC-WM50-MLXG', used: '0' },
    ],
    audioURL: [
      'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3',
      'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3',
    ],
  },
  // ← add more products from your MockAPI export here
];

// ─── Paste your exported MockAPI users here ────────────────
const USERS = [
  {
    name: 'Admin',
    email: 'admin@perfume.com',
    password: 'adminp123',
    role: 'admin',
    purchasedProducts: [],
    totalPoints: 0,
    usedPoints: 0,
    availablePoints: 0,
  },
  // ← add more users here
];

async function seed() {
  await connectDB();

  // Clear existing data (comment out if you want to APPEND instead)
  await Product.deleteMany({});
  await User.deleteMany({});
  console.log('🗑️  Cleared existing products and users');

  const products = await Product.insertMany(PRODUCTS);
  const users    = await User.insertMany(USERS);

  console.log(`✅ Seeded ${products.length} products`);
  console.log(`✅ Seeded ${users.length} users`);

  await mongoose.disconnect();
  console.log('🔌 Disconnected. Seed complete!');
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
