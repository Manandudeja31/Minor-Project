const express = require("express");
const app = express();
const todoRoutes = require("./routes/todo");
const cors = require("cors");
const path = require("path");
app.use(cors());
require("dotenv").config();
const PORT = process.env.PORT || 5000;

app.use(express.json());

// mount the routes
app.use("/api/v1", todoRoutes);

// connect to the database
const dbConnect = require("./config/database");
dbConnect();

app.get("/", (req, res) => {
  app.use(express.static(path.resolve(__dirname, "tailwind", "build")));
  res.sendFile(path.resolve(__dirname, "tailwind", "build", "index.html"));
});

// server
app.listen(PORT, (req, res) => {
  console.log(`Server running on port ${PORT}`);
});

app.get("/", (req, res) => {
  res.send("Welcome to the Todo API");
});
