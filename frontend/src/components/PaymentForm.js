import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { FiArrowLeft, FiCheckCircle } from "react-icons/fi";
import useDocumentTitle from "../hooks/useDocumentTitle";
import "../styles/paymentForm.css";

export default function PaymentForm() {
  useDocumentTitle("Payment", "Submit your Keyframes Media plan payment details.");

  const location = useLocation();
  const navigate = useNavigate();
  const selectedPlan = location.state?.planName || "No plan selected";

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    paymentDetails: "",
    screenshot: null,
  });
  const [preview, setPreview] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const API_URL = process.env.REACT_APP_API_URL || "https://keyframes.onrender.com";

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "screenshot") {
      setFormData({ ...formData, screenshot: files[0] });
      setPreview(files[0] ? URL.createObjectURL(files[0]) : null);
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!formData.screenshot) {
      setError("Please upload a payment screenshot.");
      return;
    }

    const data = new FormData();
    data.append("name", formData.name);
    data.append("email", formData.email);
    data.append("phone", formData.phone);
    data.append("paymentDetails", formData.paymentDetails);
    data.append("plan", selectedPlan);
    data.append("screenshot", formData.screenshot);

    setSubmitting(true);
    try {
      const response = await axios.post(`${API_URL}/api/payment`, data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.data.success || response.status === 200) {
        setSubmitted(true);
      } else {
        setError("Failed to submit payment. Please try again.");
      }
    } catch (err) {
      console.error("Payment submission error:", err.response?.data || err.message);
      setError("Error submitting form. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="payment-success-page">
        <div className="card payment-success-card">
          <FiCheckCircle aria-hidden="true" />
          <h1>Thank you!</h1>
          <p>
            Your payment details for <strong>{selectedPlan}</strong> have been submitted. We'll
            confirm shortly.
          </p>
          <button className="btn btn-primary" onClick={() => navigate("/pricing")}>
            Back to Pricing
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="payment-form-page">
      <div className="card payment-form-box">
        <button className="btn btn-ghost btn-sm back-button" onClick={() => navigate("/pricing")}>
          <FiArrowLeft aria-hidden="true" /> Back to Pricing
        </button>

        <h1>
          Payment for <span className="text-gradient">{selectedPlan}</span>
        </h1>

        {error && (
          <div className="form-alert form-alert--error" role="alert">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="payment-form" noValidate>
          <div className="field">
            <label htmlFor="pf-name">Name</label>
            <input
              id="pf-name"
              className="field-input"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="field">
            <label htmlFor="pf-email">Email</label>
            <input
              id="pf-email"
              className="field-input"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="field">
            <label htmlFor="pf-phone">Phone Number</label>
            <input
              id="pf-phone"
              className="field-input"
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>

          <div className="field">
            <label htmlFor="pf-details">Payment Details</label>
            <input
              id="pf-details"
              className="field-input"
              type="text"
              name="paymentDetails"
              placeholder="Transaction ID / reference"
              value={formData.paymentDetails}
              onChange={handleChange}
              required
            />
          </div>

          <div className="field">
            <label htmlFor="pf-screenshot">Upload Payment Screenshot</label>
            <input
              id="pf-screenshot"
              className="field-input"
              type="file"
              name="screenshot"
              accept="image/*"
              onChange={handleChange}
              required
            />
          </div>

          {preview && <img src={preview} alt="Payment screenshot preview" className="screenshot-preview" />}

          <button type="submit" className="btn btn-primary btn-block btn-lg" disabled={!formData.screenshot || submitting}>
            {submitting ? "Submitting…" : "Submit Payment"}
          </button>
        </form>
      </div>
    </div>
  );
}
