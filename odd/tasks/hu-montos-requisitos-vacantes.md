# HU: montos, requisitos, cobertura y vacantes actualizados

## Objective
Show up-to-date minimum amount, requirements, coverage and vacancies so prospects decide with correct information.

## Scope (from user story CA1–CA9)
- CA1: minimum amount $300 USD everywhere (copy, SEO meta, OG, JSON-LD, simulator).
- CA2: first-credit text: "Para iniciar, puedes solicitar un crédito de $300 a $2,000 USD, sujeto a análisis. Si mantienes un buen historial de pago con nosotros, podrás acceder a montos mayores en tu próximo crédito."
- CA3: benefits card text: "Solo necesitas tener un empleo estable en una empresa, un ID válido, una cuenta bancaria y un comprobante de domicilio."
- CA4: remove New Jersey from coverage.
- CA5: requirements: Tener un empleo fijo en una empresa o agencia; Documento de identificación; Cuenta bancaria personal de Estados Unidos; Número de ruta; Número de celular.
- CA6: highlighted note box below the list: "IMPORTANTE: Tu número de cuenta y ruta se solicitan únicamente para poder realizar el desembolso. Para tu tranquilidad, ten presente que con estos datos no se pueden realizar operaciones." (text corrected, approved by user 2026-10-06)
- CA7: FAQ #2 "¿Qué documentos necesito?" → "Documento de identificación, cuenta bancaria personal y número de ruta." (text corrected, approved by user 2026-10-06)
- CA8: replace Raleigh vacancy with Nashville, Tennessee.
- CA9: responsive on desktop and mobile.

## Decisions / assumptions
- Simulator: montoMin 300, montoStep 100, quickAmounts [300, 1000, 1500, 2000]; montoMax untouched.
- services.json max ($10,000) untouched — out of story scope, flagged to user.
- Footer requirements list synced with CA5 for consistency.
- Nashville publishedAt = 2026-10-06; sitemap careers lastmod updated.
- Images/videos with embedded text cannot be verified automatically — flagged for manual check.

## Checks
No test runner in repo (no RED/GREEN applicable). Per task: `pnpm typecheck`, `pnpm lint`, `pnpm build`, plus rg for leftover strings.

## Tasks
- [x] T1 (CA1, CA2) Amounts to $300 + first-credit copy — route: delegated (multi-file writer trigger)
- [x] T2 (CA3–CA7) Benefits, coverage, requirements + IMPORTANT box, FAQ #2, footer — route: delegated
- [ ] T3 (CA8) Raleigh → Nashville vacancy — route: delegated
- [ ] T4 (CA9) Responsive visual check — pending manual/visual verification

## Progress
- Created 2026-10-06.
- T1 done: dc39515 (index.html meta/OG/JSON-LD, simulator min 300/step 100/quickAmounts, steps, FAQ, services). typecheck/lint OK.
- T2 done: ece1e32 (benefits card 02, coverage w/o New Jersey, 5 requirements, requirementsNote box, FAQ #2; footer reads coverage.requirements so it syncs automatically). typecheck/lint OK.
