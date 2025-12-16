const express = require("express");
const router = express.Router();
const esClient = require("../elastic");

/**
 * GET /api/search?q=keyword
 *
 * Response:
 * {
 *   results: [...],
 *   suggestion: "corrected text" | null
 * }
 */

router.get("/", async (req, res) => {
  const query = (req.query.q || "").trim();

  if (!query) {
    return res.json({ results: [], suggestion: null });
  }

  try {
    const esResponse = await esClient.search({
      index: "assessments",
      size: 50,
      query: {
        bool: {
          should: [
            {
              multi_match: {
                query,
                fields: [
                  "name^3",
                  "description",
                  "jobRoles^2",
                  "skills^2"
                ],
                fuzziness: "AUTO"
              }
            }
          ]
        }
      },
      suggest: {
        text: query,
        phrase_suggest: {
          phrase: {
            field: "name",
            size: 1,
            gram_size: 3,
            direct_generator: [
              {
                field: "name",
                suggest_mode: "always"
              }
            ]
          }
        }
      }
    });

    /* ================= Results ================= */

    const results = esResponse.hits.hits.map(hit => ({
      id: hit._id,
      ...hit._source
    }));

    /* ================= Auto-correct Suggestion ================= */

    let suggestion = null;

    const suggest =
      esResponse.suggest?.phrase_suggest?.[0]?.options?.[0]?.text;

    if (suggest && suggest.toLowerCase() !== query.toLowerCase()) {
      suggestion = suggest;
    }

    res.json({
      results,
      suggestion
    });

  } catch (err) {
    console.error("Search API error:", err);
    res.status(500).json({
      results: [],
      suggestion: null
    });
  }
});

module.exports = router;
