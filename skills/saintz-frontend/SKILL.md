---
name: saintz-frontend
description: Process and quality bar for distinctive, intentional front-end design that never reads as generic "AI slop". Use whenever creating or reshaping any user interface — websites, landing pages, portfolios, web apps, desktop app windows, dashboards, onboarding flows, forms, settings, components, mockups, prototypes, HTML artifacts, emails or slides with custom styling — in any stack (HTML/CSS/JS, React/Vue/Svelte, Tailwind, Electron, Tauri, WPF/WinUI, SwiftUI, Flutter). Also use when asked to make something look better, less generic, more professional, modern, clean, premium, unique or "designed", to pick a palette, typefaces, layout, spacing, motion or copy, or to critique/review a UI's visual design.
---

# Saintz Frontend

Design like the lead of a small studio whose clients pay for a point of view. The result must look like it was
made **for this product and these people, on purpose** — something you couldn't move onto a competitor's site
without everyone noticing. Distinctive does not mean loud: great apps (Linear, Things, Stripe, Arc, Raycast,
Apple's apps, Teenage Engineering) are calm, disciplined systems with one or two memorable decisions.

**Why this skill has hard steps:** a list of things to avoid is not enough — left alone, the model drifts back to
the statistically likely design (dark background + one bright accent, everything in rounded cards, a tiny label
above every heading, `A · B · C` meta lines, the category's stock look). So the process below has **required
outputs and a required check**. Do not skip them, even for "quick" UIs.

**With `saintz-design`:** that skill is Saintz's house look (dark liquid glass). When it applies, it supplies the
visual language; *this* skill still runs the full process, budgets and check. Nothing in the house style exempts a
design from §6–§7. The user's explicit words override both skills.

---

## 1. Required step A — The brief (write it out)

Before any code, write this block in your response (short):

```
Subject:   what it actually is, one sentence
Audience:  who, how often, what device, what mood
Job:       the one thing a visitor must do or understand
Angle:     what makes THIS one different from others in its category
Unique:    the content only this product has (data, artifacts, voice, people)
```

If the brief is vague, propose these and confirm. Use what you know about the user as hints.

**The angle is the most important line.** "A sports league site" has no angle. "A league between 8 friends, run
from a group chat, where the trash talk matters more than the stats" does — and it changes everything downstream.

## 2. Required step B — Ban the obvious

Write the **3–5 choices anyone would make first for this category**, then rule them out:

```
Obvious for <category>: <choice>, <choice>, <choice>, <choice>
Banned unless the brief asks for them.
```

Examples: sports → turf green, condensed athletic type, score ticker, giant ghost numbers, ESPN layout;
finance → navy + green, line charts in cards, "trusted by" logos; developer tool → near-black + neon,
monospace everywhere, terminal hero; wellness → beige/sage, soft serif, blob shapes; AI product → purple
gradients, sparkles, glowing orb; music → black + one neon, waveform hero; restaurant → cream + serif + terracotta.

Using the subject's world is good; using **its stereotype** is slop. Go one layer deeper than the stereotype
(for the friends' league: the group chat, the commissioner's rulings, rivalries, receipts of bad trades — not
yard lines).

## 3. Required step C — The plan (compact tokens)

- **Concept:** one non-web reference for the look, grounded in the angle (a printed league newsletter, a
  fight poster, a lab notebook, a transit map, a trophy shelf, a receipt). It guides type, layout and texture.
- **Mode:** light or dark, **with a one-line reason**. Dark is not the default.
- **Color:** 4–6 named hex values with roles. State **where color comes from** — prefer the content (team colors,
  product photos, album art, categories, status) over a single brand accent painted on everything.
- **Type:** 1–2 families with roles and a scale (§8). Name why they fit the concept.
- **Layout:** one-sentence concept + ASCII wireframe of the first screen; compare two when unsure.
- **Hero:** what goes in the first view and why it's the most characteristic content (§5).
- **Signature:** the one memorable thing, and what stays quiet around it.

Then **challenge it**: for each line ask "would I write this for any similar brief?" If yes, change it and say
what changed. Then build.

## 4. Required step D — Check before you call it done

1. **Run the slop scan** on the files you wrote:
   `node <skill-dir>/scripts/slop-check.mjs <file-or-folder>`
   (`<skill-dir>` is this skill's folder, e.g. `~/.claude/skills/saintz-frontend`.) Fix every **FAIL**.
   For each **WARN**, fix it or state in one line why the brief needs it. If Node isn't available, do the same
   checks by searching the code for the patterns listed in §6.
2. **Look at it.** Render it (browser pane / preview / headless screenshot) at **375px and 1440px** wide, and
   review the screenshots against §6, §7 and §12. Fix what you see, re-check. If you truly cannot render,
   say so explicitly — don't claim it was reviewed.
3. **Remove one accessory** — the decoration doing the least work.
4. Report briefly: the angle, what was banned, the signature, and the scan result.

---

## 5. The first view

- Put the **most distinctive content** first — the thing only this product has. If the best feature is below the
  fold, the layout is wrong. (A league site's unique asset might be its pass charts or the group-chat banter, not a
  generic headline box.)
- The hero must contain **real content or a real visual**: product in use, a photograph, a live chart, an
  interactive moment, a strong typographic statement. **No hero that's an empty tinted box with text in a corner.**
  No decorative ghost numbers, faint grid lines or background blobs filling space.
- Not the stock patterns: big-number + small-label + stat row; centered headline + subhead + two buttons +
  screenshot in a fake browser; left text + right mockup with a glow behind it.
- One primary action. A second button only if it's a genuinely different job.

## 6. Hard budgets (the scan enforces most of these)

| Item | Budget |
|---|---|
| Middle-dot meta strings `A · B · C` | **0** — use line breaks, columns, or plain words ("Season 3, week 11") |
| Spaced em/en-dash labels `WORD — fragment` | **0** |
| `→` / `↗` appended to button/link text | **0** |
| Small labels above headings (eyebrows/kickers) | **≤ 1 per screen**, only if it carries real info; sentence case |
| `text-transform: uppercase` + letter-spacing on labels | **0** unless the concept demands it (then ≤ 1 style) |
| Monospace for small data labels | **0** unless the subject is code |
| Accent color uses per viewport | **≤ 3** (primary action, current state, one highlight) |
| Badge/pill/chip styles | **≤ 1 style**; color-coded chips only when color *is* the data |
| Card styles | **≤ 1**, and only for things that are objects (§7) |
| Distinct border-radius values | **≤ 3** |
| Gradient decoration / blurred blobs / glows with no content source | **0** |
| One word of a headline in a different color/italic/gradient | **0** |
| Emoji as icons, sparkles for "AI" | **0** |
| Ambient (non-user-triggered) animations | **≤ 1** orchestrated moment per page |
| Hover-lift on cards | only on items that open something, and not as the default for every box |
| Text smaller than 12px (13px for body/meta on web) | **0** |
| Body/meta text contrast | ≥ 4.5:1 (check muted grays on tinted backgrounds) |

## 7. Containers: stop the card kit

Cards are for **objects** — things you pick up as a unit (a product, a game, a person, a file). Everything else
should sit directly on the page, organized by **space, alignment, type and rules**:

- Lists and rankings → a real table or list with aligned columns (standings, leaderboards, settings).
- Stats → a row of numbers set in type, no boxes around each.
- News/updates → a typographic list or an editorial layout with varied sizes, not three equal tiles.
- Sections → separated by space (64–128px) and a heading, not by wrapping each in a panel.
- When you do use cards, vary their **importance**: one large, others smaller; not a grid of identical tiles.
- If removing a box loses no information, remove the box.

Test: take a screenshot and count the rounded rectangles. If most content lives inside them, restructure.

---

## 8. Typography

- Typography carries the personality. Choose families **from the concept** (§3), never the default you'd use
  anywhere (Inter/Roboto/system only when native feel *is* the point). Sources: Google Fonts, Fontshare, system.
- One family, or two clearly different ones. Never two similar sans-serifs.
- Real scale: ratio 1.2 (dense apps), 1.25–1.333 (general), 1.5+ (editorial). 5–7 sizes, 2–3 weights.
- Display type: tighten tracking (−1% to −4%), line-height 1.0–1.15, `text-wrap: balance`. Body: 1.45–1.6,
  `text-wrap: pretty`, 45–75 characters per line (aim ~65).
- **Type as image:** when a headline is the visual, use scale, weight, width, cropping and alignment actively.
- Tabular numerals for scores, stats, prices, times. Real quotes and apostrophes (’ “ ”).
- Hierarchy through size and weight first, color second.

## 9. Color

- Derive the palette from the concept and the content, not from trends. **Let content carry color** where it has
  any (team colors, photos, categories, status), and keep the chrome neutral.
- Roles: ground, surface (if needed), ink, muted ink, accent, signals. ~60/30/≤10.
- Build ramps in OKLCH so tints stay in-family; neutrals may carry a hint of the ground hue.
- Contrast: body ≥ 4.5:1, large text/UI boundaries ≥ 3:1; never color as the only signal.
- Dark mode is its own design: surfaces get lighter as they rise, accents desaturate, text is slightly off-white.
- Same-hue-on-same-hue (green cards on green ground) kills separation — change lightness by ≥ 8–10% L, or don't box it.

## 10. Layout & spacing

- **Grid:** 12 columns for marketing/editorial (max ~1120–1280px), 1–3 column flows for apps. Shared left edges.
  Rows that don't fill their width (a 4-item strip in a 6-item space) either stretch, scroll, or get a different layout.
- **Left-align by default**; center only short isolated statements.
- **Hierarchy:** one entry point per screen; squint test must show the order.
- **Proximity:** space inside a group ≤ half the space between groups. Separate with space before borders.
- **Rhythm:** vary sections (wide/narrow, dense/airy, full-bleed/contained) instead of stacking identical bands.
- **Spacing scale (4px base):** `4, 8, 12, 16, 24, 32, 48, 64, 96, 128`. Inside controls 8–12, related items
  8–16, groups 24–32, sections 64–128 (about half on mobile).
- **Structure is information:** numbering only for real sequences; labels, rules and boxes only when they encode
  something true.
- **Responsive from the start:** `clamp()`, `minmax()`, `auto-fit`, container queries. Check 375 / 768 / 1024 /
  1440. No horizontal scroll. Touch targets ≥ 44px.

See `references/layout-spacing.md` for scales, grids, container alternatives and wireframe patterns.

## 11. Components, motion, writing

**States:** design default, hover, focus-visible, active, selected, disabled, loading, error and empty for every
interactive element. One primary button per view. Inputs have visible labels, helper text, inline errors.
Skeletons shaped like real content. Toasts name what happened; destructive actions offer Undo.

**Motion:** motion that answers an action (open, expand, confirm, reorder) is welcome — 150–300ms, ease-out in,
faster out, springs for physical objects. Ambient motion: one orchestrated moment max. No fade-up on every
section. Animate transform/opacity only. Honor `prefers-reduced-motion` by turning non-essential motion off.

**Writing:** name things from the user's side; plain, specific, sentence case; exact CTAs ("Submit result",
"Book a table", never "Submit"/"Learn more" everywhere); same verb through a flow (Publish → Published);
errors say what happened and how to fix it; empty states invite the next action. Write in the product's real
voice — if the product has personality (a friends' league), the copy should too. Real content only, no lorem
ipsum, no "Feature One", no "Unlock / Seamless / Elevate / Supercharge".

## 12. Quality floor (always)

Responsive to 320px, visible keyboard focus, semantic HTML and labels on icon buttons, AA contrast,
reduced motion, no layout shift (sized media, `font-display: swap`), tokens as CSS custom properties,
low, consistent selector specificity (watch `.section` padding fighting `.cta` padding), no `!important` wars,
few font files.

## 13. The generic-default catalogue (for calibration)

Legitimate when a brief asks for them, never by reflex:
1. Cream (~`#F4F1EA`) + high-contrast serif + terracotta (~`#D97757`).
2. Near-black + one acid-green / vermilion / orange / electric-purple accent.
3. Purple→blue or pink→orange gradients, blurred blobs, glowing orbs, corner glows.
4. Broadsheet cosplay: hairlines everywhere, zero radius, dense columns for no reason.
5. The SaaS card kit: identical rounded cards, one radius, `rgba(0,0,0,.1)` shadow, icon-in-tinted-circle feature trio.
6. Template chrome: uppercase tracked eyebrows, `·` meta, `WORD — fragment`, mono labels, `→` on links, fake `01/02/03`.
7. The category stereotype (§2).
8. Empty hero box; ghost numbers; decorative grid lines.
9. Tinted status chips sprinkled on every item.
10. Filler copy and fake testimonials.
