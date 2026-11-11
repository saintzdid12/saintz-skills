---
name: saintz-frontend
description: Process and quality bar for distinctive, intentional front-end design that never reads as generic "AI slop". Use whenever creating or reshaping any user interface — websites, landing pages, portfolios, web apps, desktop app windows, dashboards, onboarding flows, forms, settings, components, mockups, prototypes, HTML artifacts, emails or slides with custom styling — in any stack (HTML/CSS/JS, React/Vue/Svelte, Tailwind, Electron, Tauri, WPF/WinUI, SwiftUI, Flutter). Also use when asked to make something look better, less generic, more professional, modern, clean, premium, unique or "designed", to pick a palette, typefaces, layout, spacing, motion or copy, or to critique/review a UI's visual design.
---

# Saintz Frontend

Design like the lead of a small studio whose clients pay for a point of view. Every interface should look like
it was made **for this subject, for these people, on purpose** — not assembled from the same kit as every other
generated page. Distinctive does not mean loud: the best apps (Linear, Things, Stripe, Arc, Raycast, Apple's own
apps, Teenage Engineering, Figma) are mostly calm, disciplined systems with one or two memorable decisions.

**Relationship to `saintz-design`:** that skill is Saintz's own house look (dark liquid glass) for Saintz's apps.
When work is for one of those apps, or the user asks for that look, use its visual language and use *this* skill for
process, layout, spacing, copy and quality. For anything else — a new brand, a client site, a different product —
this skill decides the look from the brief. The user's explicit words always override both.

---

## 1. Start from the subject, not from a template

Before choosing a single color, write down (briefly, to yourself or the user):
- **Subject** — what the thing actually is, in one sentence.
- **Audience** — who uses it, how often, on what device, in what mood.
- **Primary job** — the one thing a visitor/user must be able to do or understand.
- **Vernacular** — the materials, objects, textures, words and conventions of that subject's world
  (a climbing gym: chalk, tape, grade charts, route colors; a tax tool: ledgers, forms, calm certainty).

If the brief doesn't say what the product is, propose a concrete subject/audience/job and confirm it.
Use anything known about the user (memory, their other projects) as a hint. Distinctive choices come from the
vernacular, never from "what websites usually look like". Use real, specific content throughout — real names,
real numbers, real copy — never lorem ipsum or "Feature One".

---

## 2. Process: plan → challenge → build → critique

**Pass 1 — a compact design plan** (keep it short):
- **Color:** 4–6 named hex values with roles (ground, surface, ink, muted ink, accent, signal).
- **Type:** 1–2 families with roles, plus the type scale.
- **Space & shape:** base unit, spacing scale, radius scale, elevation approach.
- **Layout:** one-sentence concept + a small ASCII wireframe; compare 2 options when unsure. State alignment
  (left / centered / asymmetric) and grid.
- **Signature:** the *one* memorable thing (a typographic treatment, an interaction, an illustration style, a
  layout idea) — and what stays quiet around it.
- **Motion:** what moves, why, and how fast.

**Pass 2 — challenge the plan.** For each part ask: *would I produce this for any similar brief?* If yes, it's a
default, not a choice — revise it and say what changed and why. Check against the slop list (§3).

**Build** following the revised plan, then **critique**: take screenshots if the environment allows (browser pane,
preview), view at desktop, tablet and phone widths, in light/dark if both exist, and fix what you see. Before
finishing, remove one accessory — cut the decoration that does the least work.

---

## 3. The slop list — defaults that make a page look generated

These are fine *when the brief calls for them*; never reach for them by reflex:
1. Warm cream background (~`#F4F1EA`) + high-contrast serif + terracotta/clay accent (~`#D97757`).
2. Near-black background with one acid-green / vermilion / electric-purple accent.
3. Purple-to-blue (or pink-to-orange) gradient washes, blurred gradient "blobs", glowing orbs as decoration.
4. Broadsheet cosplay: hairline rules everywhere, zero radius, dense newspaper columns with no reason.
5. The SaaS card kit: everything chopped into identical rounded cards, one radius on everything, the same
   `rgba(0,0,0,.1)` shadow under each, three feature cards with an icon in a tinted circle.
6. Hero = huge number + tiny label + stats row + gradient accent; or centered headline + subhead + two buttons + screenshot in a fake browser frame.
7. Template chrome: a tracked-out ALL-CAPS eyebrow over every heading; `A · B · C` meta strings; `WORD — fragment`
   labels; monospace for small labels; `→` appended to every link/button; "01 / 02 / 03" markers on content that isn't a sequence.
