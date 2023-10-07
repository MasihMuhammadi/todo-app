

import mongoose from 'mongoose';

const connectToDatabase = async () => {
  try {
    
    await mongoose.connect('mongodb+srv://todo:Admin786@cluster0.f9iiqip.mongodb.net/todo?retryWrites=true&w=majority', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to the MongoDB database');
  } catch (error) {
    console.error('Error connecting to the MongoDB database:', error);
  }
};

export default connectToDatabase;
