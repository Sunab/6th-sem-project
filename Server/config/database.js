import mongoose from "mongoose";

export const connectDatabase = async () => {
  try {
    const connection = await mongoose.connect('mongodb://127.0.0.1:27017/BloodDonation', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    
    console.log(`MongoDB connected: ${connection.connection.host}`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
