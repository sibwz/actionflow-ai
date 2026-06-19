# ActionFlow AI

Transform messy meeting transcripts, lectures, and brainstorming sessions into structured execution plans — powered by Google Gemini on Vertex AI.

---

## Features

- **AI Execution Plans** — Paste any conversation and get a full action plan in seconds
- **Task Extraction** — Owners, priorities (High / Medium / Low), and deadlines pulled automatically
- **Key Decisions** — Important decisions surfaced from the transcript
- **Risk Detection** — Blockers and risks flagged before they become problems
- **Follow-up Questions** — Unresolved threads identified for the next meeting
- **AI Suggestions** — Proactive recommendations to keep momentum
- **Execution Timeline** — Milestones ordered chronologically
- **Export PDF** — Professional branded PDF with one click
- **Export Markdown** — Download a `.md` file of the full plan
- **Copy to Clipboard** — Copy the entire plan as Markdown with one click
- **TXT File Upload** — Drag-and-drop or browse to load `.txt` transcripts
- **Sample Transcripts** — Team Meeting, University Lecture, Hackathon Planning
- **Graceful Fallback** — If the AI is unavailable, demo output is shown with a clear notice

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16 (App Router) |
| UI | React 19, TypeScript 5, Tailwind CSS 4 |
| AI | Google Gemini via Vertex AI (`@google-cloud/vertexai`) |
| PDF export | jsPDF + jspdf-autotable |
| Toasts | sonner |
| Icons | lucide-react |

---

## How to Run Locally

**Prerequisites:** Node.js 20+, a Google Cloud project with Vertex AI enabled, and Application Default Credentials configured.

```bash
# 1. Clone and install
git clone <repo-url>
cd actionflow-ai
npm install

# 2. Set environment variables
cp .env.example .env.local
# Fill in GOOGLE_CLOUD_PROJECT_ID, GOOGLE_CLOUD_LOCATION, GEMINI_MODEL

# 3. Authenticate (ADC)
gcloud auth application-default login

# 4. Start dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `GOOGLE_CLOUD_PROJECT_ID` | Your GCP project ID | `my-project-123` |
| `GOOGLE_CLOUD_LOCATION` | Vertex AI region | `us-central1` |
| `GEMINI_MODEL` | Gemini model name | `gemini-1.5-pro` |
| `GOOGLE_APPLICATION_CREDENTIALS_JSON` | Service account JSON (for Vercel) | `{"type":"service_account",...}` |

---

## How to Deploy (Vercel)

1. Push the repo to GitHub.
2. Import it in [vercel.com](https://vercel.com).
3. Add the four environment variables above in **Project → Settings → Environment Variables**.
4. For `GOOGLE_APPLICATION_CREDENTIALS_JSON`, paste the full contents of your service account key JSON as a single-line string.
5. Deploy.

The `/api/analyze` route runs as a serverless function and authenticates using the JSON credentials.

---

## Export Features

After an action plan is generated, three export options appear in the results header:

| Button | Output |
|--------|--------|
| **Copy Plan** | Copies the full plan as Markdown to your clipboard |
| **Markdown** | Downloads `ActionFlow_Plan.md` |
| **Export PDF** | Downloads `ActionFlow_Plan_<date>.pdf` — A4, branded, with task table and timeline |

---

## Novus Integration — Coming Soon

A **Novus Monitoring** status pill is shown in the app footer. Novus will provide real-time observability for AI pipeline health, latency, and error rates once integrated.

---

## Project Structure

```
app/
  api/analyze/route.ts   ← Vertex AI route handler (DO NOT MODIFY)
  components/            ← All UI components
  data/samples.ts        ← Type definitions + sample data
  lib/
    exportMarkdown.ts    ← Markdown export logic
    exportPdf.ts         ← PDF export logic (jsPDF)
  globals.css            ← Design tokens + animations
  layout.tsx             ← Root layout with toast provider
  page.tsx               ← Main page orchestrator
```
