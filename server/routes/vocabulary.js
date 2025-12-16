const express = require("express");
const router = express.Router();

const Assessment = require("../models/Assessment");

console.log("Assessments count:", assessments.length);


router.get("/", async (req, res) => {
  try {
    const assessments = await Assessment.find(
      {},
      { name: 1, description: 1, jobRoles: 1, skills: 1 }
    );

    const vocab = new Set();

    assessments.forEach(a => {
      [
        a.name,
        a.description,
        ...(a.jobRoles || []),
        ...(a.skills || [])
      ].forEach(text => {
        if (!text) return;
        text
          .toLowerCase()
          .replace(/[^a-z0-9 ]/g, "")
          .split(/\s+/)
          .forEach(word => {
            if (word.length > 2) vocab.add(word);
          });
      });
    });

    res.json([...vocab]);
  } catch (err) {
    console.error("Vocabulary API error:", err);
    res.status(500).json([]);
  }
});

module.exports = router;
