require("dotenv").config(); // must be FIRST

const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const noteRoutes = require("./routes/noteRoutes");
const errorHandler = require("./middleware/errorMiddleware");
const userRoutes = require("./routes/userRoutes");




const app = express();
app.use(cors()); 

// 🔹 middleware (always before routes)
app.use(express.json());

// 🔹 routes
app.use("/api/notes", noteRoutes);
app.use("/api/users", userRoutes);

// 🔹 test route
app.get("/", (req, res) => {
  res.send("API is running...");
});

// 🔹 connect to database
connectDB();

const PORT = process.env.PORT || 5000;

// 🔹 error handler (after routes, before listen)
app.use(errorHandler);

// 🔹 start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
