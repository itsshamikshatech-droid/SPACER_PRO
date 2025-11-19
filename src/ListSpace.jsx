import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ListSpace() {
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [location, setLocation] = useState("");
  const [desc, setDesc] = useState("");
  const [price, setPrice] = useState("");
  const [capacity, setCapacity] = useState("");
  const [images, setImages] = useState([]);

  const serviceOptions = [
    "Wi-Fi",
    "Catering",
    "A/V Equipment",
    "Cleaning",
    "Staff Support"
  ];

  const [services, setServices] = useState([]);

  const navigate = useNavigate();

  const toggleService = (serviceName) => {
    setServices((prev) => {
      const exists = prev.find((s) => s.name === serviceName);

      if (exists) {
        return prev.filter((s) => s.name !== serviceName);
      } else {
        return [...prev, { name: serviceName, price: "" }];
      }
    });
  };

  const updateServicePrice = (serviceName, price) => {
    setServices((prev) =>
      prev.map((s) =>
        s.name === serviceName ? { ...s, price } : s
      )
    );
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const readers = files.map(
      (file) =>
        new Promise((resolve) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result);
          reader.readAsDataURL(file);
        })
    );

    Promise.all(readers).then((imgs) => setImages(imgs));
  };

  const handleSubmit = () => {
    if (!name || !type || !location || !desc || !price || !capacity) {
      alert("Please fill all fields.");
      return;
    }

    if (images.length === 0) {
      alert("Upload at least one image.");
      return;
    }

    const newSpace = {
      id: Date.now(),
      name,
      type,
      location,
      desc,
      price,
      capacity,
      images,
      services
    };

    const existing = JSON.parse(localStorage.getItem("listedSpaces")) || [];
    existing.push(newSpace);

    localStorage.setItem("listedSpaces", JSON.stringify(existing));
    navigate("/seller");
  };

  return (
    <div className="page-gradient">
      <div className="list-space-container">
        <div className="form-box">
          <div className="form-header">
            <h2>List Your Space</h2>
            <p>Fill out the form below to put your space on the market.</p>
          </div>

          <div className="form-grid">

            <div>
              <label>Space Name</label>
              <input
                type="text"
                placeholder="Enter space name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div>
              <label>Space Type</label>
              <input
                type="text"
                placeholder="Office, hall, studio..."
                value={type}
                onChange={(e) => setType(e.target.value)}
              />
            </div>

            <div className="full-width">
              <label>Location</label>
              <input
                type="text"
                placeholder="City / Area"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>

            <div className="full-width">
              <label>Description</label>
              <textarea
                placeholder="Describe your space"
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
              ></textarea>
            </div>

            <div>
              <label>Base Price (₹)</label>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>

            <div>
              <label>Capacity</label>
              <input
                type="number"
                value={capacity}
                onChange={(e) => setCapacity(e.target.value)}
              />
            </div>

            {/* SERVICES */}
            <div className="full-width">
              <label>Available Services & Pricing</label>

              <div className="services-box">
                {serviceOptions.map((service) => {
                  const selected = services.find((s) => s.name === service);

                  return (
                    <div key={service} className="service-row">
                      <input
                        type="checkbox"
                        checked={!!selected}
                        onChange={() => toggleService(service)}
                      />

                      <span>{service}</span>

                      {selected && (
                        <input
                          type="number"
                          placeholder="₹ Price"
                          className="service-price-input"
                          value={selected.price}
                          onChange={(e) =>
                            updateServicePrice(service, e.target.value)
                          }
                        />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="full-width">
              <label>Space Images</label>
              <input type="file" multiple onChange={handleImageUpload} />
            </div>

            <button className="submit-space-btn" onClick={handleSubmit}>
              List My Space
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
