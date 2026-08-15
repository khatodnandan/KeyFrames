import { Link } from "react-router-dom";
import { FiArrowRight, FiArrowUpRight } from "react-icons/fi";
import KeyframeScene from "../components/KeyframeScene";
import Reveal from "../components/Reveal";
import useDocumentTitle from "../hooks/useDocumentTitle";
import services from "../data/services";
import portfolio from "../data/portfolio";
import "../styles/LandingPage.css";

const PROCESS = [
  { step: "01", title: "Discover", copy: "We learn your brand, audience and goals before a single frame is cut." },
  { step: "02", title: "Design", copy: "Concepts, storyboards and moodboards get your sign-off before production starts." },
  { step: "03", title: "Produce", copy: "Shooting, editing, motion and design come together into finished creative." },
  { step: "04", title: "Deliver", copy: "Export-ready assets, on time, in the formats every platform actually needs." },
];

const VALUE_PROPS = [
  {
    title: "One team, every discipline",
    copy: "Video, design, motion and web under one roof — no juggling five different freelancers.",
  },
  {
    title: "Built for how platforms work",
    copy: "Every deliverable is cut for where it lives — feed, reel, site or screen.",
  },
  {
    title: "Fast, structured turnaround",
    copy: "A clear four-stage process keeps projects moving without surprise delays.",
  },
  {
    title: "Original work, every time",
    copy: "No templates recycled between clients — every project is built from your brief.",
  },
];

const CAPABILITY_STATS = [
  { value: "10", label: "Creative disciplines" },
  { value: "4", label: "Step delivery process" },
  { value: "1", label: "Dedicated project team" },
  { value: "100%", label: "Original, brief-built work" },
];

export default function LandingPage() {
  useDocumentTitle(
    "Video, Design & Digital Production Studio",
    "Keyframes Media is a digital creative studio offering video editing, branding, social media, photography, VFX and web development."
  );

  return (
    <div className="landing">
      {/* ---------------- Hero ---------------- */}
      <section className="hero">
        <KeyframeScene />
        <div className="container hero-inner">
          <span className="section-eyebrow">Keyframes Media — Creative Studio</span>
          <h1 className="hero-title">
            We turn ideas into <span className="text-gradient">digital experiences.</span>
          </h1>
          <p className="hero-subtitle">
            Keyframes Media is a full-service creative studio — video editing, branding, motion
            design, photography and web development for brands that want to be seen, not just
            posted.
          </p>
          <div className="hero-actions">
            <Link to="/contact" className="btn btn-primary btn-lg">
              Start a Project <FiArrowRight aria-hidden="true" />
            </Link>
            <Link to="/portfolio" className="btn btn-secondary btn-lg">
              Explore Our Work
            </Link>
          </div>
        </div>
      </section>

      {/* ---------------- Capability strip ---------------- */}
      <section className="section section--tight capability-strip">
        <div className="container">
          <Reveal className="capability-grid">
            {CAPABILITY_STATS.map((stat) => (
              <div key={stat.label} className="capability-stat">
                <span className="capability-value">{stat.value}</span>
                <span className="capability-label">{stat.label}</span>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* ---------------- Services ---------------- */}
      <section className="section" id="services">
        <div className="container">
          <Reveal as="div" className="section-heading section-heading--center">
            <span className="section-eyebrow" style={{ justifyContent: "center" }}>
              What we do
            </span>
            <h2>Every discipline your brand needs to launch</h2>
            <p>
              From the first storyboard to the final render — one team handles the full creative
              pipeline.
            </p>
          </Reveal>

          <div className="services-preview-grid">
            {services.slice(0, 8).map((service, i) => {
              const Icon = service.icon;
              return (
                <Reveal key={service.slug} delay={i * 40} className="card card--interactive service-mini-card">
                  <span className="service-mini-icon">
                    <Icon aria-hidden="true" />
                  </span>
                  <h3>{service.name}</h3>
                  <p>{service.summary}</p>
                </Reveal>
              );
            })}
          </div>

          <Reveal className="services-cta">
            <Link to="/services" className="btn btn-secondary">
              View all services <FiArrowRight aria-hidden="true" />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ---------------- Featured work ---------------- */}
      <section className="section featured-work">
        <div className="container">
          <Reveal className="section-heading">
            <span className="section-eyebrow">Selected work</span>
            <h2>A few frames from recent projects</h2>
          </Reveal>

          <div className="featured-grid">
            {portfolio.map((project, i) => (
              <Reveal
                key={project.id}
                delay={i * 60}
                as="a"
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="card card--interactive featured-card"
              >
                <span className="badge badge-accent">{project.category}</span>
                <h3>{project.name}</h3>
                <span className="featured-card-link">
                  View {project.type} <FiArrowUpRight aria-hidden="true" />
                </span>
              </Reveal>
            ))}
          </div>

          <Reveal className="services-cta">
            <Link to="/portfolio" className="btn btn-secondary">
              See full portfolio <FiArrowRight aria-hidden="true" />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ---------------- About teaser ---------------- */}
      <section className="section about-teaser">
        <div className="container about-teaser-grid">
          <Reveal>
            <span className="section-eyebrow">Who we are</span>
            <h2>A creative studio built around one idea — craft over templates</h2>
            <p>
              Keyframes Media exists to give brands production-quality creative without
              stitching together five different vendors. We plan, shoot, design and build —
              start to finish.
            </p>
            <Link to="/about" className="btn btn-secondary">
              More about us <FiArrowRight aria-hidden="true" />
            </Link>
          </Reveal>

          <Reveal delay={100} className="process-list">
            {PROCESS.map((item) => (
              <div key={item.step} className="process-item">
                <span className="process-step">{item.step}</span>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.copy}</p>
                </div>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* ---------------- Why choose us ---------------- */}
      <section className="section section--tight why-us">
        <div className="container">
          <Reveal className="section-heading section-heading--center">
            <span className="section-eyebrow" style={{ justifyContent: "center" }}>
              Why Keyframes
            </span>
            <h2>What working with us actually looks like</h2>
          </Reveal>

          <div className="why-us-grid">
            {VALUE_PROPS.map((item, i) => (
              <Reveal key={item.title} delay={i * 50} className="card why-us-card">
                <h3>{item.title}</h3>
                <p>{item.copy}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- CTA ---------------- */}
      <section className="section cta-section">
        <div className="container">
          <Reveal className="cta-box">
            <h2>Have a project in mind?</h2>
            <p>Tell us what you're building — we'll reply within one business day.</p>
            <div className="hero-actions">
              <Link to="/contact" className="btn btn-primary btn-lg">
                Start a Project <FiArrowRight aria-hidden="true" />
              </Link>
              <Link to="/pricing" className="btn btn-secondary btn-lg">
                See Pricing
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
