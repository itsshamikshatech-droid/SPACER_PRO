import { useParams } from "react-router-dom";

export default function Booking() {
  const { id } = useParams();

  // Load spaces from both keys
  const listed = JSON.parse(localStorage.getItem("listedSpaces")) || [];
  const spacesKey = JSON.parse(localStorage.getItem("spaces")) || [];

  // Merge both arrays (important!)
  const source = [...listed, ...spacesKey];

  // Find space by id
  const space = source.find((s) => String(s.id) === String(id));

  // If not found
  if (!space) {
    return (
      <h2 style={{ textAlign: "center", marginTop: 40 }}>Space not found</h2>
    );
  }

  return (
    <div
      style={{
        maxWidth: 700,
        margin: "40px auto",
        padding: "20px",
        border: "1px solid #ddd",
        borderRadius: 10,
        background: "#fff",
      }}
    >
      <h1 style={{ marginBottom: 20 }}>{space.title}</h1>

      <img
        src={space.image}
        alt={space.title}
        style={{
          width: "100%",
          borderRadius: 10,
          marginBottom: 20,
          objectFit: "cover",
        }}
      />

      <p style={{ fontSize: 18, marginBottom: 10 }}>
        <strong>Price:</strong> ₹{space.price}
      </p>

      <p style={{ fontSize: 18, marginBottom: 20 }}>
        <strong>Description:</strong> {space.description}
      </p>

      <button
        style={{
          padding: "12px 20px",
          background: "black",
          color: "white",
          border: "none",
          borderRadius: 8,
          fontSize: 16,
          cursor: "pointer",
        }}
      >
        Book Now
      </button>
    </div>
  );
}
