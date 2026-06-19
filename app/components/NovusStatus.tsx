export default function NovusStatus() {
  return (
    <div className="max-w-6xl mx-auto px-6 pb-8">
      <div
        className="inline-flex items-center gap-3 px-4 py-2.5 rounded-xl"
        style={{
          background: 'rgba(6,182,212,0.06)',
          border: '1px solid rgba(6,182,212,0.15)',
        }}
      >
        <span
          className="w-2 h-2 rounded-full shrink-0"
          style={{ background: '#06B6D4', boxShadow: '0 0 6px rgba(6,182,212,0.5)' }}
        />
        <div>
          <p className="text-xs font-semibold leading-none mb-0.5" style={{ color: '#06B6D4' }}>
            Novus Monitoring
          </p>
          <p className="text-[11px] leading-none" style={{ color: '#52525B' }}>
            Ready for Installation
          </p>
        </div>
      </div>
    </div>
  )
}
