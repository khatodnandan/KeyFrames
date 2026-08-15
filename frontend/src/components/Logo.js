import { Link } from "react-router-dom";
import logoMark from "../styles/images/logo.jpg";

export default function Logo({ to = "/", size = 36, showWordmark = true, className = "" }) {
  return (
    <Link to={to} className={`kf-logo ${className}`} aria-label="Keyframes Media — Home">
      <span className="kf-logo-mark" style={{ width: size, height: size }}>
        <img src={logoMark} alt="" width={size} height={size} loading="eager" />
      </span>
      {showWordmark && <span className="kf-logo-word">KEYFRAMES</span>}
    </Link>
  );
}
