const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { connectToDB } = require("./config/database");
const { authRoutes } = require("./routes/authRoutes");
const { blogRoutes } = require("./routes/blogRoutes");
const { authenticate } = require("./middleware/authMiddleware");

connectToDB();

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
// app.use(bodyParser.json());

app.use("/auth", authenticate, authRoutes);
app.use("/blog", authenticate, blogRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
