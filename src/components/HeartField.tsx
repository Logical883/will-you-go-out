const HEARTS = Array.from({ length: 12 }, (_, i) => ({
  id: i,
  left: `${(i * 17 + 7) % 100}%`,
  delay: `${(i * 0.7) % 8}s`,
  duration: `${10 + (i % 6)}s`,
  size: 10 + (i % 7) * 4,
  opacity: 0.25 + (i % 5) * 0.1,
}))

export function HeartField() {
  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden" aria-hidden>
      {HEARTS.map((heart) => (
        <span
          key={heart.id}
          className="heart-particle absolute bottom-[-40px] text-rose-500"
          style={{
            left: heart.left,
            animationDelay: heart.delay,
            animationDuration: heart.duration,
            fontSize: heart.size,
            opacity: heart.opacity,
          }}
        >
          ♥
        </span>
      ))}
    </div>
  )
}
