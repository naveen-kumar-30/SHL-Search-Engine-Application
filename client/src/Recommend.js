import { useState } from "react";
import "./Recommend.css";

export default function Recommend() {
  const [jobRole, setJobRole] = useState("");
  const [skills, setSkills] = useState("");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const recommend = async () => {
    if (!jobRole || !skills) return;

    setLoading(true);
    setData([]);

    try {
      const res = await fetch("http://localhost:5000/api/recommend", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          jobRole,
          skills: skills.split(",").map(s => s.trim()),
          maxDuration: 60
        })
      });

      const json = await res.json();

      // Backend returns ARRAY (model output)
      setData(Array.isArray(json) ? json : []);
    } catch (err) {
      console.error("Recommendation error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="recommend-container">
      <h1 className="title">Assessment Recommendations</h1>

      {/* Inputs */}
      <div className="input-group">
        <input
          placeholder="Job Role (e.g. Software Engineer)"
          value={jobRole}
          onChange={(e) => setJobRole(e.target.value)}
        />

        <input
          placeholder="Skills (comma separated)"
          value={skills}
          onChange={(e) => setSkills(e.target.value)}
        />

        <button onClick={recommend}>Recommend</button>
      </div>

      {loading && <p className="status-text">Running recommendation model...</p>}

      <div className="results">
        {data.map((d, i) => (
          <div className="card" key={i}>
            <h3>{d.name}</h3>
            <p><b>Role:</b> {d.jobRoles?.join(", ")}</p>
            <p><b>Skills:</b> {d.skills?.join(", ")}</p>
            <p><b>Duration:</b> {d.duration} mins</p>
            <p className="desc">{d.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
