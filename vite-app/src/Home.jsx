import myImage from "./assets/sp.jpeg";
import "./Hstyle.css";

function Home() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        textAlign: "center"
      }}
    >
      <h1 style={{ fontSize: "48px", marginBottom: "20px" }}>SPACER</h1>

      <img
        src={myImage}
        alt="Spacer Logo"
        style={{ width: "200px", height: "auto", marginBottom: "30px" }}
      />

      <a className="btn btn-primary" href="/login"
      style={{ padding: "10px 30px", fontSize: "20px" }}>
        Login
      </a>
    </div>
  );
}

export default Home;
