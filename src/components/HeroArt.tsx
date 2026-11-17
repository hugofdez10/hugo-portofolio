/**
 * 8-bit computing scene for the hero: circuit traces with travelling data
 * pulses, drifting 0/1 bits, and a pixel CPU wired to a terminal window with
 * a mouse pointer on top. Everything is deterministic so server and client
 * render the same markup; colours come from CSS so both themes can restyle it.
 */

function random(seed: number) {
  let a = seed;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const pick = (next: () => number, min: number, max: number) =>
  min + Math.floor(next() * (max - min + 1));

/** Dithered pixel strip that dissolves the hero into the page background. */
export function PixelEdge() {
  const CELL = 8;
  const columns = 240;
  const rows = 7;
  const next = random(7);
  const cells: [number, number][] = [];
  for (let row = 0; row < rows; row++) {
    const density = Math.pow((row + 1) / rows, 2.2);
    for (let col = 0; col < columns; col++) {
      if (row === rows - 1 || next() < density) cells.push([col, row]);
    }
  }
  return (
    <svg
      className="pixel-edge"
      viewBox={`0 0 ${columns * CELL} ${rows * CELL}`}
      preserveAspectRatio="xMidYMax slice"
      aria-hidden="true"
    >
      {cells.map(([x, y]) => (
        <rect
          key={`${x}-${y}`}
          x={x * CELL}
          y={y * CELL}
          width={CELL}
          height={CELL}
        />
      ))}
    </svg>
  );
}

const GLYPHS: Record<"0" | "1", string[]> = {
  "0": ["111", "101", "101", "101", "111"],
  "1": ["010", "110", "010", "010", "111"],
};

/** Full-bleed background: orthogonal circuit traces and floating bits. */
export function CircuitField() {
  const W = 1440;
  const H = 640;
  const G = 16;
  const next = random(42);
  const traces = Array.from({ length: 18 }, (_, i) => {
    const x0 = pick(next, 1, W / G - 2) * G;
    const up1 = pick(next, 4, 12) * G;
    const side = (next() < 0.5 ? -1 : 1) * pick(next, 3, 10) * G;
    const up2 = pick(next, 2, 7) * G;
    const x1 = Math.min(W - G, Math.max(G, x0 + side));
    const y1 = H - up1;
    const y2 = y1 - up2;
    return {
      d: `M${x0} ${H} V${y1} H${x1} V${y2}`,
      pad: [x1, y2] as const,
      pulse: i % 3 === 0,
      delay: (i * 0.7) % 6,
    };
  });
  const bits = Array.from({ length: 16 }, (_, i) => ({
    glyph: (next() < 0.5 ? "0" : "1") as "0" | "1",
    x: pick(next, 2, W / G - 4) * G,
    y: pick(next, 4, H / G - 8) * G,
    delay: (i * 0.9) % 9,
  }));
  return (
    <svg
      className="circuit-field"
      viewBox={`0 0 ${W} ${H}`}
      preserveAspectRatio="xMidYMax slice"
      aria-hidden="true"
    >
      {traces.map(({ d, pad, pulse, delay }) => (
        <g key={d}>
          <path className="trace" d={d} />
          <rect
            className="trace-pad"
            x={pad[0] - 4}
            y={pad[1] - 4}
            width={8}
            height={8}
          />
          {pulse && (
            <path
              className="trace-pulse"
              d={d}
              pathLength={100}
              style={{ animationDelay: `${delay}s` }}
            />
          )}
        </g>
      ))}
      {bits.map(({ glyph, x, y, delay }, i) => (
        <g
          key={i}
          className="bit"
          transform={`translate(${x} ${y})`}
          style={{ animationDelay: `${delay}s` }}
        >
          {GLYPHS[glyph].flatMap((row, ry) =>
            [...row].map((cell, rx) =>
              cell === "1" ? (
                <rect
                  key={`${rx}-${ry}`}
                  x={rx * 4}
                  y={ry * 4}
                  width={4}
                  height={4}
                />
              ) : null,
            ),
          )}
        </g>
      ))}
    </svg>
  );
}

/* ---------- Foreground scene (one pixel = one viewBox unit) ---------- */

type Cell = { x: number; y: number; w?: number; h?: number; c: string };

function chip(ox: number, oy: number): Cell[] {
  const cells: Cell[] = [];
  const pins = [5, 8, 11, 14, 17];
  for (const p of pins) {
    cells.push({ x: ox, y: oy + p, w: 3, h: 1, c: "chip-pin" });
    cells.push({ x: ox + 21, y: oy + p, w: 3, h: 1, c: "chip-pin" });
    cells.push({ x: ox + p, y: oy, w: 1, h: 3, c: "chip-pin" });
    cells.push({ x: ox + p, y: oy + 21, w: 1, h: 3, c: "chip-pin" });
  }
  cells.push({ x: ox + 3, y: oy + 3, w: 18, h: 18, c: "chip-edge" });
  cells.push({ x: ox + 4, y: oy + 4, w: 16, h: 16, c: "chip-body" });
  cells.push({ x: ox + 7, y: oy + 7, w: 10, h: 10, c: "chip-die" });
  cells.push({ x: ox + 9, y: oy + 9, w: 6, h: 6, c: "chip-core" });
  cells.push({ x: ox + 5, y: oy + 5, w: 1, h: 1, c: "chip-mark" });
  return cells;
}

/** Abstract code: [indent, [length, token class][]] per line. */
const CODE: [number, [number, string][]][] = [
  [0, [[5, "t-key"], [7, "t-fn"], [3, "t-punct"]]],
  [2, [[4, "t-key"], [6, "t-id"], [9, "t-str"]]],
  [2, [[15, "t-com"]]],
  [2, [[3, "t-key"], [5, "t-id"], [2, "t-punct"], [6, "t-fn"]]],
  [4, [[6, "t-id"], [10, "t-str"]]],
  [2, [[6, "t-key"], [8, "t-id"]]],
  [0, [[1, "t-punct"]]],
];

function terminal(ox: number, oy: number): Cell[] {
  const W = 44;
  const H = 33;
  const cells: Cell[] = [
    { x: ox, y: oy, w: W, h: H, c: "term-edge" },
    { x: ox + 1, y: oy + 1, w: W - 2, h: H - 2, c: "term-bg" },
    { x: ox + 1, y: oy + 1, w: W - 2, h: 3, c: "term-bar" },
    { x: ox + 3, y: oy + 2, c: "dot-red" },
    { x: ox + 5, y: oy + 2, c: "dot-amber" },
    { x: ox + 7, y: oy + 2, c: "dot-green" },
  ];
  CODE.forEach(([indent, tokens], line) => {
    let x = ox + 4 + indent;
    const y = oy + 6 + line * 3;
    cells.push({ x: ox + 2, y, c: "t-gutter" });
    for (const [length, token] of tokens) {
      cells.push({ x, y, w: length, h: 1, c: token });
      x += length + 1;
    }
  });
  // Prompt and blinking block cursor on the last line.
  const py = oy + 6 + CODE.length * 3;
  cells.push({ x: ox + 4, y: py, w: 1, h: 1, c: "t-prompt" });
  cells.push({ x: ox + 5, y: py + 1, w: 1, h: 1, c: "t-prompt" });
  cells.push({ x: ox + 4, y: py + 2, w: 1, h: 1, c: "t-prompt" });
  cells.push({ x: ox + 7, y: py, w: 2, h: 3, c: "t-cursor" });
  return cells;
}

const POINTER = [
  "B...........",
  "BB..........",
  "BWB.........",
  "BWWB........",
  "BWWWB.......",
  "BWWWWB......",
  "BWWWWWB.....",
  "BWWWWWWB....",
  "BWWWWWWWB...",
  "BWWWWWWWWB..",
  "BWWWWWBBBBB.",
  "BWWBWWB.....",
  "BWB.BWWB....",
  "BB..BWWB....",
  "B....BWWB...",
  ".....BWWB...",
  "......BB....",
];

/** Bus from three chip pins down to the terminal's title bar. */
const BUS = [
  "M55.5 26 V30.5 H12.5 V38",
  "M58.5 26 V32.5 H18.5 V38",
  "M61.5 26 V34.5 H24.5 V38",
];

export function ComputeScene() {
  const cells = [...terminal(4, 38), ...chip(50, 2)];
  return (
    <svg
      className="compute-scene"
      viewBox="0 0 80 74"
      shapeRendering="crispEdges"
      aria-hidden="true"
    >
      {BUS.map((d, i) => (
        <g key={d}>
          <path className="bus" d={d} />
          <path
            className="bus-pulse"
            d={d}
            pathLength={100}
            style={{ animationDelay: `${i * 0.6}s` }}
          />
        </g>
      ))}
      {cells.map(({ x, y, w = 1, h = 1, c }, i) => (
        <rect key={i} className={c} x={x} y={y} width={w} height={h} />
      ))}
      <g className="pointer">
        {POINTER.flatMap((row, y) =>
          [...row].map((cell, x) =>
            cell === "." ? null : (
              <rect
                key={`${x}-${y}`}
                className={cell === "B" ? "ptr-edge" : "ptr-fill"}
                x={41 + x}
                y={54 + y}
                width={1}
                height={1}
              />
            ),
          ),
        )}
      </g>
    </svg>
  );
}
