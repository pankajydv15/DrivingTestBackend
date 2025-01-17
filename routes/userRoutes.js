const express = require('express');
const User = require('../models/User');
const mongoose = require('mongoose');
const ProgressReport = require('../models/ProgressReport');


const router = express.Router();

const validateObjectId = (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ message: "Invalid user ID format" });
  }
  next();
};

// Save user data
router.post('/', async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).json({ message: "User saved successfully", user });
  } catch (error) {
    res.status(500).json({ message: "Error saving user", error });
  }
});

// Fetch all users
router.get('/', async (req, res) => {
  try {
    const users = await User.find(); // Fetch all users
    res.status(200).json({ success: true, data: users });
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ success: false, message: "An internal server error occurred" });
  }
});


// Fetch user data by ID
router.get('/:id', validateObjectId, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }
    res.status(200).json({ success: true, data: user });
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ success: false, message: "An internal server error occurred" });
  }
});




// Save or update scores for a user
router.post('/scores/save', async (req, res) => {
  const { userId, preTestScore, postTestScore, colorBlindTestScore, roadTestScore } = req.body;

  // Validate the userId format
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ message: "Invalid user ID format" });
  }

  try {
    // Find the user by ID and update the scores
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update the scores
    user.scores = { preTestScore, postTestScore, colorBlindTestScore, roadTestScore };
    await user.save(); // Save the updated user document

    res.status(200).json({ message: "Scores saved successfully", user });
  } catch (error) {
    console.error("Error saving scores:", error);
    res.status(500).json({ message: "Error saving scores", error });
  }
});

router.post("/progress-report", async (req, res) => {
  const { scores, userDetails, totalScore, result } = req.body;

  try {
    // Save the report data to your database (MongoDB, etc.)
    const report = new ProgressReport({
      scores,
      userDetails,
      totalScore,
      result,
    });

    await report.save();
    res.status(200).json({ message: "Report saved successfully" });
  } catch (error) {
    console.error("Error saving report:", error);
    res.status(500).json({ message: "Error saving report" });
  }
});


module.exports = router;
