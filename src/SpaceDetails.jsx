// SpaceDetails.jsx
import { useParams, useNavigate } from "react-router-dom";

export default function SpaceDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Load from both keys
  const listed = JSON.parse(localStorage.getItem("listedSpaces")) || [];
  const spacesKey = JSON.parse(localStorage.getItem("spaces")) || [];

  // Merge and remove duplicates
  const source = [...listed, ...spacesKey].filter(
    (v, i, a) => a.findIndex(t => t.id === v.id) === i
  );

  // Try finding the space
  let space = source.find((s) => String(s.id) === String(id));

  // If not found but only 1 space exists, use it
  if (!space && source.length === 1) space = source[0];

  if (!space) {
    return (
      <h2 style={{ textAlign: "center", marginTop: 40 }}>
        Space not found
      </h2>
    );
  }

  return (
    <div style={{ padding: "30px", maxWidth: "900px", margin: "0 auto" }}>
      <img
        src={space.images?.[0]}
        alt="space"
        style={{
          width: "100%",
          height: "350px",
          borderRadius: "12px",
          objectFit: "cover",
        }}
      />

      <br />
      <br />

      <h2>{space.name || space.title}</h2>
      <p>{space.location}</p>

      {/* INFO BOX */}
      <div
        style={{
          marginTop: "20px",
          padding: "20px",
          borderRadius: "10px",
          background: "#f9f9f9",
        }}
      >
        <h3>Details</h3>
        <p>⭐ 4.9 (75 reviews)</p>
        <p>👥 Up to {space.capacity || "N/A"} guests</p>
        <p>
          <strong>₹{space.price}/hour</strong>
        </p>
      </div>

      <br />

      {/* SERVICES SECTION — FIXED */}
      <div
        style={{
          marginTop: "20px",
          padding: "20px",
          borderRadius: "10px",
          background: "#f9f9f9",
        }}
      >
        <h3>Available Services</h3>

        {Array.isArray(space.services) && space.services.length > 0 ? (
          <ul>
            {space.services.map((s, i) => (
              <li key={i}>
                {s.name} — ₹{s.price}
              </li>
            ))}
          </ul>
        ) : (
          <p>No services listed.</p>
        )}
      </div>

      <br />

      {/* BOOK BUTTON */}
      <button
        onClick={() => navigate(`/book/${space.id}`)}
        style={{
          background: "#1a56db",
          color: "white",
          padding: "12px 24px",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
          width: "100%",
          fontSize: "17px",
        }}
      >
        Book with Services
      </button>
    </div>
  );
}
