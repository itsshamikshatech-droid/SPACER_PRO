import logo from "./assets/sp.jpeg";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Seller() {
  const navigate = useNavigate();
  const goToListSpace = () => {
    navigate("/list-space");
  };

  const email = localStorage.getItem("userEmail") || "";
  const firstLetter = email.charAt(0).toUpperCase();

  const [spaces, setSpaces] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("listedSpaces")) || [];
    setSpaces(saved);
  }, []);

  return (
    <>
      <div className="navbar">
        <div className="logo-with-icon">
          <img src={logo} alt="logo" className="small-logo" />
          <span>Spaser</span>
        </div>

        <div className="nav-links">
          <a href="/" className="active">Home</a>
          <a href="/ai">AI Recommendations</a>
        </div>

        <button className="new-space-btn" onClick={goToListSpace}>
          List a New Space
        </button>

        <div className="profile-icon">
          <div className="circle">{firstLetter}</div>
        </div>
      </div>

      <div className="seller-container">
        <br />
        <h1>Seller Dashboard</h1>

        <div className="listing-box">
          <h3>My Listings</h3>

          {spaces.length === 0 ? (
            <>
              <p>You don’t have any active listings yet.</p>
              <button className="list-btn" onClick={goToListSpace}>
                List your first space
              </button>
            </>
          ) : (
            <div className="listed-items">
              {spaces.map((item, index) => (
                <div key={index} className="space-card">
                  <img
                    src={item.images[0]}
                    alt="space"
                    className="space-img"
                  />

                  <h4>{item.name}</h4>
                  <p>{item.desc}</p>

                  <p className="price">₹ {item.price}</p>

                  {/* FIXED SERVICES DISPLAY */}
                  {item.services && item.services.length > 0 && (
                    <p className="services">
                      Services:{" "}
                      {item.services
                        .map((s) => `${s.name} (₹${s.price})`)
                        .join(", ")}
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
