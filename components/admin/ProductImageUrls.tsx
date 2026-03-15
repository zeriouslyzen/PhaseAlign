"use client";

const inputClass =
  "w-full rounded-lg border border-[var(--border)] bg-[var(--bg-card)] px-3 py-2 text-sm text-[var(--fg)] placeholder:text-[var(--gray-400)] focus:border-[var(--ring)] focus:outline-none focus:ring-2 focus:ring-[var(--ring)]/20";
const btnClass =
  "rounded border border-[var(--border)] bg-[var(--bg-card)] px-3 py-2 text-sm text-[var(--fg)] hover:bg-[var(--gray-100)]";

export function ProductImageUrls({
  urls,
  onChange,
  placeholder = "https://...",
}: {
  urls: string[];
  onChange: (urls: string[]) => void;
  placeholder?: string;
}) {
  const update = (i: number, value: string) => {
    const next = [...urls];
    next[i] = value;
    onChange(next);
  };
  const add = () => onChange([...urls, ""]);
  const remove = (i: number) => onChange(urls.filter((_, j) => j !== i));

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-[var(--fg)]">Images</span>
        <button type="button" onClick={add} className={btnClass}>
          Add image
        </button>
      </div>
      {urls.length === 0 ? (
        <p className="text-xs text-[var(--gray-500)]">No images. Add one or use placeholder on save.</p>
      ) : (
        <ul className="space-y-2">
          {urls.map((url, i) => (
            <li key={i} className="flex gap-2">
              <input
                type="url"
                value={url}
                onChange={(e) => update(i, e.target.value)}
                placeholder={placeholder}
                className={inputClass}
              />
              <button
                type="button"
                onClick={() => remove(i)}
                className={btnClass}
                aria-label="Remove image"
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
