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

// Add a new progress report
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

// **Delete Multiple Progress Reports**
router.delete("/progress-reports/delete", async (req, res) => {
  try {
    console.log("Received Delete Request:", req.body); // Debugging output

    const { reportIds } = req.body; // Extract reportIds array

    if (!reportIds || !Array.isArray(reportIds) || reportIds.length === 0) {
      return res.status(400).json({ success: false, message: "Invalid request. No reports selected." });
    }

    await ProgressReport.deleteMany({ _id: { $in: reportIds } });

    res.status(200).json({ success: true, message: "Reports deleted successfully" });
  } catch (error) {
    console.error("Error deleting reports:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});


module.exports = router;
