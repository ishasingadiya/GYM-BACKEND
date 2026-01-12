require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

// MongoDB connection
mongoose.connect(MONGO_URI)
    .then(() => console.log('MongoDB connected successfully'))
    .catch(err => console.log('MongoDB connection failed:', err));

const adminUploadRoutes = require('./routes/adminUpload');
app.use('/api/admin', adminUploadRoutes);


const adminRoutes = require("./routes/adminRoutes");

app.use(express.json());
app.use("/api/admin", require("./routes/adminRoutes"));




app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
