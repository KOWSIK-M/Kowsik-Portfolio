import { useRef, useState } from "react";
import { RotateCcw } from "lucide-react";

const initial = {
  React: { x: 19, y: 27 },
  Java: { x: 82, y: 32 },
  Data: { x: 23, y: 78 },
};
const symbols = { React: "◈", Java: "☕", Data: "▥" };
const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

export default function DraggableWorld() {
  const [positions, setPositions] = useState(initial);
  const region = useRef(null);
  const dragging = useRef(null);

  const move = (name, clientX, clientY) => {
    const bounds = region.current?.getBoundingClientRect();
    if (!bounds) return;
    const x = clamp(((clientX - bounds.left) / bounds.width) * 100, 12, 88);
    const y = clamp(((clientY - bounds.top) / bounds.height) * 100, 16, 84);
    setPositions((previous) => ({ ...previous, [name]: { x, y } }));
  };

  return (
    <div className="world-main" ref={region}>
      <div className="orbit orbit-one" aria-hidden="true" />
      <div className="orbit orbit-two" aria-hidden="true" />
      <div className="world-core" aria-hidden="true">
        <span className="core-code">&lt;/&gt;</span>
        <span className="core-caption">IDEA → SYSTEM</span>
      </div>
      {Object.entries(positions).map(([name, point]) => (
        <button
          key={name}
          type="button"
          className="world-node draggable-node"
          style={{ left: `${point.x}%`, top: `${point.y}%` }}
          aria-label={`Move ${name} node. Drag or use arrow keys; Home resets it.`}
          onPointerDown={(event) => {
            dragging.current = name;
            event.currentTarget.setPointerCapture(event.pointerId);
            move(name, event.clientX, event.clientY);
          }}
          onPointerMove={(event) => {
            if (dragging.current === name)
              move(name, event.clientX, event.clientY);
          }}
          onPointerUp={() => {
            dragging.current = null;
          }}
          onPointerCancel={() => {
            dragging.current = null;
          }}
          onKeyDown={(event) => {
            if (event.key === "Home") {
              event.preventDefault();
              setPositions((previous) => ({
                ...previous,
                [name]: initial[name],
              }));
              return;
            }
            const offsets = {
              ArrowLeft: [-4, 0],
              ArrowRight: [4, 0],
              ArrowUp: [0, -4],
              ArrowDown: [0, 4],
            };
            if (!offsets[event.key]) return;
            event.preventDefault();
            const [dx, dy] = offsets[event.key];
            setPositions((previous) => ({
              ...previous,
              [name]: {
                x: clamp(previous[name].x + dx, 12, 88),
                y: clamp(previous[name].y + dy, 16, 84),
              },
            }));
          }}
        >
          <span aria-hidden="true">{symbols[name]}</span> {name}
        </button>
      ))}
      <span className="world-star star-one" aria-hidden="true">
        ✦
      </span>
      <span className="world-star star-two" aria-hidden="true">
        ✳
      </span>
      <span className="world-star star-three" aria-hidden="true">
        ✦
      </span>
      <span className="world-star star-four" aria-hidden="true">
        ✧
      </span>
      <button
        className="world-reset"
        type="button"
        onClick={() => setPositions(initial)}
        title="Reset draggable nodes"
        aria-label="Reset draggable nodes"
      >
        <RotateCcw size={14} />
      </button>
    </div>
  );
}
