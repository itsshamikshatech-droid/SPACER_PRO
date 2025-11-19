import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./index.css";
import logo from "./assets/sp.jpeg";

const CATEGORIES = ["Wi-Fi", "Catering", "Cleaning", "AV Tech", "Staff", "Other"];

function randRating() {
  return (Math.random() * 1.5 + 4).toFixed(1); // 4.0 - 5.5 (we can cap to 5)
}
function randResponse() {
  return Math.floor(Math.random() * 12) + 1; // 1 - 12 hours
}

export default function ServiceProviderSetup() {
  const navigate = useNavigate();
  const email = localStorage.getItem("userEmail") || "";
  const firstLetter = email.charAt(0).toUpperCase();

  // Wizard state
  const [step, setStep] = useState(1);

  // Form state
  const [category, setCategory] = useState("");
  const [services, setServices] = useState(""); // description of services
  const [price, setPrice] = useState(""); // per hour
  const [availability, setAvailability] = useState({
    monday: false, tuesday: false, wednesday: false, thursday: false, friday: false, saturday: false, sunday: false
  });
  const [area, setArea] = useState("");
  const [enableRequests, setEnableRequests] = useState(true);

  useEffect(() => {
    // restore draft if exists
    const draft = JSON.parse(localStorage.getItem("providerDraft"));
    if (draft) {
      setCategory(draft.category || "");
      setServices(draft.services || "");
      setPrice(draft.price || "");
      setAvailability(draft.availability || availability);
      setArea(draft.area || "");
      setEnableRequests(draft.enableRequests ?? true);
    }
    // eslint-disable-next-line
  }, []);

  const saveDraft = () => {
    localStorage.setItem("providerDraft", JSON.stringify({ category, services, price, availability, area, enableRequests }));
  };

  // Helpers
  const toggleDay = (day) => {
    const next = { ...availability, [day]: !availability[day] };
    setAvailability(next);
  };

  const validateStep = () => {
    if (step === 1 && !category) return "Please choose a category.";
    if (step === 2 && (!price || isNaN(Number(price)))) return "Enter valid price (number).";
    if (step === 3 && !Object.values(availability).some(Boolean)) return "Select at least one available day.";
    if (step === 4 && area.trim().length < 2) return "Please enter area of operation.";
    return null;
  };

  const next = () => {
    const err = validateStep();
    if (err) {
      alert(err);
      return;
    }
    saveDraft();
    setStep((s) => Math.min(5, s + 1));
  };
  const back = () => setStep((s) => Math.max(1, s - 1));

  // final submit
  const submitProvider = () => {
    // very small validation
    if (!category || !price || !area) {
      alert("Please complete the required fields.");
      return;
    }

    const newProvider = {
      id: Date.now(),
      email,
      category,
      services,
      price: Number(price),
      availability,
      area,
      enableRequests,
      rating: Math.min(5, Number(randRating())),
      responseSpeedHours: randResponse(),
      verified: false,
      createdAt: new Date().toISOString(),
    };

    const saved = JSON.parse(localStorage.getItem("serviceProviders")) || [];
    saved.unshift(newProvider);
    localStorage.setItem("serviceProviders", JSON.stringify(saved));

    // clear draft
    localStorage.removeItem("providerDraft");

    alert("Provider registered successfully! You will appear in provider listings.");
    navigate("/jobseeker"); // back to menu
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
        <div className="profile-icon"><div className="circle">{firstLetter}</div></div>
      </div>

      <div className="provider-setup-page">
        <div className="wizard-card">
          <h2>Register as Service Provider</h2>

          <div className="wizard-steps">
            <div className={`step ${step >= 1 ? "active" : ""}`}>1</div>
            <div className={`step ${step >= 2 ? "active" : ""}`}>2</div>
            <div className={`step ${step >= 3 ? "active" : ""}`}>3</div>
            <div className={`step ${step >= 4 ? "active" : ""}`}>4</div>
            <div className={`step ${step >= 5 ? "active" : ""}`}>5</div>
          </div>

          <div className="wizard-body">
            {step === 1 && (
              <div className="wizard-step">
                <label>Choose Category</label>
                <div className="category-grid">
                  {CATEGORIES.map((c) => (
                    <button
                      key={c}
                      className={`chip ${category === c ? "selected" : ""}`}
                      onClick={() => setCategory(c)}
                    >
                      {c}
                    </button>
                  ))}
                </div>

                <label style={{ marginTop: 12 }}>Describe your services (brief)</label>
                <textarea value={services} onChange={(e) => setServices(e.target.value)} placeholder="e.g., 5 Mbps Wi-Fi, 10 staff members for events..." />
              </div>
            )}

            {step === 2 && (
              <div className="wizard-step">
                <label>Set your charges (per hour)</label>
                <input type="text" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="e.g., 1500" />
                <small className="muted">Enter numeric value. Will be shown to buyers.</small>
              </div>
            )}

            {step === 3 && (
              <div className="wizard-step">
                <label>Availability (choose days)</label>
                <div className="days-grid">
                  {Object.keys(availability).map((d) => (
                    <button key={d} className={`day ${availability[d] ? "on" : ""}`} onClick={() => toggleDay(d)}>
                      {d.substring(0,3)}
                    </button>
                  ))}
                </div>

                <label style={{ marginTop: 12 }}>Optional: add availability notes</label>
                <input placeholder="e.g., Only afternoons on weekends" />
              </div>
            )}

            {step === 4 && (
              <div className="wizard-step">
                <label>Area of Operation</label>
                <input type="text" value={area} onChange={(e) => setArea(e.target.value)} placeholder="City / Neighborhoods / Radius" />
                <label style={{ marginTop: 12 }}>
                  <input type="checkbox" checked={enableRequests} onChange={(e) => setEnableRequests(e.target.checked)} />
                  &nbsp; Enable hire requests from buyers
                </label>
              </div>
            )}

            {step === 5 && (
              <div className="wizard-step">
                <h4>Review & Submit</h4>
                <div className="review-row"><strong>Category:</strong> {category}</div>
                <div className="review-row"><strong>Services:</strong> {services || "—"}</div>
                <div className="review-row"><strong>Price/hr:</strong> ₹{price}</div>
                <div className="review-row"><strong>Availability:</strong> {Object.keys(availability).filter(d => availability[d]).join(", ") || "—"}</div>
                <div className="review-row"><strong>Area:</strong> {area}</div>
                <div className="review-row"><strong>Enable requests:</strong> {enableRequests ? "Yes" : "No"}</div>

                <div style={{ marginTop: 12 }} className="muted">
                  (The system will assign an initial rating and response speed automatically.)
                </div>
              </div>
            )}
          </div>

          <div className="wizard-actions">
            {step > 1 ? <button className="list-btn outline" onClick={back}>Back</button> : <button className="list-btn outline" onClick={() => navigate(-1)}>Cancel</button>}
            {step < 5 ? <button className="list-btn" onClick={next}>Next</button> : <button className="list-btn" onClick={submitProvider}>Submit</button>}
          </div>
        </div>
      </div>
    </>
  );
}
