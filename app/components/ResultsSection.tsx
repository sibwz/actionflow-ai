'use client'

import {
  FileText,
  CheckCircle2,
  ShieldAlert,
  HelpCircle,
  Lightbulb,
  CalendarDays,
  ListChecks,
  RotateCcw,
} from 'lucide-react'
import type { ActionPlanResult } from '../data/samples'
import ActionTable from './ActionTable'
import Timeline from './Timeline'

interface ResultsSectionProps {
  result: ActionPlanResult
  onReset: () => void
}

export default function ResultsSection({ result, onReset }: ResultsSectionProps) {
  const highCount = result.tasks.filter((t) => t.priority === 'High').length

  return (
    <section className="px-6 pb-24">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-3">
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
              style={{
                background: 'rgba(34,197,94,0.14)',
                border: '1px solid rgba(34,197,94,0.28)',
              }}
            >
              <CheckCircle2 size={17} color="#22C55E" />
            </div>
            <div>
              <h2
                className="font-bold text-lg"
                style={{ color: '#FAFAFA', letterSpacing: '-0.02em' }}
              >
                Action Plan Generated
              </h2>
              <p className="text-xs mt-0.5" style={{ color: '#71717A' }}>
                {result.tasks.length} tasks&nbsp;·&nbsp;{result.decisions.length}{' '}
                decisions&nbsp;·&nbsp;{result.risks.length} risks&nbsp;·&nbsp;
                <span style={{ color: '#F87171' }}>{highCount} high priority</span>
              </p>
            </div>
          </div>

          {/* New analysis button */}
          <button
            onClick={onReset}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-200 shrink-0"
            style={{
              background: 'rgba(255,255,255,0.04)',
              color: '#A1A1AA',
              border: '1px solid rgba(255,255,255,0.08)',
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget
              el.style.background = 'rgba(124,58,237,0.1)'
              el.style.borderColor = 'rgba(124,58,237,0.28)'
              el.style.color = '#A78BFA'
              el.style.transform = 'scale(1.02)'
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget
              el.style.background = 'rgba(255,255,255,0.04)'
              el.style.borderColor = 'rgba(255,255,255,0.08)'
              el.style.color = '#A1A1AA'
              el.style.transform = 'scale(1)'
            }}
          >
            <RotateCcw size={12} />
            New Analysis
          </button>
        </div>

        {/* ── Top row: Summary spans full width ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
          <ResultCard
            icon={<FileText size={15} color="#8B5CF6" />}
            iconStyle={{ background: 'rgba(124,58,237,0.14)', border: '1px solid rgba(124,58,237,0.24)' }}
            title="Executive Summary"
            className="lg:col-span-2"
          >
            <p className="text-sm leading-relaxed" style={{ color: '#A1A1AA', lineHeight: '1.8' }}>
              {result.summary}
            </p>
          </ResultCard>

          {/* Key Decisions */}
          <ResultCard
            icon={<CheckCircle2 size={15} color="#22C55E" />}
            iconStyle={{ background: 'rgba(16,185,129,0.14)', border: '1px solid rgba(16,185,129,0.24)' }}
            title="Key Decisions"
          >
            <ol className="flex flex-col gap-3">
              {result.decisions.map((d, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span
                    className="inline-flex items-center justify-center w-5 h-5 rounded text-[10px] font-bold shrink-0 mt-0.5"
                    style={{ background: 'rgba(16,185,129,0.14)', color: '#22C55E' }}
                  >
                    {i + 1}
                  </span>
                  <span className="text-sm leading-relaxed" style={{ color: '#A1A1AA' }}>
                    {d}
                  </span>
                </li>
              ))}
            </ol>
          </ResultCard>

          {/* Risks */}
          <ResultCard
            icon={<ShieldAlert size={15} color="#EF4444" />}
            iconStyle={{ background: 'rgba(239,68,68,0.14)', border: '1px solid rgba(239,68,68,0.24)' }}
            title="Risks & Blockers"
          >
            <ul className="flex flex-col gap-3">
              {result.risks.map((r, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span
                    className="w-1.5 h-1.5 rounded-full shrink-0 mt-[7px]"
                    style={{ background: '#EF4444', boxShadow: '0 0 6px rgba(239,68,68,0.5)' }}
                  />
                  <span className="text-sm leading-relaxed" style={{ color: '#A1A1AA' }}>
                    {r}
                  </span>
                </li>
              ))}
            </ul>
          </ResultCard>

          {/* Follow-up Questions */}
          <ResultCard
            icon={<HelpCircle size={15} color="#F59E0B" />}
            iconStyle={{ background: 'rgba(245,158,11,0.14)', border: '1px solid rgba(245,158,11,0.24)' }}
            title="Follow-up Questions"
          >
            <ul className="flex flex-col gap-3">
              {result.followUps.map((q, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span
                    className="text-xs font-bold shrink-0 mt-0.5 tabular-nums"
                    style={{ color: '#F59E0B', minWidth: '20px' }}
                  >
                    Q{i + 1}
                  </span>
                  <span className="text-sm leading-relaxed" style={{ color: '#A1A1AA' }}>
                    {q}
                  </span>
                </li>
              ))}
            </ul>
          </ResultCard>

          {/* AI Suggestions */}
          <ResultCard
            icon={<Lightbulb size={15} color="#8B5CF6" />}
            iconStyle={{ background: 'rgba(139,92,246,0.14)', border: '1px solid rgba(139,92,246,0.24)' }}
            title="AI Suggestions"
          >
            <ul className="flex flex-col gap-3">
              {result.suggestions.map((s, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span
                    className="inline-flex items-center justify-center w-5 h-5 rounded shrink-0 mt-0.5 text-xs font-bold"
                    style={{ background: 'rgba(139,92,246,0.14)', color: '#8B5CF6' }}
                  >
                    ↗
                  </span>
                  <span className="text-sm leading-relaxed" style={{ color: '#A1A1AA' }}>
                    {s}
                  </span>
                </li>
              ))}
            </ul>
          </ResultCard>
        </div>

        {/* ── Action Items Table ── */}
        <div className="mb-4">
          <ResultCard
            icon={<ListChecks size={15} color="#8B5CF6" />}
            iconStyle={{ background: 'rgba(124,58,237,0.14)', border: '1px solid rgba(124,58,237,0.24)' }}
            title="Action Items"
            subtitle={`${result.tasks.length} tasks with owners, priorities, and deadlines`}
          >
            <ActionTable tasks={result.tasks} />
          </ResultCard>
        </div>

        {/* ── Timeline ── */}
        <ResultCard
          icon={<CalendarDays size={15} color="#22C55E" />}
          iconStyle={{ background: 'rgba(16,185,129,0.14)', border: '1px solid rgba(16,185,129,0.24)' }}
          title="Execution Timeline"
          subtitle="Key milestones in chronological order"
        >
          <Timeline items={result.timeline} />
        </ResultCard>
      </div>
    </section>
  )
}

