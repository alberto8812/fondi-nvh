# HU: Bot "Ana" — guided credit flow with branching

## Objective
The credit-mode chat (FloatingChatWidget) guides the prospect with clear questions, presents amount/requirements with option buttons, branches on answers, and hands the data to an advisor.

## Context
- "The bot" = in-site `FloatingChatWidget` (src/components/floating-chat-widget.tsx); there is no WhatsApp backend. "Send to advisor" = existing review screen + Turnstile + `wa.me` prefilled link.
- Current engine is linear (`questions[] + step`); branching, non-question bot messages, custom option labels and early termination are new.

## Scope (CA1–CA9, approved texts M1–M7 verbatim from the story)
- CA1 M1 greeting. CA2 five questions in order: "Tu nombre completo", "¿En qué ciudad y estado vives?", "¿Cuál es tu código postal?", "¿Tienes un trabajo estable en una empresa?" (Sí/No), "¿En qué trabajas?".
- CA3 M2 (Sí/No). CA4 Sí→M3 (Sí/Me falta uno). CA5 Sí→M4 + send. CA6 Me falta uno→"¿Cuál?" (text)→M5 + send including missing document. CA7 M2 No→M6 (Sí/No, gracias). CA8 M6 Sí→M3. CA9 M6 No, gracias→M7, conversation ends, nothing sent.

## Decisions (user 2026-10-06: ignore the story's ⚠️ pending items)
- M2 "No" triggers M6 (story assumption). No zone/ZIP assignment logic. No answer validation beyond non-empty. Job "No" continues the flow unchanged.
- Careers (application) mode must not regress.

## Checks
No test runner (no RED/GREEN). `pnpm typecheck`, `pnpm lint`, `pnpm build`; manual walk-through of every branch in `pnpm dev`.

## Tasks
- [x] T1 Flow engine: node graph (messages, text/options input, per-option next, terminal end/send) + types; careers mode as linear chain — route: delegated (writer trigger)
- [x] T2 Credit flow content in data JSON (M1–M7, 5 questions, branches) + WA summary only of answered nodes incl. missing document — route: delegated
- [ ] T3 Manual verification of all branches + careers mode on desktop/mobile — pending user/visual

## Progress
- Created 2026-10-06.
- T1 done (route: delegated, writer trigger: engine + types + widget) — `5a07917` refactor: pure graph engine in `src/lib/chat-flow.ts` (createFlow, createLinearFlow, applyAnswer, flowStatus, summarize); widget renders path transcript, `end: 'send'` → review/Turnstile/WhatsApp, `end: 'close'` → ends with no input; careers built as linear chain (vacante choice kept, excluded from WA text).
- T2 done (route: delegated) — `d5fe40c` feat: credit flow M1–M7 in `src/data/contact.json` (`flow`), summary only of answered labelled nodes (+ "Documento faltante" on the ¿Cuál? branch; M2/M3/M6 answers excluded); terminal M4/M5 messages shown atop the review screen.
- Evidence: `pnpm typecheck` OK, `pnpm lint` OK (1 pre-existing warning in illustrative-icon.tsx), `pnpm build` OK. Throwaway trace (outside repo) confirmed paths: Sí→Sí → listo/review; Sí→Me falta uno→text → documentoFaltante→revisionAsesor/review; No→Sí→Sí → montoMayor→requisitos→listo/review; No→No, gracias → despedida/closed; careers 8 nodes (9 with vacante).
- Next: T3 manual walk-through in `pnpm dev` (desktop + mobile).
