import type { TimelineItem } from '../data/samples'

interface TimelineProps {
  items: TimelineItem[]
}

export default function Timeline({ items }: TimelineProps) {
  return (
    <div className="relative pl-2">
      {/* Vertical connector line */}
      <div
        aria-hidden
        className="absolute left-5 top-5 bottom-5"
        style={{
          width: '2px',
          background: 'linear-gradient(to bottom, #8B5CF6 0%, rgba(139,92,246,0.08) 100%)',
        }}
      />

      <div className="flex flex-col gap-1">
        {items.map((item, i) => (
          <div key={i} className="relative flex gap-5 pb-7 last:pb-0">
            {/* Node */}
            <div className="relative z-10 shrink-0 mt-0.5">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold"
                style={
                  i === 0
                    ? {
                        background: 'linear-gradient(135deg, #8B5CF6, #7C3AED)',
                        border: '2px solid #8B5CF6',
                        color: '#FFFFFF',
                        boxShadow: '0 0 18px rgba(139,92,246,0.5)',
                      }
                    : {
                        background: 'rgba(139,92,246,0.12)',
                        border: '2px solid rgba(139,92,246,0.28)',
                        color: '#A78BFA',
                      }
                }
              >
                {i + 1}
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0 pt-1">
              {/* Date / day label */}
              <div className="flex items-baseline gap-2 mb-2.5">
                <span
                  className="text-sm font-semibold"
                  style={{ color: '#FAFAFA', letterSpacing: '-0.01em' }}
                >
                  {item.date}
                </span>
                {item.day !== item.date && (
                  <span className="text-[11px]" style={{ color: '#52525B' }}>
                    {item.day}
                  </span>
                )}
              </div>

              {/* Event pills */}
              <div className="flex flex-col gap-1.5">
                {item.events.map((ev, j) => (
                  <div
                    key={j}
                    className="flex items-start gap-2.5 text-sm rounded-xl px-3.5 py-2.5"
                    style={{
                      background: 'rgba(9,9,11,0.55)',
                      border: '1px solid rgba(255,255,255,0.04)',
                      color: '#A1A1AA',
                      lineHeight: '1.5',
                    }}
                  >
                    <span
                      className="w-1 h-1 rounded-full shrink-0 mt-[7px]"
                      style={{ background: '#8B5CF6' }}
                    />
                    {ev}
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