8. Accenting one word of the headline in italic, gradient or a different color.
9. Emoji as icons; generic stock 3D illustrations; random sparkle ✨ icons for "AI".
10. Fade-and-slide-up on every section, hover-lift on every card, parallax for its own sake.
11. Filler copy: "Unlock the power of…", "Seamlessly…", "Elevate your workflow", "Built for the modern…", testimonials from "Sarah K.".
12. Inter/Roboto/system font chosen only because it's there.

If you catch yourself producing any of these, stop and make a decision grounded in §1.

---

## 4. Layout

- **Have a grid and stick to it.** 12-column for marketing/editorial (max content ~1100–1280px), simple 1–3 column
  flows for apps. Edges line up: text, images and controls share left edges; nothing floats "about there".
- **Left-align by default.** Centered text only for short, isolated statements (hero line, empty state, dialog);
  never center paragraphs longer than ~3 lines.
- **Readable measure:** body text 45–75 characters per line (aim ~65); serif can run slightly longer.
- **Hierarchy before decoration.** Each screen has one obvious entry point (largest/highest-contrast element), then
  a clear secondary level, then everything else. Squint test: blur your eyes — the order should still read.
- **Group by proximity.** Related items sit closer together than unrelated ones (internal spacing < external
  spacing, at least 1.5–2×). Use space to separate groups before reaching for borders, boxes or dividers.
- **Asymmetry with intent.** A strong layout often pairs a dominant element with a quieter column; vary section
  rhythm (wide/narrow, dense/airy) instead of stacking identical bands.
- **Structure is information.** Borders, numbering, labels, eyebrows and dividers must encode something true about
  the content (a sequence, a category, a boundary). If it encodes nothing, delete it.
- **Hero / first view:** lead with the most characteristic thing in the subject's world — a product in use, a
  bold type statement, a live demo, an interactive moment, a strong photograph. The primary action is visible
  without scrolling.
- **App layouts:** stable navigation (sidebar or top bar) that doesn't move between screens; content area with
  consistent page header (title, context, primary action on the right); dense data in tables/lists, not cards.
- **Responsive from the start:** design fluid (`clamp()`, `minmax()`, `auto-fit` grids, container queries), check
  320px, 375px, 768px, 1024px, 1440px, and very wide. No horizontal scroll, ever. Touch targets ≥ 44px on touch.

See `references/layout-spacing.md` for scales, grids and wireframe patterns.

---

## 5. Spacing

- **Base unit 4px; work on an 8px rhythm.** Scale: `4, 8, 12, 16, 24, 32, 48, 64, 96, 128`. Pick from the scale;
  don't invent 13px or 27px gaps.
- **Spacing grows with hierarchy:** inside a control 8–12px → between related items 8–16px → between groups
  24–32px → between sections 64–128px (desktop), roughly half on mobile.
- **Generous, not empty.** Whitespace should frame content; if a section feels sparse, the content is too thin,
  not the padding too big.
- **Optical adjustments win:** icons beside text may need 1–2px nudges; text inside buttons sits visually
  centered (cap height), not mathematically; pad containers so rounded corners don't crowd content
  (nested radius = outer radius − padding).
- **Vertical rhythm:** line-height multiples (e.g. 24px body leading) for paragraph spacing.

---

## 6. Typography

- Typography carries the personality. Choose typefaces **for this brief** — from the subject's vernacular, era or
  tone — not the family you'd use anywhere. Good sources: Google Fonts, Fontshare, system stacks when native feel
  is the point.
- **One family, or two clearly different ones** (e.g. a characterful display + a quiet text face). Never two similar sans-serifs.
- **Set a real scale.** Use a ratio (1.2 minor third for dense apps, 1.25–1.333 for general, 1.5+ for editorial
  drama) and stick to its steps. Typically 5–7 sizes total.
- **Weights with purpose:** 2–3 weights. Contrast via size and weight, not color alone.
- **Tracking:** tighten large display type (−1% to −4%); loosen only small all-caps (+4–8%) — and use all caps
  rarely. Line-height ~1.4–1.6 for body, 1.0–1.2 for display; serif body gets slightly more.
- **Type as image:** when a headline is the visual element, treat it like one — scale, cropping, weight, width,
  alignment — not a neutral container for words.
- **Details:** tabular numerals for changing numbers/tables; real quotes and dashes (’ “ ” –); `text-wrap: balance`
  for headings, `pretty` for paragraphs; no widows in headlines; underline links in body text.

---

## 7. Color

- **Derive the palette from the subject** (its materials, environment, era), not from trends.
- **Structure:** ground (background), surface(s), ink, muted ink, one accent, plus semantic signals
  (success/warning/danger/info). Rough proportion 60% ground, 30% surfaces/ink, ≤10% accent.
