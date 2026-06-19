declare global {
  interface Window {
    pendo?: {
      initialize: (opts: object) => void
      track: (event: string, metadata?: Record<string, unknown>) => void
      _q: unknown[]
    }
  }
}

export function trackNovusEvent(
  eventName: string,
  metadata?: Record<string, unknown>,
): void {
  if (typeof window === 'undefined') return
  if (typeof window.pendo?.track !== 'function') return
  try {
    window.pendo.track(eventName, metadata ?? {})
  } catch {
    // never let tracking errors break the app
  }
}
