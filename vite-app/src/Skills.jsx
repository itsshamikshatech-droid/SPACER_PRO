import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./index.css";
import logo from "./assets/sp.jpeg";

export default function Skills() {
  const navigate = useNavigate();
  const email = localStorage.getItem("userEmail") || "";
  const firstLetter = email.charAt(0).toUpperCase();

  const [skill, setSkill] = useState("");
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("mySkills"));
    if (Array.isArray(saved)) setSkills(saved);
  }, []);

  const saveSkills = (newList) => localStorage.setItem("mySkills", JSON.stringify(newList));

  const addSkill = () => {
    if (skill.trim() === "") return;
    const newList = [...skills, skill.trim()];
    setSkills(newList);
    saveSkills(newList);
    setSkill("");
  };

  const removeSkill = (index) => {
    const newList = skills.filter((_, i) => i !== index);
    setSkills(newList);
    saveSkills(newList);
  };

  return (
    <>
      <div className="navbar">
        <div className="logo-with-icon">
          <img src={logo} alt="logo" className="small-logo" />
          <span>Spaser</span>
        </div>
        <div className="nav-links">
          <a href="/">Home</a>
          <a href="/ai">AI Recommendations</a>
        </div>
        <div className="profile-icon">
          <div className="circle">{firstLetter}</div>
        </div>
      </div>

      <div className="jobseeker-page">
        <div className="skills-box">
          <h2>Your Skills</h2>
          <p>Add your skills to help us recommend the best job opportunities for you.</p>

          <div className="skill-input-container">
            <input
              type="text"
              placeholder="e.g., Customer Service"
              value={skill}
              onChange={(e) => setSkill(e.target.value)}
            />
            <button onClick={addSkill}>Add Skill</button>
          </div>

          <h3>My Skills</h3>

          <div className="skills-list">
            {skills.length === 0 && <div className="muted">No skills added yet.</div>}
            {skills.map((s, index) => (
              <div key={index} className="skill-tag">
                {s}
                <span className="remove-x" onClick={() => removeSkill(index)}>×</span>
              </div>
            ))}
          </div>

          <div style={{ marginTop: 18 }}>
            <button className="list-btn" onClick={() => navigate(-1)}>Back</button>
          </div>
        </div>
      </div>
    </>
  );
}
