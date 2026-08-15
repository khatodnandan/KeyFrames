import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { NavLink, useNavigate } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";
import Logo from "./Logo";
import "../styles/navbar.css";

const LINKS = [
  { to: "/Dashboard/home", label: "Home" },
  { to: "/Dashboard/services", label: "Services" },
  { to: "/Dashboard/portfolio", label: "Portfolio" },
  { to: "/Dashboard/pricing", label: "Pricing" },
  { to: "/Dashboard/contacts", label: "Contact" },
  { to: "/Dashboard/notifications", label: "Notifications" },
  { to: "/Dashboard/myaccount", label: "My Account" },
];

export default function Navbar() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <header className="app-nav">
      <div className="container app-nav-inner">
        <Logo to="/Dashboard/home" />

        <nav className="app-nav-links" aria-label="Dashboard">
          {LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) => `app-nav-link ${isActive ? "is-active" : ""}`}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <button className="btn btn-ghost btn-sm app-nav-logout" onClick={handleLogout}>
          <FiLogOut aria-hidden="true" /> Logout
        </button>

        <button
          className={`pub-nav-toggle app-nav-toggle ${open ? "is-open" : ""}`}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="app-mobile-menu"
          onClick={() => setOpen((v) => !v)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      {createPortal(
        <div id="app-mobile-menu" className={`app-nav-mobile ${open ? "is-open" : ""}`}>
          <nav aria-label="Dashboard mobile">
            {LINKS.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                onClick={() => setOpen(false)}
                className={({ isActive }) => `pub-nav-mobile-link ${isActive ? "is-active" : ""}`}
              >
                {link.label}
              </NavLink>
            ))}
          </nav>
          <button className="btn btn-secondary btn-block" onClick={handleLogout}>
            <FiLogOut aria-hidden="true" /> Logout
          </button>
        </div>,
        document.body
      )}
    </header>
  );
}
