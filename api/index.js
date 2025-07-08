import app from "../app.js";
import serverless from "serverless-http";
import mongoose from "mongoose";

// ✅ Allow background tasks to run without blocking Vercel shutdown
export const config = {
  api: {
    externalResolver: true,
  },
};

let isConnected = false;

const handler = async (req, res) => {
  if (!isConnected) {
    try {
      await mongoose.connect(process.env.MONGO_URL);
      isConnected = true;
      console.log("✅ MongoDB connected");
    } catch (err) {
      console.error("❌ MongoDB connection failed:", err.message);
      return res.status(500).json({ success: false, message: "Database connection error" });
    }
  }

  const expressHandler = serverless(app);
  return await expressHandler(req, res); // ✅ await ensures clean exit
};

export default handler;
