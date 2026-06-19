import type { Task } from '../data/samples'

const PRIORITY: Record<
  Task['priority'],
  { bg: string; border: string; text: string; dot: string }
> = {
  High:   { bg: 'rgba(239,68,68,0.11)',  border: 'rgba(239,68,68,0.26)',  text: '#F87171', dot: '#EF4444' },
  Medium: { bg: 'rgba(245,158,11,0.11)', border: 'rgba(245,158,11,0.26)', text: '#FCD34D', dot: '#F59E0B' },
  Low:    { bg: 'rgba(34,197,94,0.11)',  border: 'rgba(34,197,94,0.26)',  text: '#4ADE80', dot: '#22C55E' },
}

interface ActionTableProps {
  tasks: Task[]
}

export default function ActionTable({ tasks }: ActionTableProps) {
  return (
    /* Horizontal scroll on narrow screens */
    <div style={{ overflowX: 'auto', marginLeft: '-4px', marginRight: '-4px' }}>
      <div
        className="rounded-2xl overflow-hidden"
        style={{ border: '1px solid rgba(255,255,255,0.07)', minWidth: '560px' }}
      >
        {/* Header row */}
        <div
          className="grid px-4 py-3 text-xs font-semibold uppercase tracking-widest"
          style={{
            gridTemplateColumns: '1fr 148px 108px 128px',
            background: 'rgba(9,9,11,0.7)',
            borderBottom: '1px solid rgba(255,255,255,0.06)',
            color: '#4B5563',
          }}
        >
          <span className="pl-10">Task</span>
          <span>Owner</span>
          <span>Priority</span>
          <span>Deadline</span>
        </div>

        {/* Data rows */}
        {tasks.map((task, i) => {
          const p = PRIORITY[task.priority]
          const isLast = i === tasks.length - 1
          return (
            <div
              key={task.id}
              className="grid px-4 items-center"
              style={{
                gridTemplateColumns: '1fr 148px 108px 128px',
                padding: '14px 16px',
                borderBottom: isLast ? 'none' : '1px solid rgba(255,255,255,0.04)',
                transition: 'background 150ms ease',
              }}
              onMouseEnter={(e) => {
                ;(e.currentTarget as HTMLDivElement).style.background = 'rgba(255,255,255,0.022)'
              }}
              onMouseLeave={(e) => {
                ;(e.currentTarget as HTMLDivElement).style.background = 'transparent'
              }}
            >
              {/* Task */}
              <div className="flex items-center gap-3 pr-3 min-w-0">
                <span
                  className="text-xs font-mono shrink-0 tabular-nums"
                  style={{ color: '#374151', minWidth: '36px' }}
                >
                  {task.id}
                </span>
                <span
                  className="text-sm leading-snug"
                  style={{ color: '#E5E7EB' }}
                  title={task.title}
                >
                  {task.title}
                </span>
              </div>

              {/* Owner */}
              <div className="flex items-center gap-2 min-w-0">
                <div
                  className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0"
                  style={{ background: 'rgba(139,92,246,0.2)', color: '#A78BFA' }}
                >
                  {task.owner.charAt(0).toUpperCase()}
                </div>
                <span
                  className="text-xs truncate"
                  style={{ color: '#A1A1AA' }}
                  title={task.owner}
                >
                  {task.owner}
                </span>
              </div>

              {/* Priority pill */}
              <div>
                <span
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold"
                  style={{
                    background: p.bg,
                    border: `1px solid ${p.border}`,
                    color: p.text,
                  }}
                >
                  <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: p.dot }} />
                  {task.priority}
                </span>
              </div>

              {/* Deadline */}
              <span className="text-xs tabular-nums" style={{ color: '#6B7280' }}>
                {task.deadline}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
