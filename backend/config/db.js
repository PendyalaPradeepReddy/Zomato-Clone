import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);

    console.log(`MongoDB Connected: ${conn.connection.host}`);
    console.log(`Database Name: ${conn.connection.name}`);
    
    // Log when collections are created
    mongoose.connection.on('collection', (collectionName) => {
      console.log(`Collection created: ${collectionName}`);
    });
    
    // Log when the connection is lost
    mongoose.connection.on('disconnected', () => {
      console.log('MongoDB connection lost');
    });

    // Log when the connection is reconnected
    mongoose.connection.on('reconnected', () => {
      console.log('MongoDB reconnected');
    });

  } catch (error) {
    console.error('MongoDB connection error:', error.message);
    process.exit(1);
  }
};

export { connectDB };