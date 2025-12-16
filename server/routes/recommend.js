const router = require("express").Router();
const es = require("../elastic");

router.post("/", async (req, res) => {
  const { jobRole, skills, maxDuration } = req.body;

  const result = await es.search({
    index: "assessments",
    size: 5,
    query: {
      bool: {
        must: [
          { match: { jobRoles: jobRole } },
          { match: { skills: skills.join(" ") } }
        ],
        filter: [{ range: { duration: { lte: maxDuration } } }]
      }
    }
  });

  res.json(result.hits.hits.map(h => h._source));
});

module.exports = router;
