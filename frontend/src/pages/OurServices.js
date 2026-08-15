import { Link } from "react-router-dom";
import { FiArrowRight, FiCheck } from "react-icons/fi";
import Reveal from "../components/Reveal";
import useDocumentTitle from "../hooks/useDocumentTitle";
import services from "../data/services";
import "../styles/services.css";

export default function OurServices() {
  useDocumentTitle(
    "Our Services",
    "Video editing, graphic design, branding, social media, photography, VFX, 3D, web development and digital marketing — all from Keyframes Media."
  );

  return (
    <div className="services-page">
      <section className="section services-hero">
        <div className="container">
          <Reveal className="section-heading section-heading--center">
            <span className="section-eyebrow" style={{ justifyContent: "center" }}>
              Our Services
            </span>
            <h1>Everything a modern brand needs to launch and grow</h1>
            <p>
              Ten disciplines, one accountable team. Pick a single service or lean on us for the
              full creative pipeline.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section section--tight">
        <div className="container services-grid">
          {services.map((service, i) => {
            const Icon = service.icon;
            return (
              <Reveal key={service.slug} delay={(i % 4) * 50} className="card card--interactive service-card">
                <span className="service-card-icon">
                  <Icon aria-hidden="true" />
                </span>
                <h2>{service.name}</h2>
                <p>{service.summary}</p>
                <Link to="/contact" className="service-card-cta">
                  Get a quote <FiArrowRight aria-hidden="true" />
                </Link>
              </Reveal>
            );
          })}
        </div>
      </section>

      <section className="section section--tight services-included">
        <div className="container">
          <Reveal className="card services-included-card">
            <div>
              <h2>Not sure which service you need?</h2>
              <p>
                Most projects blend a few disciplines — a launch video might need editing, motion
                graphics and a matching social cutdown. Tell us the goal and we'll scope the right
                mix.
              </p>
              <ul className="services-included-list">
                <li>
                  <FiCheck aria-hidden="true" /> Free scoping call
                </li>
                <li>
                  <FiCheck aria-hidden="true" /> Fixed-scope proposals
                </li>
                <li>
                  <FiCheck aria-hidden="true" /> One point of contact
                </li>
              </ul>
            </div>
            <Link to="/contact" className="btn btn-primary btn-lg">
              Talk to us <FiArrowRight aria-hidden="true" />
            </Link>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
