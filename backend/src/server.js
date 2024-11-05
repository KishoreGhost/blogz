const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { connectToDB } = require("./config/database");
const authRoutes = require("./routes/authRoutes");
const blogRoutes = require("./routes/blogRoutes");

connectToDB();

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("fuck you");
});

app.use("/auth", authRoutes);
app.use("/blogs", blogRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
