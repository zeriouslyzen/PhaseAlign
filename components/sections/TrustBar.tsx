const items = [
  "Lab-tested ingredients",
  "No banned substances",
  "Open-source where it matters",
  "Tracked fulfillment from wholesale partners",
];

export function TrustBar() {
  return (
    <section className="border-y border-[var(--border)] bg-[var(--bg-card)] px-4 py-6 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <ul className="flex flex-wrap justify-center gap-x-6 gap-y-3 text-xs sm:text-sm text-[var(--gray-600)]">
          {items.map((item, i) => (
            <li key={item} className="flex items-center gap-2">
              <span
                className="trust-bar-dot h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent)]"
                style={{ animationDelay: `${i * 0.35}s` }}
                aria-hidden
              />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
