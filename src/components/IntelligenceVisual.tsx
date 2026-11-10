import type { CSSProperties } from "react";

const NODE_COUNT = 88;
const nodes = Array.from({ length: NODE_COUNT }, (_, index) => {
  const angle = index * 2.399963229728653;
  const radius = Math.sqrt((index + 0.6) / NODE_COUNT);
  const squiggle = Math.sin(index * 1.3) * 8;
  return {
    id: index,
    x: 360 + Math.cos(angle) * (255 * radius) + squiggle,
    y: 212 + Math.sin(angle) * (154 * radius) + Math.cos(index * 0.8) * 8,
    prominent: index % 13 === 0 || index % 19 === 0,
  };
});
const edges = nodes.flatMap((node, index) =>
  nodes
    .slice(index + 1)
    .map((next) => ({
      id: index + "-" + next.id,
      x1: node.x,
      y1: node.y,
      x2: next.x,
      y2: next.y,
      length: Math.hypot(next.x - node.x, next.y - node.y),
    }))
    .filter((edge) => edge.length < 59)
    .sort((a, b) => a.length - b.length)
    .slice(0, 3),
);

/** Conceptual representation of 88 municipality data nodes, not a geographic map. */
export function IntelligenceVisual() {
  return (
    <div className="intelligence-visual" aria-hidden="true">
      <div className="intelligence-visual-grid" />
      <svg viewBox="0 0 720 430" className="intelligence-svg" preserveAspectRatio="xMidYMid meet">
        <defs>
          <radialGradient id="intelligence-nebula">
            <stop offset="0%" stopColor="#1e82bc" stopOpacity=".32" />
            <stop offset="65%" stopColor="#193c77" stopOpacity=".11" />
            <stop offset="100%" stopColor="#08121a" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="intelligence-edge" x1="0%" y1="10%" x2="100%" y2="80%">
            <stop offset="0%" stopColor="#56b9e7" stopOpacity=".5" />
            <stop offset="100%" stopColor="#786afa" stopOpacity=".2" />
          </linearGradient>
        </defs>
        <ellipse cx="360" cy="215" rx="350" ry="215" fill="url(#intelligence-nebula)" />
        <ellipse cx="360" cy="212" rx="300" ry="178" fill="none" stroke="#60b9e2" strokeOpacity=".13" />
        <ellipse cx="360" cy="212" rx="250" ry="135" fill="none" stroke="#60b9e2" strokeOpacity=".10" />
        <ellipse cx="360" cy="212" rx="320" ry="78" fill="none" stroke="#60b9e2" strokeOpacity=".12" transform="rotate(-18 360 212)" />
        <g className="intelligence-edges">
          {edges.map((edge) => (
            <line
              key={edge.id}
              x1={edge.x1}
              y1={edge.y1}
              x2={edge.x2}
              y2={edge.y2}
              stroke="url(#intelligence-edge)"
              strokeWidth=".7"
            />
          ))}
        </g>
        <g className="intelligence-nodes">
          {nodes.map((node) => (
            <g
              key={node.id}
              className={node.prominent ? "intelligence-node is-prominent" : "intelligence-node"}
              style={{ "--node-order": (node.id % 22) * 0.12 + "s" } as CSSProperties}
            >
              {node.prominent && <circle cx={node.x} cy={node.y} r="12" fill="none" stroke="#89dcff" strokeOpacity=".2" />}
              <circle cx={node.x} cy={node.y} r={node.prominent ? "3.5" : "2"} fill={node.prominent ? "#adf3ff" : "#65acd1"} />
            </g>
          ))}
        </g>
        <g fill="#9db7c7" fontFamily="monospace" fontSize="9" letterSpacing="1.2">
          <text x="26" y="31">DATA LAYER / TERRITORY SYSTEM</text>
          <text x="536" y="408">88 MUNICIPAL NODES</text>
        </g>
        <g stroke="#6ed4fc" strokeOpacity=".6" strokeWidth=".8" fill="none">
          <path d="M137 147 h-38 v-24" />
          <path d="M573 258 h41 v22" />
        </g>
      </svg>
      <div className="intelligence-readout intelligence-readout-top">
        <span>GIPUZKOA / 360</span>
        <span className="intelligence-pulse" />
      </div>
      <div className="intelligence-readout intelligence-readout-bottom">
        <span>SPATIAL DATA NETWORK</span>
        <span>88 / 88</span>
      </div>
    </div>
  );
}
