import { useState } from "react";
import "./Search.css";

const PAGE_SIZE = 5;
const DESCRIPTION_LIMIT = 120;

// ✅ Backend URL from ENV
const API_BASE = process.env.REACT_APP_API_BASE_URL;

/* ===== Text helpers ===== */

// Title Case for names / roles
const toTitleCase = (text = "") =>
  text
    .toLowerCase()
    .replace(/_/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());

// Sentence case for description (readable)
const toSentenceCase = (text = "") =>
  text
    ? text.charAt(0).toUpperCase() + text.slice(1).toLowerCase()
    : "";

export default function Search() {
  const [q, setQ] = useState("");
  const [allData, setAllData] = useState([]);
  const [appliedQuery, setAppliedQuery] = useState(null);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [expandedIndex, setExpandedIndex] = useState(null);

  /* ===== Backend call ===== */
  const runSearch = async (query) => {
    const res = await fetch(
      `${API_BASE}/api/search?q=${encodeURIComponent(query)}`
    );
    return res.json();
  };

  /* ===== Search ===== */
  const search = async () => {
    if (!q.trim()) return;

    setLoading(true);
    setPage(1);
    setExpandedIndex(null);
    setAppliedQuery(null);

    try {
      // 1️⃣ First search (user input)
      let json = await runSearch(q);

      let results = Array.isArray(json.results) ? json.results : [];
      let suggestion = json.suggestion;

      // 2️⃣ AUTO-CORRECT (Google / SHL style)
      if (results.length < 3 && suggestion) {
        const corrected = await runSearch(suggestion);
        results = corrected.results || results;
        setAppliedQuery(suggestion);
      }

      setAllData(results);
    } catch (err) {
      console.error("Search error:", err);
      setAllData([]);
    } finally {
      setLoading(false);
    }
  };

  /* ===== Pagination ===== */
  const totalPages = Math.ceil(allData.length / PAGE_SIZE);
  const start = (page - 1) * PAGE_SIZE;
  const currentData = allData.slice(start, start + PAGE_SIZE);

  /* ===== Accordion (only one open at a time) ===== */
  const toggleReadMore = (globalIndex) => {
    setExpandedIndex((prev) =>
      prev === globalIndex ? null : globalIndex
    );
  };

  return (
    <div className="shl-search-wrapper">
      {/* ===== Search Panel ===== */}
      <div className="shl-search-panel">
        <h2>Find Assessments</h2>
        <p>Search by job role, skill, or keyword</p>

        <div className="shl-search-input">
          <input
            type="text"
            placeholder="Software Developer, Python, Data Analyst…"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && search()}
          />
          <button onClick={search} disabled={loading}>
            {loading ? "Searching…" : "Search"}
          </button>
        </div>
      </div>

      {/* ===== Loading ===== */}
      {loading && (
        <div className="shl-loading">
          <div className="shl-spinner"></div>
          <p>Searching assessments…</p>
        </div>
      )}

      {/* ===== Auto-correct info ===== */}
      {!loading && appliedQuery && (
        <p className="did-you-mean">
          Showing results for <strong>{appliedQuery}</strong>
        </p>
      )}

      {/* ===== Results ===== */}
      <div className="shl-results">
        {currentData.map((d, i) => {
          const globalIndex = start + i;
          const isOpen = expandedIndex === globalIndex;
          const desc = d.description || "";

          return (
            <div className="shl-result-row" key={globalIndex}>
              <div className="shl-result-main">
                <h3>{toTitleCase(d.name)}</h3>

                <div className="shl-meta">
                  <span>
                    <b>Role:</b>{" "}
                    <strong>
                      {d.jobRoles?.map(toTitleCase).join(", ")}
                    </strong>
                  </span>
                  <span>
                    <b>Duration:</b> {d.duration} mins
                  </span>
                </div>

                <p className="shl-desc-title">
                  <strong>Job Description</strong>
                </p>

                <p className="shl-desc">
                  {isOpen
                    ? toSentenceCase(desc)
                    : toSentenceCase(desc.slice(0, DESCRIPTION_LIMIT))}
                  {desc.length > DESCRIPTION_LIMIT && !isOpen && "..."}
                </p>

                {desc.length > DESCRIPTION_LIMIT && (
                  <button
                    className="shl-link"
                    onClick={() => toggleReadMore(globalIndex)}
                  >
                    {isOpen ? "Show less" : "Show more"}
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* ===== Empty State ===== */}
      {!loading && q && allData.length === 0 && (
        <p className="shl-status">No assessments found.</p>
      )}

      {/* ===== Pagination ===== */}
      {totalPages > 1 && (
        <div className="shl-pagination">
          <button
            disabled={page === 1}
            onClick={() => {
              setPage(page - 1);
              setExpandedIndex(null);
            }}
          >
            Previous
          </button>

          <span>
            Page {page} of {totalPages}
          </span>

          <button
            disabled={page === totalPages}
            onClick={() => {
              setPage(page + 1);
              setExpandedIndex(null);
            }}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
