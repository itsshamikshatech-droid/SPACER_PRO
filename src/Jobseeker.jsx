import { useNavigate } from "react-router-dom";
import "./index.css";
import logo from "./assets/sp.jpeg";

export default function Jobseeker() {
  const navigate = useNavigate();

  const goSkills = () => navigate("/jobseeker/skills");
  const goProvider = () => navigate("/jobseeker/register-provider");

  const email = localStorage.getItem("userEmail") || "";
  const firstLetter = email.charAt(0).toUpperCase();

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

      <div className="jobseeker-menu">
        <h2>Welcome back</h2>
        <p className="muted">Manage your skills or register as a service provider</p>

        <div className="menu-cards">
          {/* Card: Update Skills */}
          <button className="menu-card" onClick={goSkills}>
            <div className="menu-icon">🧰</div>
            <div className="menu-text">
              <strong>Update Skills</strong>
              <div className="menu-sub">Add or edit your skills for better job matches</div>
            </div>
          </button>

          {/* Card: Register as Service Provider */}
          <button className="menu-card" onClick={goProvider}>
            <div className="menu-icon">🛠️</div>
            <div className="menu-text">
              <strong>Register as Service Provider</strong>
              <div className="menu-sub">List services (Wi-Fi, Catering, AV, Cleaning, Staff)</div>
            </div>
          </button>
        </div>
      </div>
    </>
  );
}
