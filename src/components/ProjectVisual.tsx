import type { CSSProperties } from "react";

type Variant = "housing" | "shuttle";

const cabins = Array.from({ length: 75 }, (_, index) => {
  const col = index % 15;
  const row = Math.floor(index / 15);
  return {
    index,
    x: 98 + col * 30 + row * 15,
    y: 119 + row * 37 - col * 2.5,
    active: index % 11 === 0 || index % 17 === 0,
  };
});
const stations = [
  { x: 74, y: 258, label: "01" },
  { x: 195, y: 160, label: "02" },
  { x: 338, y: 158, label: "03" },
  { x: 480, y: 204, label: "04" },
  { x: 621, y: 107, label: "05" },
];

/** Decorative abstract system diagrams. No personal or operational data. */
export function ProjectVisual({ variant }: { variant: Variant }) {
  if (variant === "housing") {
    return (
      <div className="cinematic-project-art cinematic-project-art-housing" aria-hidden="true">
        <div className="artifact-corner artifact-corner-top">SYSTEM 001 / HOUSING</div>
        <svg className="artifact-svg" viewBox="0 0 720 360" preserveAspectRatio="xMidYMid meet">
          <defs>
            <linearGradient id="housing-facet" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#b3edff" stopOpacity=".7" />
              <stop offset="100%" stopColor="#277cba" stopOpacity=".3" />
            </linearGradient>
            <radialGradient id="housing-halo">
              <stop offset="0%" stopColor="#1e83bb" stopOpacity=".34" />
              <stop offset="100%" stopColor="#1e83bb" stopOpacity="0" />
            </radialGradient>
          </defs>
          <circle cx="364" cy="165" r="230" fill="url(#housing-halo)" />
          <path d="M90 255 L570 174 M130 92 L660 233 M60 183 L620 267" fill="none" stroke="#7acdeb" strokeOpacity=".09" />
          {cabins.map(({ index, x, y, active }) => (
            <g key={index} className={active ? "housing-node housing-node-active" : "housing-node"} style={{ "--node-delay": `${(index % 14) * 0.13}s` } as CSSProperties}>
              <path d={`M${x} ${y} l12 -7 12 7 -12 7 Z`} fill={active ? "#9beaff" : "url(#housing-facet)"} fillOpacity={active ? ".9" : ".36"} stroke="#a4e5ff" strokeOpacity={active ? ".9" : ".3"} strokeWidth=".7" />
              <path d={`M${x} ${y} l12 7 v9 l-12 -7 Z`} fill="#0b3652" stroke="#7dcbe9" strokeOpacity=".28" strokeWidth=".7" />
              <path d={`M${x + 12} ${y + 7} l12 -7 v9 l-12 7 Z`} fill={active ? "#2376a8" : "#102a3f"} stroke="#7dcbe9" strokeOpacity=".28" strokeWidth=".7" />
            </g>
          ))}
          <g fill="none" stroke="#71d2f4" strokeOpacity=".6">
            <path d="M98 106 v-23 h80" />
            <circle cx="98" cy="106" r="2" fill="#71d2f4" />
            <path d="M560 180 h78 v-24" />
            <circle cx="560" cy="180" r="2" fill="#71d2f4" />
          </g>
          <g fill="#b8d9e7" fontFamily="monospace" fontSize="9" letterSpacing="1.5">
            <text x="182" y="86">CABIN NETWORK</text>
            <text x="555" y="148">75 UNITS</text>
          </g>
        </svg>
        <div className="artifact-corner artifact-corner-bottom">ISOMETRIC SYSTEM MAP / CONCEPT VISUAL</div>
      </div>
    );
  }

  return (
    <div className="cinematic-project-art cinematic-project-art-shuttle" aria-hidden="true">
      <div className="artifact-corner artifact-corner-top">SYSTEM 002 / SHUTTLE</div>
      <svg className="artifact-svg" viewBox="0 0 720 360" preserveAspectRatio="xMidYMid meet">
        <defs>
          <linearGradient id="route-glow" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#7375ff" />
            <stop offset="55%" stopColor="#b1c2ff" />
            <stop offset="100%" stopColor="#63e2fa" />
          </linearGradient>
          <radialGradient id="shuttle-halo">
            <stop offset="0%" stopColor="#6860d5" stopOpacity=".26" />
            <stop offset="100%" stopColor="#6860d5" stopOpacity="0" />
          </radialGradient>
        </defs>
        <circle cx="360" cy="170" r="280" fill="url(#shuttle-halo)" />
        <g stroke="#b0b7ff" strokeOpacity=".12" strokeWidth=".6">
          {Array.from({ length: 13 }, (_, i) => (
            <path key={i} d={`M${48 + i * 52} 45 v260`} />
          ))}
          {Array.from({ length: 6 }, (_, i) => (
            <path key={i} d={`M48 ${55 + i * 50} H684`} />
          ))}
        </g>
        <path className="shuttle-route-wide" d="M74 258 C180 258 144 112 265 132 S441 280 621 107" fill="none" stroke="#5c73ff" strokeWidth="16" strokeOpacity=".1" strokeLinecap="round" />
        <path className="shuttle-route" d="M74 258 C180 258 144 112 265 132 S441 280 621 107" fill="none" stroke="url(#route-glow)" strokeWidth="2.5" strokeLinecap="round" />
        <path className="shuttle-route-dashed" d="M74 258 C180 258 144 112 265 132 S441 280 621 107" fill="none" stroke="#dbe3ff" strokeWidth=".8" strokeDasharray="2 10" strokeOpacity=".8" />
        {stations.map((station) => (
          <g key={station.label}>
            <circle cx={station.x} cy={station.y} r="13" fill="#10142a" stroke="#7e9bfa" strokeOpacity=".48" />
            <circle cx={station.x} cy={station.y} r="4" fill="#c3ddff" />
            <text x={station.x} y={station.y + 32} fill="#91a4c4" textAnchor="middle" fontSize="10" fontFamily="monospace">{station.label}</text>
          </g>
        ))}
        <circle className="shuttle-moving-dot" cx="0" cy="0" r="7" fill="#e8faff" />
        <g fill="#d1d9ff" fontFamily="monospace" fontSize="10" letterSpacing="1.5">
          <text x="77" y="87">PICKUP / DROP-OFF</text>
          <text x="508" y="284">ROUTE NETWORK</text>
        </g>
      </svg>
      <div className="artifact-corner artifact-corner-bottom">TRANSPORTATION FLOW / CONCEPT VISUAL</div>
    </div>
  );
}
