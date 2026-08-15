import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { FiArrowRight, FiEye, FiEyeOff } from "react-icons/fi";
import Logo from "../components/Logo";
import useDocumentTitle from "../hooks/useDocumentTitle";
import "../styles/Auth.css";

export default function Login() {
  useDocumentTitle("Login", "Log in to your Keyframes Media account.");

  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const API_URL = process.env.REACT_APP_API_URL || "https://keyframes.onrender.com";

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await axios.post(`${API_URL}/api/auth/login`, {
        email,
        password,
      });

      const { token, role, name, userId } = response.data;

      if (!token) {
        setError("Login failed: token missing.");
        setLoading(false);
        return;
      }

      localStorage.setItem("token", token);
      localStorage.setItem("role", role);
      localStorage.setItem("name", name);
      localStorage.setItem("userId", userId || "");

      if (role === "admin") {
        navigate("/AdminDashboard");
      } else {
        navigate("/Dashboard/home");
      }
    } catch (err) {
      console.error("Login Error:", err);
      setError(err.response?.data?.message || "Login failed. Check your credentials.");
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-visual">
        <Logo size={44} />
        <div className="auth-visual-copy">
          <h1>Welcome back to Keyframes Media.</h1>
          <p>Manage your projects, notifications and account from your dashboard.</p>
        </div>
        <span className="auth-visual-glow" aria-hidden="true" />
      </div>

      <div className="auth-form-side">
        <div className="auth-form-wrap">
          <div className="auth-mobile-logo">
            <Logo size={36} />
          </div>

          <h2>Log in</h2>
          <p className="auth-subtitle">Enter your details to access your account.</p>

          {error && (
            <div className="form-alert form-alert--error" role="alert">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} noValidate>
            <div className="field">
              <label htmlFor="login-email">Email</label>
              <input
                id="login-email"
                type="email"
                placeholder="you@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="field-input"
                required
              />
            </div>

            <div className="field">
              <label htmlFor="login-password">Password</label>
              <div className="password-field">
                <input
                  id="login-password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="field-input"
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

            <button type="submit" className="btn btn-primary btn-block btn-lg" disabled={loading}>
              {loading ? "Logging in…" : "Login"}
              {!loading && <FiArrowRight aria-hidden="true" />}
            </button>
          </form>

          <p className="auth-switch">
            Don't have an account? <Link to="/register">Register</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
