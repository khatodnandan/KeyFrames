import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Link, NavLink, useNavigate } from "react-router-dom";
import Logo from "./Logo";
import "../styles/PublicNavbar.css";

const LINKS = [
  { to: "/", label: "Home", end: true },
  { to: "/about", label: "About" },
  { to: "/services", label: "Services" },
  { to: "/portfolio", label: "Work" },
  { to: "/pricing", label: "Pricing" },
  { to: "/contact", label: "Contact" },
];

export default function PublicNavbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const isAuthed = Boolean(localStorage.getItem("token"));
  const role = localStorage.getItem("role");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const goToApp = () => {
    setOpen(false);
    navigate(role === "admin" ? "/AdminDashboard" : "/Dashboard/home");
  };

  return (
    <header className={`pub-nav ${scrolled ? "pub-nav--scrolled" : ""}`}>
      <div className="container pub-nav-inner">
        <Logo />

        <nav className="pub-nav-links" aria-label="Primary">
          {LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              className={({ isActive }) => `pub-nav-link ${isActive ? "is-active" : ""}`}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="pub-nav-actions">
          {isAuthed ? (
            <button className="btn btn-primary btn-sm" onClick={goToApp}>
              {role === "admin" ? "Admin Panel" : "My Dashboard"}
            </button>
          ) : (
            <>
              <Link to="/login" className="pub-nav-link">
                Login
              </Link>
              <Link to="/register" className="btn btn-primary btn-sm">
                Start a Project
              </Link>
            </>
          )}
        </div>

        <button
          className={`pub-nav-toggle ${open ? "is-open" : ""}`}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="pub-mobile-menu"
          onClick={() => setOpen((v) => !v)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      {createPortal(
        <div id="pub-mobile-menu" className={`pub-nav-mobile ${open ? "is-open" : ""}`}>
          <nav aria-label="Mobile">
            {LINKS.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.end}
                onClick={() => setOpen(false)}
                className={({ isActive }) => `pub-nav-mobile-link ${isActive ? "is-active" : ""}`}
              >
                {link.label}
              </NavLink>
            ))}
          </nav>
          <div className="pub-nav-mobile-actions">
            {isAuthed ? (
              <button className="btn btn-primary btn-block" onClick={goToApp}>
                {role === "admin" ? "Admin Panel" : "My Dashboard"}
              </button>
            ) : (
              <>
                <Link to="/login" className="btn btn-secondary btn-block" onClick={() => setOpen(false)}>
                  Login
                </Link>
                <Link to="/register" className="btn btn-primary btn-block" onClick={() => setOpen(false)}>
                  Start a Project
                </Link>
              </>
            )}
          </div>
        </div>,
        document.body
      )}
    </header>
  );
}
