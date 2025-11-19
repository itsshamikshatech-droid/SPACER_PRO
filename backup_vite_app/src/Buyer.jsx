import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import logo from "./assets/sp.jpeg";

export default function Buyer() {
  const listed = JSON.parse(localStorage.getItem("listedSpaces")) || [];
  const oldSpaces = JSON.parse(localStorage.getItem("spaces")) || [];

  const savedSpaces = [...listed, ...oldSpaces].filter(
    (v, i, a) => a.findIndex(t => t.id === v.id) === i
  );

  const email = localStorage.getItem("userEmail") || "";
  const firstLetter = email.charAt(0).toUpperCase();

  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  // ⭐ Sanitize ANY object fields
  const safe = (val) => {
    if (val == null) return "";
    if (typeof val === "object") return JSON.stringify(val); // prevents crash
    return val;
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

        <div className="profile-area" ref={dropdownRef}>
          <div className="circle" onClick={() => setOpen(!open)}>
            {firstLetter}
          </div>

          {open && (
            <div className="profile-dropdown">
              <div className="profile-info">
                <strong>{email.split("@")[0]}</strong>
                <p>{email}</p>
              </div>
              <a href="/profile">Profile</a>
              <a href="/bookings">My Bookings</a>
              <a href="/saved">Saved Spaces</a>
              <a href="/settings">Settings</a>
              <a href="/login" className="logout">Log out</a>
            </div>
          )}
        </div>
      </div>

      <div className="buyer-center">
        <br />
        <h1>Find your perfect space</h1>
        <h5>Discover and book unique spaces for any occasion</h5>
      </div>

      <br /><br />

      <div><h3>Featured Spaces</h3></div>

      <div className="featured-grid">
        {savedSpaces.length === 0 ? (
          <p>No spaces listed yet.</p>
        ) : (
          savedSpaces.map((space) => (
            <Link
              to={`/space/${space.id}`}
              className="no-style"
              key={space.id}
            >
              <div className="space-card">
                <img src={space.images?.[0]} alt="space-img" className="space-img" />

                {/* SAFE FIELDS */}
                <h4>{safe(space.name || space.title)}</h4>
                <p>{safe(space.location)}</p>
                <p><strong>₹{safe(space.price)}/hour</strong></p>
              </div>
            </Link>
          ))
        )}
      </div>
    </>
  );
}
