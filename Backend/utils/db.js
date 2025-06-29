import mongoose from "mongoose";

// Connect to MongoDB
const connectDB = async () => {
  try {
    // Debug: Check if MONGO_URI is loaded
    console.log("MONGO_URI:", process.env.MONGO_URI ? "✅ Loaded" : "❌ Not found");
    
    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI is not defined in environment variables");
    }

    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected...");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
    process.exit(1);
  }
};

export default connectDB;