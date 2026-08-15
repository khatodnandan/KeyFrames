import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FiLogOut, FiMail, FiShield, FiUser } from "react-icons/fi";
import useDocumentTitle from "../hooks/useDocumentTitle";
import "../styles/myaccount.css";

export default function MyAccount() {
  useDocumentTitle("My Account", "View your Keyframes Media account details.");

  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const API_URL = process.env.REACT_APP_API_URL || "https://keyframes.onrender.com";

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    const fetchUser = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/user/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(res.data);
      } catch (err) {
        console.error("Failed to fetch user info:", err.response?.data || err.message);
        localStorage.removeItem("token");
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [navigate, API_URL]);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="myaccount-page">
      <section className="section myaccount-hero">
        <div className="container myaccount-container">
          <div className="card myaccount-card">
            {loading ? (
              <div className="myaccount-skeleton" aria-busy="true" aria-live="polite">
                <span className="skeleton-line skeleton-line--avatar" />
                <span className="skeleton-line" />
                <span className="skeleton-line skeleton-line--short" />
              </div>
            ) : user ? (
              <>
                <span className="myaccount-avatar">
                  <FiUser aria-hidden="true" />
                </span>
                <h1>{user.name}</h1>
                <ul className="myaccount-details">
                  <li>
                    <FiMail aria-hidden="true" /> {user.email}
                  </li>
                  <li>
                    <FiShield aria-hidden="true" /> {user.role === "admin" ? "Administrator" : "Member"}
                  </li>
                </ul>
              </>
            ) : (
              <p>No user info available.</p>
            )}

            <button className="btn btn-secondary btn-block" onClick={handleLogout}>
              <FiLogOut aria-hidden="true" /> Logout
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
