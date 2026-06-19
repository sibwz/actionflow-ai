'use client'

import { Sparkles, Trash2 } from 'lucide-react'

interface WorkspaceSectionProps {
  transcript: string
  onTranscriptChange: (value: string) => void
  onLoadSample: (type: 'team' | 'lecture' | 'hackathon') => void
  onGenerate: () => void
  onClear: () => void
  isLoading: boolean
  workspaceRef: React.RefObject<HTMLDivElement | null>
}

const SAMPLE_CARDS = [
  {
    id: 'team' as const,
    emoji: '👥',
    title: 'Team Meeting',
    subtitle: 'Website Launch',
  },
  {
    id: 'lecture' as const,
    emoji: '🎓',
    title: 'University Lecture',
    subtitle: 'Assignment Planning',
  },
  {
    id: 'hackathon' as const,
    emoji: '🚀',
    title: 'Hackathon Planning',
    subtitle: 'AI Product Discussion',
  },
]

const PLACEHOLDER = `Ali: We need the website launch ready by Friday.

Sara: I'll handle the landing page design and have it done by Wednesday.

Ahmed: I'll set up the deployment pipeline and push to prod Thursday.

Ali: Great — let's do a full test run on Thursday morning then.`

export default function WorkspaceSection({
  transcript,
  onTranscriptChange,
  onLoadSample,
  onGenerate,
  onClear,
  isLoading,
  workspaceRef,
}: WorkspaceSectionProps) {
  const wordCount = transcript.trim() ? transcript.trim().split(/\s+/).length : 0
  const canGenerate = transcript.trim().length > 0 && !isLoading

  return (
    <section ref={workspaceRef} className="px-6 pb-24">
      <div className="max-w-4xl mx-auto">
        <div
          className="rounded-3xl p-7 md:p-10"
          style={{
            background: '#18181B',
            border: '1px solid rgba(255,255,255,0.08)',
            boxShadow: '0 40px 96px rgba(0,0,0,0.5)',
          }}
        >
          {/* Card header */}
          <div className="mb-7">
            <h2
              className="font-bold text-xl mb-1"
              style={{ color: '#FAFAFA', letterSpacing: '-0.02em' }}
            >
              Workspace
            </h2>
            <p className="text-sm" style={{ color: '#71717A' }}>
              Load a sample or paste your own transcript below
            </p>
          </div>

          {/* Sample cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
            {SAMPLE_CARDS.map((card) => (
              <button
                key={card.id}
                onClick={() => onLoadSample(card.id)}
                className="flex flex-col items-start gap-1.5 p-4 rounded-xl text-left transition-all duration-200"
                style={{
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.07)',
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget
                  el.style.background = 'rgba(139,92,246,0.08)'
                  el.style.borderColor = 'rgba(139,92,246,0.3)'
                  el.style.transform = 'translateY(-2px)'
                  el.style.boxShadow = '0 8px 24px rgba(139,92,246,0.12)'
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget
                  el.style.background = 'rgba(255,255,255,0.03)'
                  el.style.borderColor = 'rgba(255,255,255,0.07)'
                  el.style.transform = 'translateY(0)'
                  el.style.boxShadow = 'none'
                }}
              >
                <span className="text-xl leading-none">{card.emoji}</span>
                <span className="text-sm font-semibold" style={{ color: '#FAFAFA' }}>
                  {card.title}
                </span>
                <span className="text-xs" style={{ color: '#71717A' }}>
                  {card.subtitle}
                </span>
              </button>
            ))}
          </div>

          {/* Textarea label */}
          <label
            className="block text-xs font-semibold mb-2 tracking-wide"
            style={{ color: '#A1A1AA' }}
          >
            Paste Transcript
          </label>

          {/* Textarea */}
          <div className="relative mb-5">
            <textarea
              value={transcript}
              onChange={(e) => onTranscriptChange(e.target.value)}
              placeholder={PLACEHOLDER}
              className="w-full rounded-2xl px-5 py-4 text-sm leading-loose outline-none transition-all duration-200"
              style={{
                minHeight: '300px',
                background: 'rgba(255,255,255,0.05)',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
                border: '1px solid rgba(255,255,255,0.1)',
                color: '#E5E7EB',
                caretColor: '#8B5CF6',
                fontFamily: 'inherit',
                resize: 'vertical',
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = 'rgba(139,92,246,0.5)'
                e.currentTarget.style.boxShadow = '0 0 0 3px rgba(139,92,246,0.08)'
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'
                e.currentTarget.style.boxShadow = 'none'
              }}
            />

            {/* Word count */}
            {transcript && (
              <span
                className="absolute bottom-3.5 right-4 text-xs pointer-events-none"
                style={{ color: '#52525B' }}
              >
                {wordCount.toLocaleString()} words
              </span>
            )}
          </div>

          {/* Action row */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            {/* Clear */}
            <button
              onClick={onClear}
              disabled={!transcript || isLoading}
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 shrink-0 disabled:opacity-30 disabled:cursor-not-allowed"
              style={{
                background: 'rgba(255,255,255,0.04)',
                color: '#A1A1AA',
                border: '1px solid rgba(255,255,255,0.08)',
              }}
              onMouseEnter={(e) => {
                if (!(!transcript || isLoading)) {
                  const el = e.currentTarget
                  el.style.background = 'rgba(239,68,68,0.08)'
                  el.style.borderColor = 'rgba(239,68,68,0.28)'
                  el.style.color = '#F87171'
                }
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget
                el.style.background = 'rgba(255,255,255,0.04)'
                el.style.borderColor = 'rgba(255,255,255,0.08)'
                el.style.color = '#A1A1AA'
              }}
            >
              <Trash2 size={13} />
              Clear
            </button>

            {/* Generate */}
            <button
              onClick={onGenerate}
              disabled={!canGenerate}
              className="flex-1 inline-flex items-center justify-center gap-2.5 px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-200 disabled:cursor-not-allowed"
              style={{
                background: canGenerate
                  ? 'linear-gradient(135deg, #8B5CF6 0%, #7C3AED 100%)'
                  : 'rgba(139,92,246,0.18)',
                color: '#FFFFFF',
                border: '1px solid rgba(139,92,246,0.32)',
                boxShadow: canGenerate ? '0 0 28px rgba(139,92,246,0.4)' : 'none',
                opacity: canGenerate ? 1 : 0.5,
              }}
              onMouseEnter={(e) => {
                if (canGenerate) {
                  const el = e.currentTarget
                  el.style.transform = 'scale(1.02)'
                  el.style.boxShadow = '0 0 44px rgba(139,92,246,0.6)'
                }
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget
                el.style.transform = 'scale(1)'
                el.style.boxShadow = canGenerate ? '0 0 28px rgba(139,92,246,0.4)' : 'none'
              }}
            >
              <Sparkles size={15} />
              {isLoading ? 'Generating...' : '✨ Generate Execution Plan'}
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
