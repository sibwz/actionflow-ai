import { VertexAI } from '@google-cloud/vertexai'
import type { NextRequest } from 'next/server'
import type { ActionPlanResult, Task, TimelineItem } from '../../data/samples'

// ── System prompt ──────────────────────────────────────────────────────────────

const SYSTEM_INSTRUCTION =
  'You are an executive project coordinator. Transform messy conversations into structured execution plans. ' +
  'Extract executive summary, key decisions, action items, owners, priorities, deadlines, follow-up questions, ' +
  'risks, blockers, and proactive AI suggestions. Return ONLY valid JSON. No markdown. No explanation.'

const USER_PROMPT = `Analyze the transcript and return STRICT JSON matching this schema exactly:

{
  "summary": "concise executive summary string",
  "decisions": ["decision string"],
  "actionItems": [
    { "task": "task description", "owner": "person name", "priority": "High|Medium|Low", "deadline": "deadline string" }
  ],
  "deadlines": ["deadline string"],
  "risks": ["risk or blocker string"],
  "followUps": ["follow-up question string"],
  "suggestions": ["proactive AI suggestion string"],
  "timeline": [
    { "date": "short date label", "day": "day name or phase", "events": ["event string"] }
  ]
}

Rules:
- priority must be exactly "High", "Medium", or "Low" — nothing else
- timeline entries must be ordered chronologically
- All strings must be concise and direct

Transcript:
`

// ── Route handler ──────────────────────────────────────────────────────────────

export async function POST(request: NextRequest) {
  // Validate env config
  const projectId = process.env.GOOGLE_CLOUD_PROJECT_ID
  const location = process.env.GOOGLE_CLOUD_LOCATION ?? 'us-central1'
  const model = process.env.GEMINI_MODEL ?? 'gemini-2.5-flash'

  if (!projectId) {
    console.error('[analyze] GOOGLE_CLOUD_PROJECT_ID is not set')
    return Response.json(
      { error: 'Live AI analysis is temporarily unavailable. Showing demo output.' },
      { status: 503 },
    )
  }

  // Parse request body
  let transcript: string
  try {
    const body = await request.json() as { transcript?: unknown }
    if (typeof body.transcript !== 'string' || !body.transcript.trim()) {
      return Response.json({ error: 'transcript is required and must be a non-empty string.' }, { status: 400 })
    }
    transcript = body.transcript
  } catch {
    return Response.json({ error: 'Invalid JSON body.' }, { status: 400 })
  }

  // Build Vertex AI client
  // Local: uses ADC automatically (gcloud auth application-default login)
  // Vercel/CI: reads GOOGLE_APPLICATION_CREDENTIALS_JSON env var (service account JSON as a string)
  let vertexAI: VertexAI
  try {
    const credentialsJson = process.env.GOOGLE_APPLICATION_CREDENTIALS_JSON
    vertexAI = new VertexAI({
      project: projectId,
      location,
      ...(credentialsJson
        ? {
            googleAuthOptions: {
              credentials: JSON.parse(credentialsJson) as Record<string, string>,
              scopes: ['https://www.googleapis.com/auth/cloud-platform'],
            },
          }
        : {}),
    })
  } catch (err) {
    console.error('[analyze] Failed to initialise Vertex AI client:', err)
    return Response.json(
      { error: 'Live AI analysis is temporarily unavailable. Showing demo output.' },
      { status: 503 },
    )
  }

  // Call Gemini via Vertex AI
  try {
    const generativeModel = vertexAI.getGenerativeModel({
      model,
      generationConfig: { responseMimeType: 'application/json' },
      systemInstruction: SYSTEM_INSTRUCTION,
    })

    const result = await generativeModel.generateContent({
      contents: [{ role: 'user', parts: [{ text: `${USER_PROMPT}${transcript}` }] }],
    })

    // Extract text — Vertex AI SDK returns raw candidates, no .text() helper
    const rawText = result.response.candidates?.[0]?.content?.parts?.[0]?.text ?? ''
    if (!rawText) {
      console.error('[analyze] Vertex AI returned an empty response', JSON.stringify(result.response))
      return Response.json(
        { error: 'Live AI analysis is temporarily unavailable. Showing demo output.' },
        { status: 503 },
      )
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const parsed = JSON.parse(rawText) as Record<string, any>
    return Response.json(toActionPlanResult(parsed))
  } catch (err) {
    console.error('[analyze] Vertex AI generateContent error:', err)
    return Response.json(
      { error: 'Live AI analysis is temporarily unavailable. Showing demo output.' },
      { status: 503 },
    )
  }
}

// ── Mapping helpers ────────────────────────────────────────────────────────────

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function toActionPlanResult(data: Record<string, any>): ActionPlanResult {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const tasks: Task[] = (Array.isArray(data.actionItems) ? data.actionItems : []).map((item: any, i: number) => ({
    id: `T-${String(i + 1).padStart(3, '0')}`,
    title: String(item.task ?? item.title ?? 'Untitled task'),
    owner: String(item.owner ?? 'Unassigned'),
    priority: normalizePriority(item.priority),
    deadline: String(item.deadline ?? 'TBD'),
    status: 'Todo' as const,
  }))

  return {
    summary: String(data.summary ?? ''),
    decisions: toStringArray(data.decisions),
    tasks,
    risks: toStringArray(data.risks),
    followUps: toStringArray(data.followUps),
    suggestions: toStringArray(data.suggestions),
    timeline: buildTimeline(data.timeline, tasks),
  }
}

function normalizePriority(p: unknown): 'High' | 'Medium' | 'Low' {
  const s = String(p ?? '').toLowerCase()
  if (s === 'high') return 'High'
  if (s === 'low') return 'Low'
  return 'Medium'
}

function toStringArray(val: unknown): string[] {
  if (!Array.isArray(val)) return []
  return val.map((v) => String(v))
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function buildTimeline(raw: unknown, tasks: Task[]): TimelineItem[] {
  if (Array.isArray(raw) && raw.length > 0) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return (raw as any[]).map((item) => ({
      date: String(item.date ?? ''),
      day: String(item.day ?? item.date ?? ''),
      events: Array.isArray(item.events) ? item.events.map(String) : [],
    }))
  }

  // Derive from tasks grouped by deadline when model omits timeline
  const byDeadline = new Map<string, string[]>()
  for (const task of tasks) {
    const d = task.deadline || 'TBD'
    if (!byDeadline.has(d)) byDeadline.set(d, [])
    byDeadline.get(d)!.push(`${task.title} (${task.owner})`)
  }
  return Array.from(byDeadline.entries()).map(([date, events]) => ({ date, day: date, events }))
}
