import type React from 'react'
import { FileText, CheckSquare, ShieldAlert, CalendarDays, ArrowRight } from 'lucide-react'

const PREVIEW_SUMMARY =
  'The team aligned on launching the new onboarding flow Monday with a CDN fix and A/B test rollout. Three enterprise clients are hitting API rate limits — a temp fix ships today. Board demo confirmed for Wednesday 2 PM.'

const PREVIEW_TASKS = [
  { id: 'T-001', title: 'Apply temporary API rate limit increase', owner: 'Marcus', deadline: 'Today', priority: 'High' },
  { id: 'T-002', title: 'Book QA conference room & send invites', owner: 'Jennifer', deadline: 'Today', priority: 'High' },
  { id: 'T-003', title: 'Ship A/B Variant B to 100% production', owner: 'Marcus', deadline: 'Monday', priority: 'High' },
]

const PREVIEW_RISKS = [
  'No load testing on new onboarding before Monday rollout',
  'API rate limiting actively affecting 3 enterprise clients',
]

const PREVIEW_TIMELINE = [
  { date: 'Today', events: ['API rate limit fix', 'QA booking'] },
  { date: 'Friday', events: ['CDN update', 'QA session'] },
  { date: 'Monday', events: ['Full rollout'] },
  { date: 'Wednesday', events: ['Board demo 2 PM'] },
]

const PRIORITY_COLORS: Record<string, React.CSSProperties> = {
  High: { backgroundColor: 'rgba(239,68,68,0.12)', color: '#F87171' },
  Medium: { backgroundColor: 'rgba(245,158,11,0.12)', color: '#FCD34D' },
  Low: { backgroundColor: 'rgba(34,197,94,0.12)', color: '#4ADE80' },
}

