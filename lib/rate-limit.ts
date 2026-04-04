type Entry = { count: number; windowStart: number };

const buckets = new Map<string, Entry>();

/**
 * Fixed-window counter (in-memory). Suitable for single-node or low volume.
 * For multi-region serverless, use Redis/Upstash or similar.
 */
export function rateLimitCheck(
  key: string,
  max: number,
  windowMs: number
): { ok: true } | { ok: false; retryAfterMs: number } {
  const now = Date.now();
  let e = buckets.get(key);
  if (!e || now - e.windowStart >= windowMs) {
    buckets.set(key, { count: 1, windowStart: now });
    return { ok: true };
  }
  if (e.count >= max) {
    return { ok: false, retryAfterMs: e.windowStart + windowMs - now };
  }
  e.count += 1;
  return { ok: true };
}

export function getClientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    const first = forwarded.split(",")[0]?.trim();
    if (first) return first;
  }
  return request.headers.get("x-real-ip")?.trim() ?? "unknown";
}
