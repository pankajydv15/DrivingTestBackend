const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();  
app.use(cors());
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


app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
