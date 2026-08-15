import { useMemo, useState } from "react";
import { FiArrowUpRight } from "react-icons/fi";
import Reveal from "../components/Reveal";
import useDocumentTitle from "../hooks/useDocumentTitle";
import portfolio from "../data/portfolio";
import "../styles/portfolio.css";

export default function Portfolio() {
  useDocumentTitle(
    "Portfolio",
    "A look at recent Keyframes Media video and creative projects."
  );

  const categories = useMemo(
    () => ["All", ...new Set(portfolio.map((p) => p.category))],
    []
  );
  const [active, setActive] = useState("All");

  const projects =
    active === "All" ? portfolio : portfolio.filter((p) => p.category === active);

  return (
    <div className="portfolio-page">
      <section className="section portfolio-hero">
        <div className="container">
          <Reveal className="section-heading section-heading--center">
            <span className="section-eyebrow" style={{ justifyContent: "center" }}>
              Our Work
            </span>
            <h1>Selected projects</h1>
            <p>Real work from real briefs. More is added as it ships.</p>
          </Reveal>

          <div className="portfolio-filters" role="tablist" aria-label="Filter portfolio by category">
            {categories.map((cat) => (
              <button
                key={cat}
                role="tab"
                aria-selected={active === cat}
                className={`portfolio-filter ${active === cat ? "is-active" : ""}`}
                onClick={() => setActive(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--tight">
        <div className="container">
          {projects.length === 0 ? (
            <p className="portfolio-empty">No projects in this category yet — check back soon.</p>
          ) : (
            <div className="portfolio-grid">
              {projects.map((project, i) => (
                <Reveal
                  key={project.id}
                  delay={i * 60}
                  as="a"
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="card card--interactive portfolio-card"
                >
                  <span className="badge badge-accent">{project.category}</span>
                  <h2>{project.name}</h2>
                  <span className="portfolio-card-link">
                    View {project.type} <FiArrowUpRight aria-hidden="true" />
                  </span>
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