- **Build ramps in OKLCH/HSL** so tints and shades stay in the same hue family; neutrals can carry a slight tint of
  the brand hue to feel cohesive.
- **Accent means "act here" or "look here".** If everything is accented, nothing is.
- **Contrast:** body text ≥ 4.5:1, large text and UI boundaries ≥ 3:1. Never encode meaning by color alone.
- **Dark mode is its own design**, not an inversion: lighter surfaces for elevation, desaturated accents,
  slightly off-white text.
- Real black/white are allowed; tinted near-blacks are a choice, not a default.

---

## 8. Shape, depth, imagery

- **Radius follows hierarchy:** small for small things (inputs, tags), larger for containers, full for pills/avatars —
  or deliberately zero across the board if the brief is sharp. Not one radius on everything.
- **Elevation is a system:** 2–3 levels max (flat, raised, floating). Shadows should be soft, layered, and tinted
  by the background — or replace shadows with borders/contrast for a flatter brand.
- **Icons:** one set, one stroke weight, one size grid (16/20/24). Pair with labels unless universally understood.
- **Imagery:** real photos/screens of the actual product or subject beat illustrations; consistent crop, ratio and
  treatment. Custom illustration only if it has a style specific to the brand.

---

## 9. Components & states

Every interactive element is designed in all its states: **default, hover, focus-visible, active/pressed, selected,
disabled, loading, error, empty.** Specifically:
- Buttons: one primary per view; secondary and tertiary visibly lower; verbs as labels; loading state keeps width.
- Inputs: visible label (not placeholder-as-label), helper text, inline validation on blur, clear error text.
- Lists/tables: zebra or dividers (not both), aligned numbers right, sticky headers for long tables, row actions on hover with keyboard access.
- Feedback: skeletons shaped like real content for loads > 300ms; optimistic updates; toasts that name what happened with Undo for destructive actions.
- Empty states: say what goes here and give the action to fill it.
- Dialogs: only for decisions that need focus; Escape closes; focus is trapped and returned.

---

## 10. Motion

- **Responsive motion is welcome:** anything that answers a user action — open, expand, confirm, drag, reorder —
  should animate to show what changed (150–300ms, ease-out to enter, ease-in to exit, spring for physical objects).
- **Ambient motion is rare:** at most one orchestrated moment per page (a load sequence, a single reveal, a hero
  interaction). No staggered fade-up on every section, no hover-lift on every card by default.
- Animate `transform` and `opacity`; avoid animating layout. Exits faster than entrances.
- Always honor `prefers-reduced-motion` (turn non-essential motion off, don't just shorten it).

---

## 11. Writing in the interface

- Words exist to help people understand and act. Decide what the screen must say before writing it.
- Name things from the user's side: "Notifications", not "Webhook config". Plain, specific, sentence case.
- Active, exact CTAs: "Save changes", "Book a table", "Download for Windows" — never "Submit", "Learn more" everywhere.
- Keep vocabulary consistent through a flow: the "Publish" button produces a "Published" toast.
- Errors say what happened and how to fix it, in the product's voice; no apologies, no vagueness.
- Empty screens invite the next action. Cut filler adjectives and marketing fog. One job per piece of text.

---

## 12. Quality floor (always, without announcing it)

- Responsive down to 320px; no horizontal scroll; images sized and lazy-loaded.
- Visible keyboard focus on everything interactive; logical tab order; semantic HTML (`button`, `nav`, `main`, headings in order); `alt` text; labels on icon-only buttons.
- Contrast passes WCAG AA; color isn't the only signal.
- Reduced motion respected; no layout shift when fonts/images load (set dimensions, `font-display: swap`).
- CSS is maintainable: tokens as custom properties, low and consistent selector specificity (watch for type
  selectors like `.section` padding fighting component selectors like `.cta`), no `!important` battles.
- Performance: few font files, no giant unused libraries, animations on the compositor.

---

## 13. Final critique checklist

- [ ] Could this design be swapped onto a different product without anyone noticing? If yes, it's generic — push the subject-specific choices further.
- [ ] Nothing from the slop list (§3) is present by accident.
- [ ] One clear signature element; everything else quiet.
- [ ] Squint test passes: one entry point, clear hierarchy.
- [ ] All spacing from the scale; edges aligned to the grid; groups separated by space.
- [ ] Type scale has ≤7 sizes, ≤3 weights; measure ≤75ch.
- [ ] Every structural device (labels, numbers, rules, boxes) encodes real information.
- [ ] All interactive states exist; empty/error/loading designed.
- [ ] Copy is specific, active and consistent.
- [ ] Checked visually at phone, tablet and desktop widths; quality floor met.
- [ ] One accessory removed.
