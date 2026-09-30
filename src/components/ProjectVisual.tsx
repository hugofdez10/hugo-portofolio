import Image from "next/image";

export function ProjectVisual({
  variant,
  title,
  screenshot,
}: {
  variant: "housing" | "shuttle" | "generic";
  title: string;
  screenshot?: { src: string; alt: string; label: string };
}) {
  if (screenshot) {
    return (
      <figure className="project-visual project-screenshot">
        <div className="visual-grid" />
        <div className="screenshot-window">
          <Image
            src={screenshot.src}
            alt={screenshot.alt}
            width={1746}
            height={901}
            sizes="(max-width: 760px) 90vw, (max-width: 1260px) 45vw, 900px"
          />
        </div>
        <figcaption>{screenshot.label}</figcaption>
      </figure>
    );
  }
  return (
    <div
      className={`project-visual visual-${variant}`}
      role="img"
      aria-label={`${title} — conceptual workflow illustration`}
    >
      <div className="visual-grid" />
      {variant === "housing" ? (
        <div className="visual-diagram housing-diagram">
          <div className="diagram-top">
            <span>HOUSING / OPERATIONS</span>
            <span>● LIVE WORKFLOW</span>
          </div>
          <div className="diagram-main">
            <div className="diagram-sidebar">
              <span>OVERVIEW</span>
              <span>RESIDENTS</span>
              <span>CABINS</span>
              <span>ASSIGNMENTS</span>
              <span>ISSUES</span>
            </div>
            <div className="diagram-content">
              <div className="diagram-heading">
                <span>Operations overview</span>
                <span>↗</span>
              </div>
              <div className="diagram-stat-row">
                <i />
                <i />
                <i />
              </div>
              <div className="diagram-table">
                <b />
                <b />
                <b />
                <b />
              </div>
            </div>
          </div>
          <div className="diagram-caption">
            WORKFLOW MODEL / NO PRIVATE DATA
          </div>
        </div>
      ) : variant === "shuttle" ? (
        <div className="visual-diagram shuttle-diagram">
          <div className="diagram-top">
            <span>WALMART SHUTTLE</span>
            <span>THURSDAY / 11 SEATS</span>
          </div>
          <div className="shuttle-body">
            <div className="shuttle-route">
              <span>THE GREAT ESCAPE</span>
              <i />
              <span>WALMART</span>
            </div>
            <div className="seat-grid">
              {Array.from({ length: 11 }, (_, i) => (
                <span key={i} className={i < 7 ? "filled" : ""} />
              ))}
            </div>
            <div className="shuttle-foot">BOOK → CONFIRM → GO</div>
          </div>
          <div className="diagram-caption">BOOKING FLOW / CONCEPTUAL VIEW</div>
        </div>
      ) : (
        <div className="generic-mark">
          <span>HF / BUILD</span>
          <strong>{title}</strong>
          <span>PRODUCT · SOFTWARE · EXPERIMENT</span>
        </div>
      )}
    </div>
  );
}
