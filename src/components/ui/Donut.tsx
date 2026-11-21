/* Neumorphic donut: inset well, segmented ring, raised centre disc (Figma: Status donut) */
export function Donut({
  segments,
  size = 190,
  value,
  label,
}: {
  segments: { value: number; color: string }[];
  size?: number;
  value: string;
  label: string;
}) {
  const s = size / 190;
  const ring = 136.8 * s;
  const stroke = 23.8 * s;
  const r = (ring - stroke) / 2;
  const c = 2 * Math.PI * r;
  const total = segments.reduce((a, b) => a + b.value, 0);
  const gap = 1.5 * s;
  let offset = 0;

  return (
    <div className="relative shrink-0" style={{ width: size, height: size }}>
      <div
        className="absolute inset-0 rounded-full bg-ice"
        style={{ boxShadow: `${7 * s}px ${7 * s}px ${16 * s}px var(--shadow-drop), ${-7 * s}px ${-7 * s}px ${16 * s}px var(--shadow-highlight)` }}
      />
      <svg className="absolute" style={{ left: 26.6 * s, top: 26.6 * s }} width={ring} height={ring} viewBox={`0 0 ${ring} ${ring}`}>
        {segments.map((seg, i) => {
          const len = (seg.value / total) * c;
          const el = (
            <circle
              key={i}
              cx={ring / 2}
              cy={ring / 2}
              r={r}
              fill="none"
              stroke={seg.color}
              strokeWidth={stroke}
              strokeDasharray={`${Math.max(0, len - gap)} ${c}`}
              strokeDashoffset={-offset}
              transform={`rotate(-90 ${ring / 2} ${ring / 2})`}
            />
          );
          offset += len;
          return el;
        })}
      </svg>
      <div
        className="absolute rounded-full bg-ice shadow-neu-sm"
        style={{ left: 50.38 * s, top: 50.38 * s, width: 89.23 * s, height: 89.23 * s }}
      />
      <div className="absolute inset-0 flex flex-col items-center justify-center leading-normal">
        <span className="font-display font-semibold text-teal-900" style={{ fontSize: 30 * s }}>
          {value}
        </span>
        <span className="text-[12px] text-muted">{label}</span>
      </div>
    </div>
  );
}
