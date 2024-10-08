const mongoose = require("mongoose");
require("dotenv").config();

const connectToDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("📦 connected to mongoDB");
  } catch (err) {
    console.error("❌ error connecting to mongoDB:", err.message);
  }
};

module.exports = {
  connectToDB,
};
