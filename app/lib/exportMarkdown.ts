import type { ActionPlanResult } from '../data/samples'

export function exportToMarkdown(result: ActionPlanResult): void {
  const lines: string[] = []

  lines.push('# ActionFlow AI — Execution Plan')
  lines.push(`*Generated on ${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}*`)
  lines.push('')

  // Executive Summary
  lines.push('## Executive Summary')
  lines.push('')
  lines.push(result.summary)
  lines.push('')

  // Key Decisions
  if (result.decisions.length > 0) {
    lines.push('## Key Decisions')
    lines.push('')
    result.decisions.forEach((d, i) => lines.push(`${i + 1}. ${d}`))
    lines.push('')
  }

  // Risks & Blockers
  if (result.risks.length > 0) {
    lines.push('## Risks & Blockers')
    lines.push('')
    result.risks.forEach((r) => lines.push(`- ${r}`))
    lines.push('')
  }

  // Follow-up Questions
  if (result.followUps.length > 0) {
    lines.push('## Follow-up Questions')
    lines.push('')
    result.followUps.forEach((q, i) => lines.push(`**Q${i + 1}.** ${q}`))
    lines.push('')
  }

  // AI Suggestions
  if (result.suggestions.length > 0) {
    lines.push('## AI Suggestions')
    lines.push('')
    result.suggestions.forEach((s) => lines.push(`- ${s}`))
    lines.push('')
  }

  // Action Items table
  if (result.tasks.length > 0) {
    lines.push('## Action Items')
    lines.push('')
    lines.push('| ID | Task | Owner | Priority | Deadline |')
    lines.push('|----|------|-------|----------|----------|')
    result.tasks.forEach((t) => {
      const title = t.title.replace(/\|/g, '\\|')
      const owner = t.owner.replace(/\|/g, '\\|')
      lines.push(`| ${t.id} | ${title} | ${owner} | ${t.priority} | ${t.deadline} |`)
    })
    lines.push('')
  }

  // Execution Timeline
  if (result.timeline.length > 0) {
    lines.push('## Execution Timeline')
    lines.push('')
    result.timeline.forEach((item) => {
      const dayLabel = item.day !== item.date ? ` *(${item.day})*` : ''
      lines.push(`### ${item.date}${dayLabel}`)
      item.events.forEach((ev) => lines.push(`- ${ev}`))
      lines.push('')
    })
  }

  const markdown = lines.join('\n')
  const blob = new Blob([markdown], { type: 'text/markdown;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = 'ActionFlow_Plan.md'
  a.click()
  setTimeout(() => URL.revokeObjectURL(url), 100)
}

export function buildMarkdownString(result: ActionPlanResult): string {
  const lines: string[] = []

  lines.push('# ActionFlow AI — Execution Plan')
  lines.push(`*Generated on ${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}*`)
  lines.push('')
  lines.push('## Executive Summary')
  lines.push('')
  lines.push(result.summary)
  lines.push('')

  if (result.decisions.length > 0) {
    lines.push('## Key Decisions')
    lines.push('')
    result.decisions.forEach((d, i) => lines.push(`${i + 1}. ${d}`))
    lines.push('')
  }

  if (result.risks.length > 0) {
    lines.push('## Risks & Blockers')
    lines.push('')
    result.risks.forEach((r) => lines.push(`- ${r}`))
    lines.push('')
  }

  if (result.followUps.length > 0) {
    lines.push('## Follow-up Questions')
    lines.push('')
    result.followUps.forEach((q, i) => lines.push(`Q${i + 1}. ${q}`))
    lines.push('')
  }

  if (result.suggestions.length > 0) {
    lines.push('## AI Suggestions')
    lines.push('')
    result.suggestions.forEach((s) => lines.push(`- ${s}`))
    lines.push('')
  }

  if (result.tasks.length > 0) {
    lines.push('## Action Items')
    lines.push('')
    result.tasks.forEach((t) => {
      lines.push(`[${t.id}] ${t.title}`)
      lines.push(`  Owner: ${t.owner} | Priority: ${t.priority} | Deadline: ${t.deadline}`)
    })
    lines.push('')
  }

  if (result.timeline.length > 0) {
    lines.push('## Execution Timeline')
    lines.push('')
    result.timeline.forEach((item) => {
      lines.push(`${item.date}${item.day !== item.date ? ` (${item.day})` : ''}`)
      item.events.forEach((ev) => lines.push(`  - ${ev}`))
    })
    lines.push('')
  }

  return lines.join('\n')
}
