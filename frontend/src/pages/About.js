import { Link } from "react-router-dom";
import { FiArrowRight, FiCompass, FiEye, FiHeart } from "react-icons/fi";
import Reveal from "../components/Reveal";
import useDocumentTitle from "../hooks/useDocumentTitle";
import services from "../data/services";
import "../styles/About.css";

const PILLARS = [
  {
    icon: FiCompass,
    title: "Mission",
    copy: "To give brands production-quality video, design and digital work without the overhead of managing a dozen freelancers.",
  },
  {
    icon: FiEye,
    title: "Vision",
    copy: "A studio where every discipline — story, visuals, motion and code — is handled by one accountable team.",
  },
  {
    icon: FiHeart,
    title: "Philosophy",
    copy: "Craft before templates. Every project starts from your brief, not a recycled preset.",
  },
];

export default function About() {
  useDocumentTitle(
    "About Us",
    "Learn about Keyframes Media — a digital creative studio built around one team handling video, design, branding and web development."
  );

  return (
    <div className="about-page">
      <section className="section about-hero">
        <div className="container">
          <Reveal>
            <span className="section-eyebrow">About Keyframes Media</span>
            <h1>A creative studio built for people who don't want to compromise.</h1>
            <p className="about-hero-copy">
              Keyframes Media started with a simple frustration: good creative work usually
              means juggling a video editor, a designer, a social media manager and a developer
              separately. We built a studio that does all of it under one roof, with one point
              of contact and one consistent creative standard.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section section--tight pillars-section">
        <div className="container pillars-grid">
          {PILLARS.map((pillar, i) => {
            const Icon = pillar.icon;
            return (
              <Reveal key={pillar.title} delay={i * 60} className="card pillar-card">
                <span className="pillar-icon">
                  <Icon aria-hidden="true" />
                </span>
                <h3>{pillar.title}</h3>
                <p>{pillar.copy}</p>
              </Reveal>
            );
          })}
        </div>
      </section>

      <section className="section capabilities-section">
        <div className="container capabilities-grid">
          <Reveal>
            <span className="section-eyebrow">What we do</span>
            <h2>One team, every capability your brand needs</h2>
            <p>
              Rather than specializing narrowly, Keyframes Media keeps every core creative and
              technical discipline in-house — so a campaign's video, visuals, brand system and
              website all come from a single, coherent creative direction.
            </p>
            <Link to="/services" className="btn btn-secondary">
              See all services <FiArrowRight aria-hidden="true" />
            </Link>
          </Reveal>

          <Reveal delay={100} className="capabilities-list">
            {services.map((service) => (
              <span key={service.slug} className="badge">
                {service.name}
              </span>
            ))}
          </Reveal>
        </div>
      </section>

      <section className="section section--tight how-we-work">
        <div className="container">
          <Reveal className="section-heading section-heading--center">
            <span className="section-eyebrow" style={{ justifyContent: "center" }}>
              How we work
            </span>
            <h2>Structured process, creative freedom</h2>
            <p>
              Every engagement follows the same four stages — discover, design, produce, deliver —
              so timelines stay predictable while the creative work stays original.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section about-cta">
        <div className="container">
          <Reveal className="cta-box">
            <h2>Let's build something worth watching.</h2>
            <p>Tell us about your brand and what you're trying to launch.</p>
            <Link to="/contact" className="btn btn-primary btn-lg">
              Start a Project <FiArrowRight aria-hidden="true" />
            </Link>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
