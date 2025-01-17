const express = require('express');
const ProgressReport = require('../models/ProgressReport');

const router = express.Router();

// Fetch all progress reports
router.get("/progress-reports", async (req, res) => {
  try {
    const reports = await ProgressReport.find(); // Fetch all reports
    res.status(200).json({ success: true, data: reports });
  } catch (error) {
    console.error("Error fetching reports:", error);
    res.status(500).json({ success: false, message: "An internal server error occurred" });
  }
});


router.post("/progress-report", async (req, res) => {
  const { scores, userDetails, totalScore, result } = req.body;

  try {
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
    res.status(500).json({ message: "Error saving report", error });
  }
});

module.exports = router;
