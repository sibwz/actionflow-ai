import { FileText, ListTodo, Clock, Users, ShieldAlert, Download, Sparkles } from 'lucide-react'

const FEATURES = [
  {
    icon: FileText,
    title: 'Summarize',
    description:
      'Distills hours of conversation into a sharp executive brief — the key context, nothing else.',
    isNew: false,
  },
  {
    icon: ListTodo,
    title: 'Extract Tasks',
    description:
      'Surfaces every action item with full context, so nothing said in the room gets forgotten.',
    isNew: false,
  },
  {
    icon: Clock,
    title: 'Detect Deadlines',
    description:
      'Identifies dates, timeframes, and urgency signals embedded in natural, unstructured language.',
    isNew: false,
  },
  {
    icon: Users,
    title: 'Assign Owners',
    description:
      'Maps each task to the person who committed to it, creating accountability from the conversation.',
    isNew: false,
  },
  {
    icon: ShieldAlert,
    title: 'Identify Risks',
    description:
      'Surfaces blockers, dependencies, and flags that would otherwise get buried in the transcript.',
    isNew: false,
  },
  {
    icon: Download,
    title: 'Export Reports',
    description:
      'Structured output ready to drop into Notion, Linear, Jira, or any workflow tool.',
    isNew: false,
  },
]

export default function FeatureGrid() {
  return (
    <section className="px-6 pb-24">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <p
            className="text-xs font-semibold uppercase tracking-[0.12em] mb-3"
            style={{ color: '#8B5CF6' }}
          >
            What We Extract
          </p>
          <h2
            className="font-bold tracking-tight"
            style={{
              fontSize: 'clamp(22px, 3vw, 34px)',
              color: '#FAFAFA',
              letterSpacing: '-0.02em',
            }}
          >
            Every signal from your conversation
          </h2>
          <p className="mt-3 text-sm" style={{ color: '#71717A', maxWidth: '420px', margin: '12px auto 0' }}>
            ActionFlow processes your transcript across seven intelligence dimensions simultaneously.
          </p>
        </div>

        {/* 3-column grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
          {FEATURES.map((f) => {
            const Icon = f.icon
            return (
              <div
                key={f.title}
                className="relative flex flex-col gap-4 p-6 rounded-2xl cursor-default"
                style={{
                  background: '#18181B',
                  border: '1px solid rgba(255,255,255,0.06)',
                  minHeight: '190px',
                  transition: 'transform 300ms ease-out, border-color 300ms ease-out, box-shadow 300ms ease-out',
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget
                  el.style.transform = 'translateY(-4px)'
                  el.style.borderColor = 'rgba(139,92,246,0.45)'
                  el.style.boxShadow =
                    '0 20px 56px rgba(0,0,0,0.45), 0 0 0 1px rgba(139,92,246,0.14), 0 0 24px rgba(139,92,246,0.1)'
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget
                  el.style.transform = 'translateY(0)'
                  el.style.borderColor = 'rgba(255,255,255,0.06)'
                  el.style.boxShadow = 'none'
                }}
              >
                {/* Icon */}
                <div
                  className="flex items-center justify-center w-14 h-14 rounded-xl shrink-0"
                  style={{
                    background: 'rgba(139,92,246,0.12)',
                    border: '1px solid rgba(139,92,246,0.2)',
                  }}
                >
                  <Icon size={26} color="#8B5CF6" />
                </div>

                {/* Text */}
                <div>
                  <h3
                    className="font-semibold text-sm mb-1.5"
                    style={{ color: '#FAFAFA' }}
                  >
                    {f.title}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: '#71717A' }}>
                    {f.description}
                  </p>
                </div>
              </div>
            )
          })}
        </div>

        {/* Featured AI Suggestions card — full width */}
        <div
          className="relative flex flex-col sm:flex-row gap-6 p-7 rounded-2xl cursor-default"
          style={{
            background: 'linear-gradient(135deg, rgba(139,92,246,0.08) 0%, rgba(6,182,212,0.05) 100%)',
            border: '1px solid rgba(139,92,246,0.22)',
            transition: 'transform 300ms ease-out, border-color 300ms ease-out, box-shadow 300ms ease-out',
          }}
          onMouseEnter={(e) => {
            const el = e.currentTarget
            el.style.transform = 'translateY(-4px)'
            el.style.borderColor = 'rgba(139,92,246,0.5)'
            el.style.boxShadow =
              '0 20px 56px rgba(0,0,0,0.45), 0 0 32px rgba(139,92,246,0.12)'
          }}
          onMouseLeave={(e) => {
            const el = e.currentTarget
            el.style.transform = 'translateY(0)'
            el.style.borderColor = 'rgba(139,92,246,0.22)'
            el.style.boxShadow = 'none'
          }}
        >
          {/* NEW badge */}
          <span
            className="absolute top-4 right-4 px-2 py-0.5 rounded-full text-[10px] font-bold tracking-wide"
            style={{
              background: 'rgba(139,92,246,0.2)',
              border: '1px solid rgba(139,92,246,0.4)',
              color: '#A78BFA',
            }}
          >
            NEW
          </span>

          {/* Icon */}
          <div
            className="flex items-center justify-center w-14 h-14 rounded-xl shrink-0 self-start"
            style={{
              background: 'rgba(139,92,246,0.15)',
              border: '1px solid rgba(139,92,246,0.28)',
            }}
          >
            <Sparkles size={26} color="#A78BFA" />
          </div>

          {/* Text */}
          <div className="flex-1">
            <h3
              className="font-semibold text-base mb-2"
              style={{ color: '#FAFAFA', letterSpacing: '-0.01em' }}
            >
              AI Suggestions
            </h3>
            <p className="text-sm leading-relaxed" style={{ color: '#A1A1AA' }}>
              Goes beyond extraction — ActionFlow surfaces proactive recommendations: what to do next,
              how to de-risk blockers, and where your plan has gaps. Trained to think like a seasoned
              project lead reviewing your session.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