export default function ResultsPreview() {
  return (
    <section className="px-6 pb-28">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <p
            className="text-xs font-semibold uppercase tracking-[0.12em] mb-3"
            style={{ color: '#06B6D4' }}
          >
            Output Preview
          </p>
          <h2
            className="font-bold tracking-tight"
            style={{
              fontSize: 'clamp(22px, 3vw, 34px)',
              color: '#FAFAFA',
              letterSpacing: '-0.02em',
            }}
          >
            What you get in seconds
          </h2>
          <p className="mt-3 text-sm" style={{ color: '#71717A', maxWidth: '420px', margin: '12px auto 0' }}>
            Every transcript becomes a structured execution plan — no manual effort required.
          </p>
        </div>

        {/* Preview cards grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
          {/* Summary card */}
          <PreviewCard
            icon={<FileText size={15} color="#8B5CF6" />}
            iconStyle={{ background: 'rgba(139,92,246,0.14)', border: '1px solid rgba(139,92,246,0.24)' }}
            label="Summary"
            className="lg:col-span-2"
          >
            <p className="text-sm leading-relaxed" style={{ color: '#A1A1AA', lineHeight: '1.8' }}>
              {PREVIEW_SUMMARY}
            </p>
            <div className="flex items-center gap-4 mt-4 pt-4" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
              {[['9', 'Tasks'], ['4', 'Decisions'], ['4', 'Risks']].map(([n, label]) => (
                <div key={label}>
                  <span className="text-xl font-bold" style={{ color: '#FAFAFA' }}>{n}</span>
                  <span className="text-xs ml-1.5" style={{ color: '#52525B' }}>{label}</span>
                </div>
              ))}
            </div>
          </PreviewCard>

          {/* Tasks card */}
          <PreviewCard
            icon={<CheckSquare size={15} color="#22C55E" />}
            iconStyle={{ background: 'rgba(34,197,94,0.14)', border: '1px solid rgba(34,197,94,0.24)' }}
            label="Action Items"
          >
            <div className="flex flex-col gap-2.5">
              {PREVIEW_TASKS.map((t) => (
                <div
                  key={t.id}
                  className="flex items-center justify-between gap-3 px-3 py-2.5 rounded-xl"
                  style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)' }}
                >
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium truncate" style={{ color: '#E4E4E7' }}>{t.title}</p>
                    <p className="text-[11px] mt-0.5" style={{ color: '#52525B' }}>
                      {t.owner} · {t.deadline}
                    </p>
                  </div>
                  <span
                    className="shrink-0 text-[10px] font-bold px-2 py-0.5 rounded-full"
                    style={PRIORITY_COLORS[t.priority]}
                  >
                    {t.priority}
                  </span>
                </div>
              ))}
            </div>
          </PreviewCard>

          {/* Risk card */}
          <PreviewCard
            icon={<ShieldAlert size={15} color="#EF4444" />}
            iconStyle={{ background: 'rgba(239,68,68,0.14)', border: '1px solid rgba(239,68,68,0.24)' }}
            label="Risks & Blockers"
          >
            <ul className="flex flex-col gap-3">
              {PREVIEW_RISKS.map((r, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span
                    className="w-1.5 h-1.5 rounded-full shrink-0 mt-[6px]"
                    style={{ background: '#EF4444', boxShadow: '0 0 6px rgba(239,68,68,0.5)' }}
                  />
                  <span className="text-sm leading-relaxed" style={{ color: '#A1A1AA' }}>{r}</span>
                </li>
              ))}
            </ul>
          </PreviewCard>
        </div>

        {/* Timeline card */}
        <PreviewCard
          icon={<CalendarDays size={15} color="#06B6D4" />}
          iconStyle={{ background: 'rgba(6,182,212,0.14)', border: '1px solid rgba(6,182,212,0.24)' }}
          label="Execution Timeline"
        >
          <div className="flex flex-col sm:flex-row gap-0">
            {PREVIEW_TIMELINE.map((item, idx) => (
              <div key={item.date} className="flex sm:flex-col flex-1 items-start sm:items-center gap-3 sm:gap-2">
                {/* Connector line (horizontal on desktop) */}
                <div className="hidden sm:flex items-center w-full mb-1">
                  <div
                    className="w-3 h-3 rounded-full shrink-0"
                    style={{ background: '#06B6D4', boxShadow: '0 0 8px rgba(6,182,212,0.5)' }}
                  />
                  {idx < PREVIEW_TIMELINE.length - 1 && (
                    <div className="flex-1 h-px" style={{ background: 'rgba(6,182,212,0.2)' }} />
                  )}
                </div>
                {/* Mobile dot */}
                <div
                  className="sm:hidden w-2.5 h-2.5 rounded-full shrink-0 mt-1"
                  style={{ background: '#06B6D4' }}
                />
                <div className="sm:text-center pb-4 sm:pb-0">
                  <p className="text-xs font-bold mb-1" style={{ color: '#06B6D4' }}>{item.date}</p>
                  {item.events.map((ev) => (
                    <p key={ev} className="text-xs leading-relaxed" style={{ color: '#71717A' }}>{ev}</p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </PreviewCard>

        {/* CTA nudge */}
        <div className="text-center mt-10">
          <p className="text-sm" style={{ color: '#52525B' }}>
            Your transcript · Your results · In under 15 seconds
          </p>
          <div
            className="inline-flex items-center gap-1.5 mt-2 text-xs font-semibold"
            style={{ color: '#8B5CF6' }}
          >
            Scroll up to try it now <ArrowRight size={12} />
          </div>
        </div>
      </div>
    </section>
  )
}

function PreviewCard({
  icon,
  iconStyle,
  label,
  children,
  className = '',
}: {
  icon: React.ReactNode
  iconStyle: React.CSSProperties
  label: string
  children: React.ReactNode
  className?: string
}) {
  return (
    <div
      className={`rounded-2xl p-6 ${className}`}
      style={{
        background: '#18181B',
        border: '1px solid rgba(255,255,255,0.06)',
      }}
    >
      <div className="flex items-center gap-2.5 mb-4">
        <div
          className="flex items-center justify-center w-7 h-7 rounded-lg shrink-0"
          style={iconStyle}
        >
          {icon}
        </div>
        <span className="text-xs font-semibold uppercase tracking-wide" style={{ color: '#A1A1AA' }}>
          {label}
        </span>
      </div>
      {children}
    </div>
  )
}
