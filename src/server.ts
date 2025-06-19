import mongoose from 'mongoose';
import app from './app';
import config from './app/config';

const PORT = config.port || 5000;
const DB_URL = config.database_url as string;

async function main() {
  try {
    await mongoose.connect(DB_URL);
    console.log('✅ Connected to MongoDB');

    app.listen(PORT, () => {
      console.log(`🚀 Server is running at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('❌ MongoDB connection error:', error);
  }
}

main();
