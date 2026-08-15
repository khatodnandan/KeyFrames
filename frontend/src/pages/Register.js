import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { FiArrowRight, FiEye, FiEyeOff } from "react-icons/fi";
import Logo from "../components/Logo";
import useDocumentTitle from "../hooks/useDocumentTitle";
import "../styles/Auth.css";

export default function Register() {
  useDocumentTitle("Register", "Create a Keyframes Media account.");

  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [success, setSuccess] = useState(false);

  const API_URL = process.env.REACT_APP_API_URL || "https://keyframes.onrender.com";

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await axios.post(`${API_URL}/api/auth/register`, {
        name,
        email,
        phone,
        password,
        role: "",
      });

      if (response.status === 201) {
        setSuccess(true);
        setTimeout(() => navigate("/login"), 1400);
      } else {
        setError("Registration failed. Please try again.");
        setLoading(false);
      }
    } catch (err) {
      console.error("Registration Error:", err);
      setError(err.response?.data?.message || "Registration failed. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-visual">
        <Logo size={44} />
        <div className="auth-visual-copy">
          <h1>Join Keyframes Media.</h1>
          <p>Create an account to start a project, track updates and manage your notifications.</p>
        </div>
        <span className="auth-visual-glow" aria-hidden="true" />
      </div>

      <div className="auth-form-side">
        <div className="auth-form-wrap">
          <div className="auth-mobile-logo">
            <Logo size={36} />
          </div>

          <h2>Create an account</h2>
          <p className="auth-subtitle">It only takes a minute.</p>

          {error && (
            <div className="form-alert form-alert--error" role="alert">
              {error}
            </div>
          )}
          {success && (
            <div className="form-alert form-alert--success" role="status">
              Registration successful! Redirecting to login…
            </div>
          )}

          <form onSubmit={handleRegister} noValidate>
            <div className="field">
              <label htmlFor="reg-name">Full name</label>
              <input
                id="reg-name"
                type="text"
                placeholder="Your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="field-input"
                required
              />
            </div>

            <div className="field">
              <label htmlFor="reg-email">Email</label>
              <input
                id="reg-email"
                type="email"
                placeholder="you@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="field-input"
                required
              />
            </div>

            <div className="field">
              <label htmlFor="reg-phone">Phone</label>
              <input
                id="reg-phone"
                type="tel"
                placeholder="Your phone number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="field-input"
                required
              />
            </div>

            <div className="field">
              <label htmlFor="reg-password">Password</label>
              <div className="password-field">
                <input
                  id="reg-password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Create a password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="field-input"
                  minLength={6}
                  required
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword((v) => !v)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <FiEyeOff aria-hidden="true" /> : <FiEye aria-hidden="true" />}
                </button>
              </div>
            </div>

            <button type="submit" className="btn btn-primary btn-block btn-lg" disabled={loading || success}>
              {loading ? "Creating account…" : "Register"}
              {!loading && !success && <FiArrowRight aria-hidden="true" />}
            </button>
          </form>

          <p className="auth-switch">
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
