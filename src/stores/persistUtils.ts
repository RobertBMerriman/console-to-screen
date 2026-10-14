/**
 * Helpers for repairing persisted state when a store rehydrates.
 *
 * Tags are foreign keys into console/screen data that lives in code, so a tag
 * removed or renamed in a release leaves a dangling key in every existing
 * user's localStorage. That key resolves to undefined and throws on first
 * render, and because it is persisted it throws again on every later visit.
 */

/** Keep only tags that still exist in the data, preserving order and deduping. */
export function sanitiseTags<T extends string>(
  value: unknown,
  known: Record<T, unknown>,
): T[] | undefined {
  if (!Array.isArray(value)) return undefined

  const seen = new Set<string>()
  const tags: T[] = []

  for (const tag of value) {
    if (typeof tag !== 'string' || seen.has(tag)) continue
    if (!Object.prototype.hasOwnProperty.call(known, tag)) continue

    seen.add(tag)
    tags.push(tag as T)
  }

  return tags
}

/** Keep a value only if it is still one of the allowed options. */
export function sanitiseOneOf<T extends string>(
  value: unknown,
  options: readonly T[],
): T | undefined {
  if (typeof value !== 'string') return undefined

  return (options as readonly string[]).includes(value) ? (value as T) : undefined
}

/**
 * Keep only keys that still exist in the defaults, and only where the type
 * still matches. Persist merges shallowly, so a field added since the user last
 * visited already falls back to its default. What it does not do is drop a
 * removed key, or repair one whose type changed.
 */
export function sanitiseByDefaults<S extends object>(value: unknown, defaults: S): Partial<S> {
  if (!value || typeof value !== 'object') return {}

  const persisted = value as Record<string, unknown>
  const clean: Record<string, unknown> = {}

  for (const [key, fallback] of Object.entries(defaults)) {
    const incoming = persisted[key]

    if (incoming === undefined) continue
    if (typeof incoming !== typeof fallback) continue
    if (typeof incoming === 'number' && !Number.isFinite(incoming)) continue

    clean[key] = incoming
  }

  return clean as Partial<S>
}
