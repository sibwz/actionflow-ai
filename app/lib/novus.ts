type QueueEntry = [string, Record<string, unknown>]
const _preInitQueue: QueueEntry[] = []

function flushQueue(): boolean {
  if (typeof window === 'undefined') return false
  const pendo = (window as any).pendo // eslint-disable-line @typescript-eslint/no-explicit-any
  if (!pendo) return false
  let entry: QueueEntry | undefined
  while ((entry = _preInitQueue.shift())) {
    pendo.track(entry[0], entry[1])
  }
  return true
}

export function trackNovus(eventName: string, metadata?: Record<string, unknown>) {
  if (typeof window === 'undefined') return
  const meta = metadata || {}
  const pendo = (window as any).pendo // eslint-disable-line @typescript-eslint/no-explicit-any
  if (pendo) {
    flushQueue()
    pendo.track(eventName, meta)
  } else {
    _preInitQueue.push([eventName, meta])
    // start a one-time poller only when the first event is queued
    if (_preInitQueue.length === 1) {
      const iv = setInterval(() => {
        if (flushQueue()) clearInterval(iv)
      }, 50)
    }
  }
}
