import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI); //connect to MongoDB
    console.log(`connect to ${conn.connection.host}`);
  } catch (error) {
    console.log(error);
    process.exit(1); // stop the server or terminate the process
  }
};

export default connectDB;
