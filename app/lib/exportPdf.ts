import type { ActionPlanResult } from '../data/samples'

export async function exportToPdf(result: ActionPlanResult): Promise<void> {
  const { default: jsPDF } = await import('jspdf')
  const { autoTable } = await import('jspdf-autotable')

  const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' })
  const pageW = doc.internal.pageSize.getWidth()
  const pageH = doc.internal.pageSize.getHeight()
  const margin = 16
  const contentW = pageW - margin * 2
  let y = 0

  // ── Helper: ensure enough space, add page if needed ──────────────────────
  function checkPage(needed: number) {
    if (y + needed > pageH - margin) {
      doc.addPage()
      y = margin + 4
    }
  }

  function sectionHeader(title: string, r: number, g: number, b: number) {
    checkPage(14)
    doc.setFillColor(r, g, b)
    doc.roundedRect(margin, y, contentW, 9, 2, 2, 'F')
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(10)
    doc.setTextColor(255, 255, 255)
    doc.text(title, margin + 4, y + 6)
    y += 13
  }

  function bodyText(text: string, color: [number, number, number] = [50, 50, 60]) {
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(9)
    doc.setTextColor(...color)
    const lines = doc.splitTextToSize(text, contentW)
    checkPage(lines.length * 5 + 2)
    doc.text(lines, margin, y)
    y += lines.length * 5 + 2
  }

  function numberedList(items: string[]) {
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(9)
    doc.setTextColor(50, 50, 60)
    items.forEach((item, i) => {
      const lines = doc.splitTextToSize(`${i + 1}.  ${item}`, contentW - 4)
      checkPage(lines.length * 5 + 2)
      doc.text(lines, margin + 2, y)
      y += lines.length * 5 + 2
    })
  }

  function bulletList(items: string[], dotColor: [number, number, number] = [139, 92, 246]) {
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(9)
    doc.setTextColor(50, 50, 60)
    items.forEach((item) => {
      const lines = doc.splitTextToSize(item, contentW - 6)
      checkPage(lines.length * 5 + 2)
      doc.setFillColor(...dotColor)
      doc.circle(margin + 2, y - 1, 0.9, 'F')
      doc.text(lines, margin + 6, y)
      y += lines.length * 5 + 2
    })
  }

  // ── Page header band ──────────────────────────────────────────────────────
  doc.setFillColor(139, 92, 246)
  doc.rect(0, 0, pageW, 22, 'F')

  doc.setFont('helvetica', 'bold')
  doc.setFontSize(14)
  doc.setTextColor(255, 255, 255)
  doc.text('ActionFlow AI', margin, 13)

  doc.setFont('helvetica', 'normal')
  doc.setFontSize(9)
  doc.setTextColor(220, 210, 255)
  doc.text('Execution Plan', margin, 19)

  const dateStr = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
  doc.setTextColor(220, 210, 255)
  const dateW = doc.getTextWidth(dateStr)
  doc.text(dateStr, pageW - margin - dateW, 13)

  y = 30

  // ── Executive Summary ────────────────────────────────────────────────────
  sectionHeader('Executive Summary', 139, 92, 246)
  bodyText(result.summary)
  y += 4

  // ── Key Decisions ────────────────────────────────────────────────────────
  if (result.decisions.length > 0) {
    sectionHeader('Key Decisions', 34, 197, 94)
    numberedList(result.decisions)
    y += 4
  }

  // ── Risks & Blockers ────────────────────────────────────────────────────
  if (result.risks.length > 0) {
    sectionHeader('Risks & Blockers', 239, 68, 68)
    bulletList(result.risks, [239, 68, 68])
    y += 4
  }

  // ── Follow-up Questions ──────────────────────────────────────────────────
  if (result.followUps.length > 0) {
    sectionHeader('Follow-up Questions', 245, 158, 11)
    result.followUps.forEach((q, i) => {
      doc.setFont('helvetica', 'bold')
      doc.setFontSize(9)
      doc.setTextColor(180, 100, 0)
      const label = `Q${i + 1}  `
      const labelW = doc.getTextWidth(label)
      checkPage(8)
      doc.text(label, margin, y)
      doc.setFont('helvetica', 'normal')
      doc.setTextColor(50, 50, 60)
      const lines = doc.splitTextToSize(q, contentW - labelW - 2)
      doc.text(lines, margin + labelW, y)
      y += lines.length * 5 + 2
    })
    y += 4
  }

  // ── AI Suggestions ───────────────────────────────────────────────────────
  if (result.suggestions.length > 0) {
    sectionHeader('AI Suggestions', 139, 92, 246)
    bulletList(result.suggestions, [139, 92, 246])
    y += 4
  }

  // ── Action Items table ───────────────────────────────────────────────────
  if (result.tasks.length > 0) {
    checkPage(20)
    sectionHeader('Action Items', 99, 60, 180)

    const PRIORITY_COLORS: Record<string, [number, number, number]> = {
      High: [239, 68, 68],
      Medium: [245, 158, 11],
      Low: [34, 197, 94],
    }

    autoTable(doc, {
      startY: y,
      margin: { left: margin, right: margin },
      head: [['ID', 'Task', 'Owner', 'Priority', 'Deadline']],
      body: result.tasks.map((t) => [t.id, t.title, t.owner, t.priority, t.deadline]),
      headStyles: {
        fillColor: [30, 30, 35],
        textColor: [200, 200, 210],
        fontStyle: 'bold',
        fontSize: 8,
      },
      bodyStyles: { fontSize: 8, textColor: [50, 50, 60] },
      alternateRowStyles: { fillColor: [248, 248, 252] },
      columnStyles: {
        0: { cellWidth: 14 },
        1: { cellWidth: 'auto' },
        2: { cellWidth: 28 },
        3: { cellWidth: 20 },
        4: { cellWidth: 24 },
      },
      didParseCell: (data) => {
        if (data.column.index === 3 && data.section === 'body') {
          const priority = data.cell.raw as string
          const col = PRIORITY_COLORS[priority] ?? [100, 100, 100]
          data.cell.styles.textColor = col
          data.cell.styles.fontStyle = 'bold'
        }
      },
    })

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    y = (doc as any).lastAutoTable.finalY + 6
  }

  // ── Execution Timeline ───────────────────────────────────────────────────
  if (result.timeline.length > 0) {
    checkPage(20)
    sectionHeader('Execution Timeline', 6, 182, 212)

    result.timeline.forEach((item, idx) => {
      checkPage(16)
      // Node circle
      doc.setFillColor(idx === 0 ? 139 : 99, idx === 0 ? 92 : 60, idx === 0 ? 246 : 180)
      doc.circle(margin + 3.5, y - 1.5, 3.5, 'F')
      doc.setFont('helvetica', 'bold')
      doc.setFontSize(7)
      doc.setTextColor(255, 255, 255)
      doc.text(String(idx + 1), margin + 2.3, y - 0.2)

      // Date label
      doc.setFont('helvetica', 'bold')
      doc.setFontSize(9)
      doc.setTextColor(30, 30, 40)
      doc.text(item.date, margin + 10, y)
      if (item.day !== item.date) {
        doc.setFont('helvetica', 'normal')
        doc.setFontSize(7.5)
        doc.setTextColor(130, 130, 140)
        doc.text(`(${item.day})`, margin + 10 + doc.getTextWidth(item.date) + 2, y)
      }
      y += 5

      // Events
      item.events.forEach((ev) => {
        const lines = doc.splitTextToSize(ev, contentW - 16)
        checkPage(lines.length * 4.5 + 1)
        doc.setFillColor(139, 92, 246)
        doc.circle(margin + 10, y - 1, 0.8, 'F')
        doc.setFont('helvetica', 'normal')
        doc.setFontSize(8.5)
        doc.setTextColor(60, 60, 70)
        doc.text(lines, margin + 14, y)
        y += lines.length * 4.5 + 1
      })
      y += 3
    })
  }

  // ── Footer on each page ──────────────────────────────────────────────────
  const totalPages = doc.getNumberOfPages()
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i)
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(7.5)
    doc.setTextColor(160, 160, 170)
    doc.text('ActionFlow AI — Generated with AI', margin, pageH - 6)
    doc.text(`Page ${i} of ${totalPages}`, pageW - margin - 20, pageH - 6)
  }

  const filename = `ActionFlow_Plan_${new Date().toISOString().slice(0, 10)}.pdf`
  doc.save(filename)
}
