import { useNavigate } from "react-router-dom";
import { FiArrowRight, FiCheck } from "react-icons/fi";
import Reveal from "../components/Reveal";
import useDocumentTitle from "../hooks/useDocumentTitle";
import "../styles/pricing.css";

const PLANS = [
  {
    name: "Basic",
    price: "₹49",
    period: "/month",
    tagline: "For getting started online",
    features: ["SEO", "Email Marketing"],
    featured: false,
  },
  {
    name: "Pro",
    price: "₹99",
    period: "/month",
    tagline: "For growing brands",
    features: ["SEO", "Email Marketing", "Social Media"],
    featured: true,
  },
  {
    name: "Enterprise",
    price: "₹199",
    period: "/month",
    tagline: "For full-scale campaigns",
    features: ["All Features", "Dedicated Manager"],
    featured: false,
  },
];

export default function Pricing() {
  useDocumentTitle("Pricing", "Compare Keyframes Media plans and pricing.");

  const navigate = useNavigate();

  const handleSelectPlan = (planName) => {
    navigate("/payment-form", { state: { planName } });
  };

  return (
    <div className="pricing-page">
      <section className="section pricing-hero">
        <div className="container">
          <Reveal className="section-heading section-heading--center">
            <span className="section-eyebrow" style={{ justifyContent: "center" }}>
              Pricing
            </span>
            <h1>Simple plans for every stage</h1>
            <p>Pick a plan to get started, or contact us for a custom project scope.</p>
          </Reveal>

          <div className="pricing-grid">
            {PLANS.map((plan, i) => (
              <Reveal
                key={plan.name}
                delay={i * 60}
                className={`card pricing-card ${plan.featured ? "pricing-card--featured" : ""}`}
              >
                {plan.featured && <span className="badge badge-accent pricing-badge">Most popular</span>}
                <h2>{plan.name}</h2>
                <p className="pricing-tagline">{plan.tagline}</p>
                <p className="pricing-price">
                  {plan.price}
                  <span>{plan.period}</span>
                </p>
                <ul className="pricing-features">
                  {plan.features.map((f) => (
                    <li key={f}>
                      <FiCheck aria-hidden="true" /> {f}
                    </li>
                  ))}
                </ul>
                <button
                  className={`btn ${plan.featured ? "btn-primary" : "btn-secondary"} btn-block`}
                  onClick={() => handleSelectPlan(plan.name)}
                >
                  Select Plan <FiArrowRight aria-hidden="true" />
                </button>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
