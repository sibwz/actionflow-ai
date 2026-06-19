'use client'

import { useEffect, useState } from 'react'

const MESSAGES = [
  'Reading transcript',
  'Finding decisions',
  'Extracting tasks',
  'Assigning owners',
  'Detecting risks',
  'Building timeline',
  'Preparing export-ready report',
]

export default function LoadingState() {
  const [idx, setIdx] = useState(0)
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false)
      setTimeout(() => {
        setIdx((prev) => (prev + 1) % MESSAGES.length)
        setVisible(true)
      }, 280)
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="px-6 pb-20">
      <div className="max-w-4xl mx-auto">
        <div
          className="rounded-3xl flex flex-col items-center justify-center gap-8 py-16"
          style={{
            background: '#18181B',
            border: '1px solid rgba(255,255,255,0.07)',
          }}
        >
          {/* Spinner */}
          <div className="relative w-16 h-16 flex items-center justify-center">
            {/* Outer ring */}
            <div
              className="af-spin absolute inset-0 rounded-full border-[2px]"
              style={{ borderColor: 'rgba(124,58,237,0.14)', borderTopColor: '#7C3AED' }}
            />
            {/* Inner ring */}
            <div
              className="af-spin-rev absolute inset-[6px] rounded-full border-[2px]"
              style={{ borderColor: 'rgba(139,92,246,0.1)', borderBottomColor: '#8B5CF6' }}
            />
            {/* Core */}
            <div
              className="w-3 h-3 rounded-full"
              style={{ background: '#7C3AED', boxShadow: '0 0 14px rgba(124,58,237,0.9)' }}
            />
          </div>

          {/* Rotating message */}
          <div className="flex flex-col items-center gap-2 min-h-[48px] justify-center">
            <p
              className="text-base font-semibold"
              style={{
                color: '#FFFFFF',
                opacity: visible ? 1 : 0,
                transition: 'opacity 0.28s ease',
              }}
            >
              {MESSAGES[idx]}
            </p>
            <p className="text-xs" style={{ color: '#4B5563' }}>
              Analyzing with AI — this takes about 12 seconds
            </p>
          </div>

          {/* Step dots */}
          <div className="flex items-center gap-2">
            {MESSAGES.map((_, i) => (
              <div
                key={i}
                className="w-1.5 h-1.5 rounded-full"
                style={{
                  background: i === idx ? '#7C3AED' : 'rgba(124,58,237,0.18)',
                  transform: i === idx ? 'scale(1.5)' : 'scale(1)',
                  boxShadow: i === idx ? '0 0 8px rgba(124,58,237,0.7)' : 'none',
                  transition: 'all 0.28s ease',
                }}
              />
            ))}
          </div>

          {/* Skeleton preview */}
          <div className="w-full px-8 flex flex-col gap-3 pt-2">
            <div className="af-skeleton-pulse" style={{ height: '16px', width: '100%' }} />
            <div className="af-skeleton-pulse" style={{ height: '16px', width: '72%' }} />
            <div className="flex gap-3">
              <div className="af-skeleton-pulse" style={{ height: '80px', flex: 1 }} />
              <div className="af-skeleton-pulse" style={{ height: '80px', flex: 1 }} />
            </div>
            <div className="af-skeleton-pulse" style={{ height: '12px', width: '55%' }} />
            <div className="af-skeleton-pulse" style={{ height: '12px', width: '40%' }} />
          </div>
        </div>
      </div>
    </div>
  )
}
