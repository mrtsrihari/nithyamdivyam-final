const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

const connectDB = async () => {
  try {
    let uri = process.env.MONGO_URI;

    if (uri.includes('<username>')) {
      console.log('⚠️ Using In-Memory MongoDB for local testing. Data will not persist.');
      const mongoServer = await MongoMemoryServer.create();
      uri = mongoServer.getUri();
      process.env.MONGO_URI = uri;
    }

    const conn = await mongoose.connect(uri);
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);

    // Auto-seed if it's the local in-memory DB and empty
    if (uri.includes('127.0.0.1')) {
      const Product = require('../models/Product');
      const count = await Product.countDocuments();
      if (count === 0) {
        console.log('🌱 Seeding initial products for local testing...');
        await Product.insertMany([
          {
            name: 'Premium Black Pepper',
            price: 299,
            description: 'Fresh from organic estates of Kajanaparai. Rich in antioxidants.',
            image: 'https://images.unsplash.com/photo-1599909533731-b63e7f5d2b8b?w=600&auto=format',
            category: 'pepper',
            inStock: true,
            unit: '100g',
          },
          {
            name: 'Organic Green Cardamom',
            price: 549,
            description: 'Plump, aromatic pods from Kerala\'s finest gardens. Perfect for biryanis and teas.',
            image: 'https://images.unsplash.com/photo-1615485500834-bc10199bc727?w=600&auto=format',
            category: 'cardamom',
            inStock: true,
            unit: '50g',
          }
        ]);
      }
    }
  } catch (error) {
    console.error(`❌ MongoDB Connection Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
