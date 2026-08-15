import { Link } from "react-router-dom";
import { FiArrowRight } from "react-icons/fi";
import useDocumentTitle from "../hooks/useDocumentTitle";
import "../styles/home.css";

export default function Home() {
  const name = localStorage.getItem("name");

  useDocumentTitle("Dashboard", "Your Keyframes Media dashboard.");

  return (
    <div className="dash-home">
      <section className="section dash-home-hero">
        <div className="container">
          <span className="section-eyebrow">Dashboard</span>
          <h1>Welcome{name ? `, ${name}` : ""}.</h1>
          <p>
            Manage your account, keep track of notifications and revisit our services and
            portfolio — all from here.
          </p>

          <div className="dash-home-links">
            <Link to="/Dashboard/services" className="card card--interactive dash-home-link">
              <h3>Our Services</h3>
              <p>Browse everything we offer.</p>
              <span>
                Explore <FiArrowRight aria-hidden="true" />
              </span>
            </Link>
            <Link to="/Dashboard/portfolio" className="card card--interactive dash-home-link">
              <h3>Portfolio</h3>
              <p>See recent project work.</p>
              <span>
                View work <FiArrowRight aria-hidden="true" />
              </span>
            </Link>
            <Link to="/Dashboard/pricing" className="card card--interactive dash-home-link">
              <h3>Pricing</h3>
              <p>Compare plans and get started.</p>
              <span>
                See plans <FiArrowRight aria-hidden="true" />
              </span>
            </Link>
            <Link to="/Dashboard/myaccount" className="card card--interactive dash-home-link">
              <h3>My Account</h3>
              <p>Review your account details.</p>
              <span>
                Manage <FiArrowRight aria-hidden="true" />
              </span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
