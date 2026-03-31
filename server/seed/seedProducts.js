const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('../models/Product');

dotenv.config({ path: '../.env' });

const products = [
  {
    name: 'Premium Black Pepper',
    price: 299,
    description:
      'Our premium Black Pepper is sourced fresh from the lush, organic estates of Kajanaparai. Each peppercorn is hand-picked at peak maturity, sun-dried naturally, and carefully processed to preserve its bold aroma and intense flavor. Rich in antioxidants, it adds a sharp, earthy warmth to any dish — from curries to marinades. No additives. No preservatives. Pure nature in every grain.',
    image: 'https://images.unsplash.com/photo-1599909533731-b63e7f5d2b8b?w=600&auto=format',
    category: 'pepper',
    inStock: true,
    unit: '100g',
  },
  {
    name: 'Organic Green Cardamom',
    price: 549,
    description:
      'Nithyam Divyam\'s Organic Green Cardamom brings the essence of Kerala\'s finest spice gardens to your kitchen. These plump, aromatic pods are grown without chemicals in fertile highlands, then carefully sorted and dried to lock in their sweet, floral fragrance. Perfect for biryanis, teas, desserts, and traditional sweets. A spice that transforms every recipe into something extraordinary.',
    image: 'https://images.unsplash.com/photo-1615485500834-bc10199bc727?w=600&auto=format',
    category: 'cardamom',
    inStock: true,
    unit: '50g',
  },
];

const seedProducts = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to MongoDB');

    await Product.deleteMany({});
    console.log('🗑️  Cleared existing products');

    const inserted = await Product.insertMany(products);
    console.log(`🌿 Seeded ${inserted.length} products:`);
    inserted.forEach((p) => console.log(`   - ${p.name} (₹${p.price}/${p.unit})`));

    process.exit(0);
  } catch (error) {
    console.error(`❌ Seed failed: ${error.message}`);
    process.exit(1);
  }
};

seedProducts();
