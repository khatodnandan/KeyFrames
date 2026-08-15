import { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import PublicLayout from "./components/PublicLayout";
import PageLoader from "./components/PageLoader";

// Public marketing pages (small, loaded eagerly)
import Landing from "./pages/LandingPage";
import About from "./pages/About";
import OurServices from "./pages/OurServices";
import Portfolio from "./pages/Portfolio";
import Pricing from "./pages/Pricing";
import Contacts from "./pages/Contacts";
import Login from "./pages/Login";
import Register from "./pages/Register";

// App shell pages (heavier — code-split)
const Dashboard = lazy(() => import("./pages/Dashboard"));
const AdminDashboard = lazy(() => import("./pages/AdminDashboard"));
const PaymentForm = lazy(() => import("./components/PaymentForm"));

function App() {
  return (
    <Router>
      <Suspense fallback={<PageLoader />}>
        <Routes>
          {/* Public marketing site */}
          <Route element={<PublicLayout />}>
            <Route path="/" element={<Landing />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<OurServices />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/contact" element={<Contacts />} />
          </Route>

          {/* Authentication */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Authenticated app */}
          <Route path="/Dashboard/*" element={<Dashboard />} />
          <Route path="/AdminDashboard" element={<AdminDashboard />} />

          {/* Payment */}
          <Route path="/payment-form" element={<PaymentForm />} />

          {/* Fallback for unknown routes */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
