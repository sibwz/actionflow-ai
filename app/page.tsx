'use client'

import { useRef, useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import HeroSection from './components/HeroSection'
import FeatureGrid from './components/FeatureGrid'
import WorkspaceSection from './components/WorkspaceSection'
import LoadingState from './components/LoadingState'
import ResultsSection from './components/ResultsSection'
import ResultsPreview from './components/ResultsPreview'
import NovusStatus from './components/NovusStatus'
import { SAMPLES, type ActionPlanResult } from './data/samples'
import { trackNovus } from './lib/novus'

type AppState = 'idle' | 'loading' | 'results'

export default function Home() {
  const [transcript, setTranscript] = useState('')
  const [appState, setAppState] = useState<AppState>('idle')
  const [result, setResult] = useState<ActionPlanResult | null>(null)
  const [activeSample, setActiveSample] = useState<keyof typeof SAMPLES | null>(null)
  const [usedFallback, setUsedFallback] = useState(false)
  const [fallbackReason, setFallbackReason] = useState('')
  const [isSharedView, setIsSharedView] = useState(false)

  const workspaceRef = useRef<HTMLDivElement>(null)
  const resultsRef = useRef<HTMLDivElement>(null)

  /* ── Page view tracking ── */
  useEffect(() => {
    trackNovus('actionflow_page_view')
  }, [])

  /* ── Load shared plan from URL on mount ── */
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const sharedId = params.get('shared')
    if (!sharedId) return
    try {
      const raw = localStorage.getItem(sharedId)
      if (!raw) return
      const plan = JSON.parse(raw) as ActionPlanResult
      setResult(plan)
      setAppState('results')
      setIsSharedView(true)
      trackNovusEvent('shared_plan_viewed', {
        plan_id: sharedId,
        task_count: plan.tasks.length,
        risk_count: plan.risks.length,
        decision_count: plan.decisions.length,
      })
      setTimeout(() => resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 80)
    } catch {
      // invalid or missing data — silently ignore
    }
  }, [])

  /* ── helpers ── */

  function scrollTo(ref: React.RefObject<HTMLDivElement | null>, offset = 'center' as ScrollLogicalPosition) {
    ref.current?.scrollIntoView({ behavior: 'smooth', block: offset })
  }

  function loadSample(type: keyof typeof SAMPLES) {
    trackNovus('sample_loaded', { sample_type: type })
    setTranscript(SAMPLES[type].transcript)
    setActiveSample(type)
    setAppState('idle')
    setResult(null)
    setUsedFallback(false)
    setTimeout(() => scrollTo(workspaceRef, 'center'), 60)
  }

  function seeExample() {
    setTranscript(SAMPLES.team.transcript)
    setActiveSample('team')
    setResult(SAMPLES.team.result)
    setAppState('results')
    setUsedFallback(false)
    trackNovusEvent('example_output_viewed', { sample_type: 'team' })
    setTimeout(() => scrollTo(resultsRef, 'start'), 80)
  }

  async function generate() {
    if (!transcript.trim()) return
    setAppState('loading')
    setResult(null)
    setUsedFallback(false)
    setFallbackReason('')
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })

    try {
      const res = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ transcript }),
      })

      if (!res.ok) {
        const body = await res.json().catch(() => ({})) as { error?: string }
        // Use the server's clean message if provided; otherwise a generic fallback
        throw new Error(body.error ?? 'Live AI analysis is temporarily unavailable. Showing demo output.')
      }

      const data = await res.json() as ActionPlanResult
      setResult(data)
      setAppState('results')
      trackNovus('plan_generated_success', {
        task_count: data.tasks.length,
        used_fallback: false,
        decision_count: data.decisions.length,
        risk_count: data.risks.length,
        timeline_item_count: data.timeline.length,
        transcript_word_count: transcript.trim().split(/\s+/).length,
      })
    } catch (err) {
      // Graceful fallback — show mock data with a clean notice
      const fallback = activeSample ? SAMPLES[activeSample].result : SAMPLES.team.result
      setResult(fallback)
      setAppState('results')
      setUsedFallback(true)
      trackNovus('plan_generated_success', {
        task_count: fallback.tasks.length,
        used_fallback: true,
        decision_count: fallback.decisions.length,
        risk_count: fallback.risks.length,
        timeline_item_count: fallback.timeline.length,
        transcript_word_count: transcript.trim().split(/\s+/).length,
      })
      setFallbackReason(
        err instanceof Error ? err.message : 'Live AI analysis is temporarily unavailable. Showing demo output.',
      )
    }

    setTimeout(() => scrollTo(resultsRef, 'start'), 80)
  }

  function handleTranscriptChange(val: string) {
    setTranscript(val)
    if (appState === 'results') {
      setAppState('idle')
      setResult(null)
      setUsedFallback(false)
    }
  }

  function reset() {
    setTranscript('')
    setAppState('idle')
    setResult(null)
    setActiveSample(null)
    setUsedFallback(false)
    setIsSharedView(false)
    window.history.replaceState(null, '', window.location.pathname)
    setTimeout(() => scrollTo(workspaceRef, 'center'), 60)
  }

  /* ── render ── */

  return (
    <div
      className="min-h-screen"
      style={{
        background: `
          radial-gradient(circle at 80% 20%, rgba(139,92,246,.18), transparent 30%),
          radial-gradient(circle at 20% 80%, rgba(6,182,212,.08), transparent 35%),
          #09090B
        `,
      }}
    >
      <div className="relative z-10">
        <Navbar />

        <main>
          {/* ① Hero */}
          <HeroSection onTrySample={() => loadSample('team')} onSeeExample={seeExample} />

          <Divider />

          {/* ② Features */}
          <FeatureGrid />

          <Divider />

          {/* ③ Workspace */}
          <WorkspaceSection
            transcript={transcript}
            onTranscriptChange={handleTranscriptChange}
            onLoadSample={loadSample}
            onGenerate={generate}
            onClear={reset}
            isLoading={appState === 'loading'}
            workspaceRef={workspaceRef}
          />

          {/* ④ Loading */}
          {appState === 'loading' && <LoadingState />}

          {/* ⑤ Results */}
          {appState === 'results' && result && (
            <div ref={resultsRef}>
              {/* Fallback notice — only when Gemini was unavailable */}
              {usedFallback && (
                <div className="max-w-6xl mx-auto px-6 mb-4">
                  <div
                    className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm"
                    style={{
                      background: 'rgba(245,158,11,0.08)',
                      border: '1px solid rgba(245,158,11,0.22)',
                      color: '#FCD34D',
                    }}
                  >
                    <span style={{ fontSize: '16px' }}>⚠️</span>
                    <span>{fallbackReason}</span>
                  </div>
                </div>
              )}
              <ResultsSection result={result} onReset={reset} isSharedView={isSharedView} />
            </div>
          )}

          {/* ⑥ Results Preview (shown when idle to help judges understand the output) */}
          {appState === 'idle' && (
            <>
              <Divider />
              <ResultsPreview />
            </>
          )}
        </main>

        <NovusStatus />

        <footer
          className="py-10 text-center"
          style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}
        >
          <p className="text-xs" style={{ color: '#3F3F46' }}>
            ActionFlow AI&nbsp;&mdash;&nbsp;Built for&nbsp;
            <span style={{ color: '#8B5CF6' }}>Everyone Ships Now</span>
            &nbsp;Hackathon
          </p>
        </footer>
      </div>
    </div>
  )
}

function Divider() {
  return (
    <div className="max-w-6xl mx-auto px-6 mb-16">
      <div
        style={{
          height: '1px',
          background:
            'linear-gradient(to right, transparent 0%, rgba(255,255,255,0.06) 50%, transparent 100%)',
        }}
      />
    </div>
  )
}
