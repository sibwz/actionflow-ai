'use client'

import { useRef, useState } from 'react'
import Navbar from './components/Navbar'
import HeroSection from './components/HeroSection'
import FeatureGrid from './components/FeatureGrid'
import WorkspaceSection from './components/WorkspaceSection'
import LoadingState from './components/LoadingState'
import ResultsSection from './components/ResultsSection'
import ResultsPreview from './components/ResultsPreview'
import { SAMPLES, type ActionPlanResult } from './data/samples'

type AppState = 'idle' | 'loading' | 'results'

export default function Home() {
  const [transcript, setTranscript] = useState('')
  const [appState, setAppState] = useState<AppState>('idle')
  const [result, setResult] = useState<ActionPlanResult | null>(null)
  const [activeSample, setActiveSample] = useState<keyof typeof SAMPLES | null>(null)

  const workspaceRef = useRef<HTMLDivElement>(null)
  const resultsRef = useRef<HTMLDivElement>(null)

  /* ── helpers ── */

  function scrollTo(ref: React.RefObject<HTMLDivElement | null>, offset = 'center' as ScrollLogicalPosition) {
    ref.current?.scrollIntoView({ behavior: 'smooth', block: offset })
  }

  function loadSample(type: keyof typeof SAMPLES) {
    setTranscript(SAMPLES[type].transcript)
    setActiveSample(type)
    setAppState('idle')
    setResult(null)
    setTimeout(() => scrollTo(workspaceRef, 'center'), 60)
  }

  function seeExample() {
    setTranscript(SAMPLES.team.transcript)
    setActiveSample('team')
    setResult(SAMPLES.team.result)
    setAppState('results')
    setTimeout(() => scrollTo(resultsRef, 'start'), 80)
  }

  function generate() {
    if (!transcript.trim()) return
    setAppState('loading')
    setResult(null)
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })

    setTimeout(() => {
      const r = activeSample ? SAMPLES[activeSample].result : SAMPLES.team.result
      setResult(r)
      setAppState('results')
      setTimeout(() => scrollTo(resultsRef, 'start'), 80)
    }, 12_000)
  }

  function handleTranscriptChange(val: string) {
    setTranscript(val)
    if (appState === 'results') {
      setAppState('idle')
      setResult(null)
    }
  }

  function reset() {
    setTranscript('')
    setAppState('idle')
    setResult(null)
    setActiveSample(null)
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
      {/* Content */}
      <div className="relative z-10">
        <Navbar />

        <main>
          {/* ① Hero */}
          <HeroSection onTrySample={() => loadSample('team')} onSeeExample={seeExample} />

          {/* Divider */}
          <Divider />

          {/* ② Features */}
          <FeatureGrid />

          {/* Divider */}
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
              <ResultsSection result={result} onReset={reset} />
            </div>
          )}

          {/* ⑥ Results Preview (only when idle — helps judges understand the output) */}
          {appState === 'idle' && (
            <>
              <Divider />
              <ResultsPreview />
            </>
          )}
        </main>

        {/* Footer */}
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
