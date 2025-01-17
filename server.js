const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
// const progressReportRoutes = require('./routes/progressReport');
require('dotenv').config();

const app = express();

// CORS configuration
app.use(cors({
  origin: ['https://driverassesmenttest.netlify.app', 'http://localhost:5173','http://localhost:5000'], // Allow both origins
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Allow necessary methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Allow necessary headers
}));

// Preflight request handling
app.options('*', cors()); // Enable CORS for OPTIONS method

app.use(bodyParser.json());

const PORT = process.env.PORT || 5000;

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error("MongoDB connection failed:", err));

app.get('/', (req, res) => {
  res.send("Driving Test API is running...");
});

const userRoutes = require('./routes/userRoutes');
app.use('/api/users', userRoutes);

const progressReportRoutes = require('./routes/progressReport');
app.use('/api', progressReportRoutes);


app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
