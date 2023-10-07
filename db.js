
process
import mongoose from 'mongoose';

const connectToDatabase = async () => {
  try {
    
    await mongoose.connect(process.env.MONGDB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to the MongoDB database');
  } catch (error) {
    console.error('Error connecting to the MongoDB database:', error);
  }
};

export default connectToDatabase;
