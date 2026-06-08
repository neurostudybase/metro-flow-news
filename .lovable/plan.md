# Media Holding Operating System — Implementation Plan

## Scope & Constraints
- Touch ONLY admin (`/admin/*`). No changes to public site, header, homepage, navigation.
- Build on top of existing admin structure (`AdminLayout`, `HoldingLayout`, AI/Control sections already present).
- Frontend-only, mock data. No backend/Lovable Cloud enabled in this pass (can be wired later).
- Enterprise visual style: white interface, dense tables, no emojis, desktop-first.

## Current State (reuse, do not duplicate)
Already exists: AdminDashboard, Holding (Cities, News, AI News, Moderation, Calendar, Analytics, Growth), AI section (Dashboard, News pipeline, Tasks, SEO, Security, Content, Settings, Logs), Control center (Command, Networks, Cities, Editorial, Growth, News-hunter, Analytics).

Gaps to fill per the brief.

## New / Upgraded Sections

### 1. Holding Command Dashboard (upgrade `HoldingDashboard`)
KPI strip: total articles, cities, AI agents, total views, today's publications, scheduled, moderation queue, AI queue, failed tasks, per-city activity sparkline.

### 2. Cities — extend `HoldingCitiesPage` + new `CityDetailPage`
Add fields: logo, population, region, weather source, editor count, AI agent count, categories, publication count, status.
Actions: create / clone / disable / transfer content / migrate content.

### 3. AI Agents Center (new) — `/admin/holding/agents`
Table of agents (name, role, model, status, publications, last activity, city).
Roles: News Writer, Rewriter, SEO, Fact Checker, Headline, Social, Image, Moderator, Trend, City Agent.
Detail drawer + enable/disable/run-now.

### 4. AI API Center (new) — `/admin/holding/api-keys`
Providers: OpenAI, DeepSeek, Gemini, Claude, Qwen, Grok, Kimi, OpenRouter.
Fields: provider, model, key (masked), status, daily usage, tokens, cost.
Actions: enable / disable / test / rotate. Mock only — no real secret storage in this pass.

### 5. Content Pipeline (new) — `/admin/holding/pipeline`
Visual horizontal flow: Source → Rewrite → Fact Check → SEO → Moderation → Schedule → Publish.
Each stage: count, throughput, pause button, list of items at that stage.

### 6. Newsroom Kanban (new) — `/admin/holding/newsroom`
Columns: Draft, AI Processing, Review, Scheduled, Published, Rejected. Drag-less mock with status transitions.

### 7. Content Sources (new) — `/admin/holding/sources`
Source name, type (RSS/manual/AI/partner/newsroom), city, category, status, last fetch.

### 8. Media Library (new) — `/admin/holding/media`
Grid of mock images with search, tags, duplicate detection placeholder, AI description column.

### 9. SEO Center (new) — `/admin/holding/seo`
Per-city tabs: sitemap status, robots editor, redirects list, meta templates, schema.org snippets, OpenGraph defaults.

### 10. Analytics Center (upgrade existing)
Add tabs: city performance, article performance, category performance, editor performance, AI performance, traffic sources, publication frequency. Charts via recharts.

### 11. AI Performance Monitor (new) — `/admin/holding/ai-performance`
Per agent: created / approved / rejected / avg quality / last run / errors.

### 12. Moderation Center (upgrade) 
Tabs: spam, duplicates, low quality, suspicious. Queue with approve/reject.

### 13. Scheduler (new) — `/admin/holding/scheduler`
Calendar + list. Modes: immediate, scheduled, recurring (cron-style).

### 14. Permissions (new) — `/admin/holding/permissions`
Roles: Super Admin, Holding Admin, City Editor, Journalist, Moderator, SEO Manager. User → role table.

## Technical Approach
- Data: extend `src/data/holdingData.ts` + new mock files (`agentsData.ts`, `apiKeysData.ts`, `pipelineData.ts`, `sourcesData.ts`, `mediaLibraryData.ts`, `seoData.ts`, `permissionsData.ts`).
- Layout: keep `HoldingLayout`; add new menu entries in its sidebar.
- Components: shadcn Table, Tabs, Dialog, Card, Badge, Progress, Chart (recharts already in deps).
- Routes: add to `src/App.tsx` under `/admin/holding/*`.
- No emojis. Tight spacing, monospaced numerics, neutral palette using existing tokens.

## Out of Scope (this pass)
- Real AI execution / real API key storage (mock only — Lovable Cloud + secrets can be added in a follow-up).
- Backend persistence.
- Public-site changes.

## Deliverable
~14 new pages + upgrades to 3 existing, fully navigable with rich mock data, ready to wire to a real backend later.

```text
/admin/holding
├── (dashboard, upgraded)
├── cities  [+ detail]
├── agents              NEW
├── api-keys            NEW
├── pipeline            NEW
├── newsroom            NEW
├── sources             NEW
├── media               NEW
├── seo                 NEW
├── analytics  (upgraded)
├── ai-performance      NEW
├── moderation (upgraded)
├── scheduler           NEW
└── permissions         NEW
```

This is a large build — ~20 files, mock data only. Approve to proceed, or tell me which sections to prioritize for the first pass.