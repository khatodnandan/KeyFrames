import { useState } from "react";
import axios from "axios";
import { FiArrowRight, FiCheckCircle, FiMail, FiMapPin, FiPhone } from "react-icons/fi";
import useDocumentTitle from "../hooks/useDocumentTitle";
import "../styles/contacts.css";

const PROJECT_TYPES = [
  "Video Editing",
  "Branding & Logo Design",
  "Social Media Marketing",
  "Photography / Videography",
  "VFX & Animation",
  "Web Development",
  "Other",
];

const initialForm = { name: "", email: "", company: "", projectType: "", message: "" };

export default function Contacts() {
  useDocumentTitle(
    "Contact",
    "Get in touch with Keyframes Media to start a video, design or web project."
  );

  const [formData, setFormData] = useState(initialForm);
  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    const API_URL = process.env.REACT_APP_API_URL || "https://keyframes.onrender.com";

    try {
      // Backend only stores name/email/message — fold project context into the message
      // so the existing /api/contacts/add endpoint doesn't need to change.
      const composedMessage = [
        formData.company && `Company: ${formData.company}`,
        formData.projectType && `Project type: ${formData.projectType}`,
        formData.message,
      ]
        .filter(Boolean)
        .join("\n");

      const response = await axios.post(
        `${API_URL}/api/contacts/add`,
        { name: formData.name, email: formData.email, message: composedMessage },
        { headers: { "Content-Type": "application/json" } }
      );

      if (response.data.success) {
        setStatus("success");
        setFormData(initialForm);
      } else {
        setStatus("error");
        setErrorMsg("We couldn't send your message. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting contact form:", error.response?.data || error.message);
      setStatus("error");
      setErrorMsg("Something went wrong sending your message. Please try again in a moment.");
    }
  };

  return (
    <div className="contacts-page">
      <section className="section contact-hero">
        <div className="container contact-grid">
          <div>
            <span className="section-eyebrow">Get in touch</span>
            <h1>Let's talk about your project</h1>
            <p className="contact-hero-copy">
              Tell us what you're building and we'll get back to you within one business day with
              next steps.
            </p>

            <ul className="contact-info-list">
              <li>
                <FiMail aria-hidden="true" />
                <a href="mailto:hello@keyframesmedia.com">hello@keyframesmedia.com</a>
              </li>
              <li>
                <FiPhone aria-hidden="true" />
                <span>Available on request after first contact</span>
              </li>
              <li>
                <FiMapPin aria-hidden="true" />
                <span>Remote-first — working with clients everywhere</span>
              </li>
            </ul>
          </div>

          <div className="card contact-form-card">
            {status === "success" ? (
              <div className="contact-success" role="status">
                <FiCheckCircle aria-hidden="true" />
                <h2>Message sent</h2>
                <p>Thanks for reaching out — we'll reply within one business day.</p>
                <button className="btn btn-secondary" onClick={() => setStatus("idle")}>
                  Send another message
                </button>
              </div>
            ) : (
              <form className="contact-form" onSubmit={handleSubmit} noValidate>
                {status === "error" && (
                  <div className="form-alert form-alert--error" role="alert">
                    {errorMsg}
                  </div>
                )}

                <div className="field">
                  <label htmlFor="name">Name</label>
                  <input
                    id="name"
                    className="field-input"
                    type="text"
                    name="name"
                    placeholder="Your full name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="field">
                  <label htmlFor="email">Email</label>
                  <input
                    id="email"
                    className="field-input"
                    type="email"
                    name="email"
                    placeholder="you@company.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="contact-form-row">
                  <div className="field">
                    <label htmlFor="company">Company / Brand</label>
                    <input
                      id="company"
                      className="field-input"
                      type="text"
                      name="company"
                      placeholder="Optional"
                      value={formData.company}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="field">
                    <label htmlFor="projectType">Project type</label>
                    <select
                      id="projectType"
                      className="field-select"
                      name="projectType"
                      value={formData.projectType}
                      onChange={handleChange}
                    >
                      <option value="">Select one</option>
                      {PROJECT_TYPES.map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="field">
                  <label htmlFor="message">Message</label>
                  <textarea
                    id="message"
                    className="field-textarea"
                    name="message"
                    placeholder="Tell us about your project, timeline and goals"
                    value={formData.message}
                    onChange={handleChange}
                    required
                  />
                </div>

                <button type="submit" className="btn btn-primary btn-block btn-lg" disabled={status === "loading"}>
                  {status === "loading" ? "Sending…" : "Send Message"}
                  {status !== "loading" && <FiArrowRight aria-hidden="true" />}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
