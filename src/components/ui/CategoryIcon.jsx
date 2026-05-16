export default function CategoryIcon({ id, size = 24, className, style }) {
  const base = {
    width: size, height: size,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: '2',
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    className,
    style,
  };

  if (id === 'masala-powders') return (
    <svg {...base}>
      <path d="M8.5 14.5A2.5 2.5 0 0011 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 01-7 7 7 7 0 01-7-7c0-2.5 1.5-4.5 3-6"/>
    </svg>
  );
  if (id === 'premix') return (
    <svg {...base}>
      <polygon points="12 2 2 7 12 12 22 7 12 2"/>
      <polyline points="2 17 12 22 22 17"/>
      <polyline points="2 12 12 17 22 12"/>
    </svg>
  );
  if (id === 'instant-use') return (
    <svg {...base}>
      <path d="M17 8h1a4 4 0 010 8h-1"/>
      <path d="M3 8h14v9a4 4 0 01-4 4H7a4 4 0 01-4-4z"/>
      <line x1="6" y1="2" x2="6" y2="4"/>
      <line x1="10" y1="2" x2="10" y2="4"/>
      <line x1="14" y1="2" x2="14" y2="4"/>
    </svg>
  );
  return null;
}
