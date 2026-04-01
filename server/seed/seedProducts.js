const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('../models/Product');

dotenv.config({ path: '../.env' });

const products = [
  {
    name: 'Premium Black Pepper',
    price: 299,
    description: 'Fresh from organic estates of Kajanaparai. Rich in antioxidants.',
    image: 'https://images.unsplash.com/photo-1599909533731-b63e7f5d2b8b?w=600&auto=format',
    category: 'pepper',
    inStock: true,
    stockQuantity: 100,
    unit: '100g',
  },
  {
    name: 'Organic Green Cardamom',
    price: 549,
    description: 'Plump, aromatic pods from Kerala\'s finest gardens. Perfect for biryanis and teas.',
    image: 'https://images.unsplash.com/photo-1615485500834-bc10199bc727?w=600&auto=format',
    category: 'cardamom',
    inStock: true,
    stockQuantity: 50,
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
