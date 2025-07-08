// api/index.js

import app from '../app.js'; // your Express app
import serverless from 'serverless-http'; // required to wrap Express
import mongoose from 'mongoose'; // only needed for connecting to MongoDB

let isConnected = false;

const handler = async (req, res) => {
  if (!isConnected) {
    console.log("🔌 Connecting to MongoDB...");
    try {
      await mongoose.connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      isConnected = true;
      console.log("✅ MongoDB connected");
    } catch (err) {
      console.error("❌ MongoDB connection failed:", err.message);
      return res.status(500).json({ success: false, message: "Database connection error" });
    }
  }

  const expressHandler = serverless(app);
  return expressHandler(req, res);
};

export default handler;
