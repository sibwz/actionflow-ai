import { Zap } from 'lucide-react'

export default function Navbar() {
  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 flex items-center px-6 md:px-10"
      style={{ height: '72px', borderBottom: '1px solid rgba(255,255,255,0.05)' }}
    >
      {/* Frosted glass background */}
      <div
        className="absolute inset-0"
        style={{
          background: 'rgba(9,9,11,0.85)',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
        }}
      />

      <div className="relative z-10 flex w-full items-center justify-between max-w-7xl mx-auto">
        {/* Brand */}
        <div className="flex items-center gap-2.5">
          <div
            className="flex items-center justify-center w-8 h-8 rounded-lg shrink-0"
            style={{ background: 'linear-gradient(135deg, #8B5CF6 0%, #6D28D9 100%)' }}
          >
            <Zap size={15} color="#fff" fill="#fff" />
          </div>
          <span
            className="font-bold text-[15px] tracking-tight"
            style={{ color: '#FAFAFA', letterSpacing: '-0.01em' }}
          >
            ActionFlow AI
          </span>
        </div>

        {/* Badge */}
        <div
          className="flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold select-none"
          style={{
            background: 'rgba(139,92,246,0.12)',
            border: '1px solid rgba(139,92,246,0.35)',
            color: '#A78BFA',
            boxShadow: '0 0 20px rgba(139,92,246,0.1)',
          }}
        >
          <span
            className="w-1.5 h-1.5 rounded-full shrink-0"
            style={{ background: '#8B5CF6', boxShadow: '0 0 6px rgba(139,92,246,0.8)' }}
          />
          Built for Everyone Ships Now
        </div>
      </div>
    </header>
  )
}
