import { Link } from "react-router-dom";
import { FiInstagram, FiLinkedin, FiMail, FiYoutube } from "react-icons/fi";
import Logo from "./Logo";
import "../styles/Footer.css";

const EXPLORE_LINKS = [
  { to: "/about", label: "About" },
  { to: "/services", label: "Services" },
  { to: "/portfolio", label: "Work" },
  { to: "/pricing", label: "Pricing" },
];

const SERVICE_LINKS = [
  "Video Editing",
  "Branding & Logo Design",
  "Social Media Marketing",
  "VFX & Animation",
  "Web Development",
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="kf-footer">
      <div className="container kf-footer-top">
        <div className="kf-footer-brand">
          <Logo size={40} />
          <p>
            A digital creative studio crafting video, design and brand experiences for businesses
            that want to be seen and remembered.
          </p>
          <div className="kf-footer-social">
            <a href="mailto:hello@keyframesmedia.com" aria-label="Email Keyframes Media">
              <FiMail />
            </a>
            <a href="#" aria-label="Keyframes Media on Instagram" target="_blank" rel="noopener noreferrer">
              <FiInstagram />
            </a>
            <a href="#" aria-label="Keyframes Media on YouTube" target="_blank" rel="noopener noreferrer">
              <FiYoutube />
            </a>
            <a href="#" aria-label="Keyframes Media on LinkedIn" target="_blank" rel="noopener noreferrer">
              <FiLinkedin />
            </a>
          </div>
        </div>

        <nav className="kf-footer-col" aria-label="Explore">
          <h4>Explore</h4>
          <ul>
            {EXPLORE_LINKS.map((link) => (
              <li key={link.to}>
                <Link to={link.to}>{link.label}</Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav className="kf-footer-col" aria-label="Services">
          <h4>Services</h4>
          <ul>
            {SERVICE_LINKS.map((label) => (
              <li key={label}>
                <Link to="/services">{label}</Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="kf-footer-col">
          <h4>Start a project</h4>
          <p>Tell us what you're building — we'll get back within one business day.</p>
          <Link to="/contact" className="btn btn-primary btn-sm">
            Get in touch
          </Link>
        </div>
      </div>

      <div className="container kf-footer-bottom">
        <span>© {year} Keyframes Media. All rights reserved.</span>
        <div className="kf-footer-legal">
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </div>
      </div>
    </footer>
  );
}