// ─── Shared card wrapper ─────────────────────────────────────────────────────

function ResultCard({
  icon,
  iconStyle,
  title,
  subtitle,
  children,
  className = '',
}: {
  icon: React.ReactNode
  iconStyle: React.CSSProperties
  title: string
  subtitle?: string
  children: React.ReactNode
  className?: string
}) {
  return (
    <div
      className={`rounded-3xl p-6 ${className}`}
      style={{
        background: '#18181B',
        border: '1px solid rgba(255,255,255,0.07)',
        boxShadow: '0 4px 24px rgba(0,0,0,0.2)',
        transition: 'transform 300ms ease-out, border-color 300ms ease-out, box-shadow 300ms ease-out',
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget
        el.style.transform = 'translateY(-2px)'
        el.style.borderColor = 'rgba(139,92,246,0.2)'
        el.style.boxShadow = '0 12px 40px rgba(0,0,0,0.32), 0 0 0 1px rgba(139,92,246,0.1)'
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget
        el.style.transform = 'translateY(0)'
        el.style.borderColor = 'rgba(255,255,255,0.07)'
        el.style.boxShadow = '0 4px 24px rgba(0,0,0,0.2)'
      }}
    >
      {/* Card header */}
      <div className="flex items-start gap-3 mb-5">
        <div
          className="flex items-center justify-center w-8 h-8 rounded-lg shrink-0"
          style={iconStyle}
        >
          {icon}
        </div>
        <div>
          <h3 className="font-semibold text-sm" style={{ color: '#FAFAFA' }}>
            {title}
          </h3>
          {subtitle && (
            <p className="text-xs mt-0.5" style={{ color: '#71717A' }}>
              {subtitle}
            </p>
          )}
        </div>
      </div>

      {children}
    </div>
  )
}
