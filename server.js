require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");

const app = express();

connectDB(); // 🔥 MUST BE CALLED BEFORE ROUTES

app.use(express.json());

app.use("/api/admin", require("./routes/adminRoutes"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
console.log(`Server running on port ${PORT}`);
});
