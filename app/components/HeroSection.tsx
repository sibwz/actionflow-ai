'use client'

import { ArrowRight, ChevronRight } from 'lucide-react'

interface HeroSectionProps {
  onTrySample: () => void
  onSeeExample: () => void
}

export default function HeroSection({ onTrySample, onSeeExample }: HeroSectionProps) {
  return (
    <section className="relative flex flex-col items-center text-center px-6 pt-44 pb-28">
      {/* Top-right radial glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute top-0 right-0 w-[700px] h-[600px]"
        style={{
          background:
            'radial-gradient(ellipse at top right, rgba(139,92,246,0.22) 0%, transparent 65%)',
        }}
      />
      {/* Centre diffuse glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute top-10 left-1/2 -translate-x-1/2 w-[900px] h-[450px]"
        style={{
          background:
            'radial-gradient(ellipse, rgba(139,92,246,0.07) 0%, transparent 60%)',
        }}
      />

      <div className="relative z-10 flex flex-col items-center" style={{ maxWidth: '800px' }}>
        {/* Eyebrow chip */}
        <div
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold mb-8"
          style={{
            background: 'rgba(139,92,246,0.1)',
            border: '1px solid rgba(139,92,246,0.28)',
            color: '#A78BFA',
          }}
        >
          <span
            className="w-1.5 h-1.5 rounded-full shrink-0"
            style={{ background: '#22C55E', boxShadow: '0 0 6px rgba(34,197,94,0.7)' }}
          />
          ✨ AI Execution Assistant
          <ChevronRight size={11} style={{ opacity: 0.7 }} />
        </div>

        {/* Main heading */}
        <h1
          className="font-bold leading-[1.08] tracking-tight mb-5"
          style={{
            fontSize: 'clamp(40px, 7vw, 64px)',
            color: '#FAFAFA',
            letterSpacing: '-0.03em',
          }}
        >
          ActionFlow AI
        </h1>

        {/* Tagline */}
        <p
          className="font-semibold mb-5"
          style={{
            fontSize: 'clamp(17px, 2.4vw, 22px)',
            color: '#8B5CF6',
            letterSpacing: '-0.01em',
          }}
        >
          From Conversation to Execution
        </p>

        {/* Description */}
        <p
          className="leading-relaxed mb-10 mx-auto"
          style={{
            maxWidth: '580px',
            fontSize: '15px',
            color: '#A1A1AA',
            lineHeight: '1.8',
          }}
        >
          Turn chaotic meetings, lectures, and brainstorming sessions into execution-ready plans
          with owners, deadlines, risks, and AI recommendations.
        </p>

        {/* CTA row */}
        <div className="flex flex-col sm:flex-row gap-3 items-center justify-center">
          {/* Primary CTA */}
          <button
            onClick={onTrySample}
            className="group inline-flex items-center gap-2.5 px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-300"
            style={{
              background: 'linear-gradient(135deg, #8B5CF6 0%, #7C3AED 100%)',
              color: '#FFFFFF',
              boxShadow: '0 0 28px rgba(139,92,246,0.38), inset 0 1px 0 rgba(255,255,255,0.1)',
              border: '1px solid rgba(167,139,250,0.4)',
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget
              el.style.background = 'linear-gradient(135deg, #A78BFA 0%, #8B5CF6 100%)'
              el.style.boxShadow = '0 0 40px rgba(139,92,246,0.55), inset 0 1px 0 rgba(255,255,255,0.12)'
              el.style.transform = 'scale(1.02)'
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget
              el.style.background = 'linear-gradient(135deg, #8B5CF6 0%, #7C3AED 100%)'
              el.style.boxShadow = '0 0 28px rgba(139,92,246,0.38), inset 0 1px 0 rgba(255,255,255,0.1)'
              el.style.transform = 'scale(1)'
            }}
          >
            Try Sample Transcript
            <ArrowRight size={15} />
          </button>

          {/* Secondary CTA */}
          <button
            onClick={onSeeExample}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-300"
            style={{
              background: 'rgba(255,255,255,0.04)',
              color: '#D1D5DB',
              border: '1px solid rgba(255,255,255,0.1)',
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget
              el.style.background = 'rgba(139,92,246,0.1)'
              el.style.borderColor = 'rgba(139,92,246,0.35)'
              el.style.color = '#A78BFA'
              el.style.transform = 'scale(1.02)'
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget
              el.style.background = 'rgba(255,255,255,0.04)'
              el.style.borderColor = 'rgba(255,255,255,0.1)'
              el.style.color = '#D1D5DB'
              el.style.transform = 'scale(1)'
            }}
          >
            See Example Output
            <ChevronRight size={14} />
          </button>
        </div>

        {/* Social proof pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
          {[
            { emoji: '⚡', label: 'Students' },
            { emoji: '🚀', label: 'Startup Teams' },
            { emoji: '🏆', label: 'Hackathon Builders' },
          ].map(({ emoji, label }) => (
            <span
              key={label}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium"
              style={{
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.08)',
                color: '#71717A',
              }}
            >
              {emoji} {label}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
