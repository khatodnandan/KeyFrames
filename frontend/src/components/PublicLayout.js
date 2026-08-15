import { Outlet } from "react-router-dom";
import PublicNavbar from "./PublicNavbar";
import Footer from "./Footer";

export default function PublicLayout() {
  return (
    <div className="public-shell">
      <a href="#main-content" className="skip-link">
        Skip to content
      </a>
      <PublicNavbar />
      <main id="main-content">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
