import mongoose from "mongoose";

let isConnected = false;

export const ConnectDB = async () => {
  if (isConnected) return;

  try {
    const db = await mongoose.connect(
      "mongodb+srv://asim:Asim12345@cluster0.fmuxcjt.mongodb.net/"
    );

    isConnected = true;
    console.log("✅ MongoDB Connected:", db.connection.name);
  } catch (error) {
    console.log("❌ MongoDB Error:", error.message);
    throw error;
  }
};
