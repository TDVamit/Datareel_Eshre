# Datareel ESHRE demo frontend

Datareel is an AI video communication product for turning structured healthcare content into personalized, avatar-led video experiences. This repository contains the Next.js frontend for the ESHRE 2025 interactive demo; the broader product is available at [datareel.ai](https://datareel.ai).

## What this project demonstrates

- A responsive landing page for the Datareel healthcare video experience.
- A curated AI video library with playable catalogue entries and thumbnail navigation.
- A four-step demo flow: choose an avatar, language, video type, and category.
- Supported demo choices for English, French, and Spanish, with Disease Explainer, Report Explainer, and Educational Videos content.
- A local `POST /api/videos` lookup route that resolves a selection to one of the bundled demo videos.
- Custom-video, quote, and demo-request forms embedded through HubSpot.
- In-browser playback and download actions for the selected result.

## Architecture

The app uses the Next.js App Router. Pages under `src/app/` render the landing page, catalogue, and generation flow. The generation UI posts `{ avatar_id, language, video_type, disease }` to `src/app/api/videos/route.tsx`; that route matches against `src/app/api/videos/data.json` and returns a bundled asset from `public/videos/`. The backend pipeline lives in the companion [`9ai-in/video-pipeline`](https://github.com/9ai-in/video-pipeline) repository and is not called by this demo build.

## Tech stack

- Next.js 15.3.3 with the App Router
- React 19 and TypeScript 5
- Material UI, Emotion, Tailwind CSS 4, and Lucide React
- `next/image` and `next/font` for local assets and typography
- SweetAlert2 for unavailable-video feedback
- HubSpot Forms embed for lead capture

## Run locally

Requirements: Node.js compatible with the checked-in Next.js toolchain and npm.

```bash
npm ci
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Other available scripts are:

```bash
npm run build
npm run start
npm run lint
```

No runtime environment variables are required by the current demo implementation. The HubSpot portal/form identifiers are configured in `src/components/HubspotForm.tsx`; move those values to environment variables before reusing this frontend for another account or environment.

## Demo routes

- `/` — product landing page and CTA
- `/catalogue-of-videos` — curated AI video library
- `/generate-videos` — avatar, language, content type, and category selection
- `/generated-videos` — result player component used by the generation flow
- `POST /api/videos` — local demo-video lookup endpoint

Example request:

```bash
curl -X POST http://localhost:3000/api/videos \
  -H 'Content-Type: application/json' \
  -d '{"avatar_id":1,"language":"English","video_type":"Disease Explainer","disease":"Tubal Block"}'
```

The route returns `404` when no matching entry exists and `500` for malformed JSON or an unexpected server error.

## Current status

This is a polished, asset-backed product demo rather than a complete production client. Video selections resolve against checked-in JSON and MP4 assets, and the repository history shows the frontend separated from the backend. Production generation, authentication, analytics, and backend orchestration belong to the companion pipeline service and are not wired into this repository today. Treat the performance and pricing figures shown in the UI as presentation copy, not as benchmark results produced by this codebase.

## Repository

[TDVamit/Datareel_Eshre](https://github.com/TDVamit/Datareel_Eshre)
