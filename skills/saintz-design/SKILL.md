---
name: saintz-design
description: Saintz's house design system — dark, monochrome "liquid glass" UI with frosted controls, white-as-selected, and springy motion, plus general high-quality GUI principles. Use for ANY visual or front-end work: designing, building, styling, restyling, polishing or reviewing a UI, app, window, page, website, landing page, component, layout, theme, overlay, settings screen, player, dashboard, popup or mockup — in any stack (HTML/CSS/JS, React, Electron, WebView2, Tauri, WPF/WinUI, SwiftUI, Flutter, etc.). Also use when asked to make something look better, modern, clean, premium, sleek, glassy, Apple-like or consistent, or to pick colors, fonts, spacing, icons or animations.
---

# Saintz Design — the house design system

> **Default look for everything Saintz builds.** Apply it to new UIs automatically. When editing an existing
> project that already has its own clear design system, follow that project's system first and use these rules
> only to fill gaps or polish. In non-CSS stacks, translate the values (colors, radii, durations, easing,
> blur/opacity) into that framework's equivalents.
>
> **Pairs with `saintz-frontend`**, which owns process, layout, spacing, copy and the quality floor. Use this skill's
> look for Saintz's own apps (or when the user asks for it); for other brands/briefs, `saintz-frontend` picks the
> look. Inside this house style, the uppercase eyebrows, `·` meta lines and hover lifts are deliberate, not slop.

Both apps share one visual language: **a black (or near-black) stage, content artwork as the only real color,
frosted glass controls floating on top, white as the "selected" color, and springy, physical motion.**
Reel is the large-screen (tvOS / Apple TV) expression; PebblePlayer is the compact (iOS / Apple Music) one.
Follow these rules unless the user asks otherwise. `references/tokens.css` holds copy-paste tokens and primitives.

---

## 1. Core principles (the "why")

1. **Content is the color.** The chrome is monochrome (white at various opacities on black). Color comes from
   posters, album art, and blurred ambient copies of them. Never paint large areas with brand color.
2. **Glass, not boxes.** Controls are translucent, blurred, rim-lit pills/cards over content — never flat grey
   rectangles. Depth comes from blur + inner top highlight + soft drop shadow, not from borders.
3. **White = selected / primary.** Active tab, on-chip, primary button: near-white fill (`rgba(255,255,255,.94)`)
   with **black text**. Everything else is glass with grey text. One primary per area.
4. **Everything responds.** Every clickable thing has hover (lift/scale/brighten), press (`scale(.9–.97)`), and
   a springy transition. Nothing snaps.
5. **Fluid, never broken.** Layout uses `clamp()`, `min()`, container queries and `auto-fill` grids so it fits at
   every window size; text truncates with ellipsis or line-clamp instead of overflowing; extras disappear
   progressively on short/narrow windows.
6. **Calm by default.** Secondary info is dimmed (`--text-2`, `--text-3`); row actions appear on hover; empty
   states are quiet glass cards with an icon, a title and one sentence.
7. **Write friendly, human copy.** Sentence case, no ALL CAPS buttons, toasts that say what happened
   ("Added to watchlist", "Got it — fewer like this"), with an **Undo** action for destructive things.

---

## 2. Color

### Base palette (dark only — set `color-scheme: dark`)
| Token | Value | Use |
|---|---|---|
| `--bg` | `#000` (Reel) / `#111014` (Pebble) | page background |
| `--text` / `--t1` | `#f5f5f7` / `#fff` | primary text |
| `--text-2` / `--t2` | `rgba(235,235,245,.64)` | secondary text, inactive tabs |
| `--text-3` / `--t3` | `rgba(235,235,245,.36–.38)` | captions, labels, metadata, placeholders |
| `--line` | `rgba(255,255,255,.08)` | dividers |
| `--glass-border` | `rgba(255,255,255,.09–.13)` | 1px glass edges |
| surface tint | `rgba(255,255,255,.035–.06)` | panels/tiles/rows |
| hover tint | `rgba(255,255,255,.06–.14)` | row/button hover |
| artwork placeholder | `#161618` / `#1c1c1e` | before images load |

Text hierarchy is **opacity on white**, never different hues of grey.

### Semantic colors (Apple system colors, used sparingly — dots, toggles, small badges)
- success / on-switch: `#34c759` (glow: `box-shadow: 0 0 10px rgba(52,199,89,.6)`)
- warning / offline: `#ff9f0a` / `#ffb340`
- danger: `#ff453a` solid, `#ff6b6b` text, tinted bg `rgba(255,69,58,.14)` + border `rgba(255,69,58,.25)`
- error text on dark: `#ff8a80` / `#ffb8ad`
- like/heart: `#ff4f7b`
- context-menu highlight (macOS): `#0a84ff`
- third-party brand only for its own attribution (e.g. Spotify `#1ed760`).

Tinted states = **color at 10–18% fill + 25–40% border + light-tinted text**, e.g. update pill
`color:#a6f4ba; background:rgba(52,199,89,.15); border:1px solid rgba(52,199,89,.4)`.

### Accent
Default accent is **white / mono**. An optional user-selectable accent (`--acc`) tints *highlights only*:
progress fills, scrub bar, stars, active dots, eyebrow text, toast action. Offered palettes:
ice `#7cc6ff`, mint `#6fe3b4`, lavender `#b9a4ff`, sunset `#ffad6b`, rose `#ff8fb1`, gold `#f4cf6a`;
Pebble's brand accent is pale cyan `#bfefff`. Use `color-mix(in srgb, var(--acc) 45%, transparent)` for tints.

### Ambient background
- Behind plain pages: a heavily blurred, desaturated copy of the current artwork
  (`filter: blur(70px) saturate(1.5) brightness(.55)`, `inset:-80px`, opacity ~.55) with a radial vignette to
  black, slowly drifting (`40s ease-in-out infinite alternate`).
- With no art: soft radial blobs — `radial-gradient(120% 80% at 20% 0%, #3a2a5c, transparent 60%),
  radial-gradient(100% 70% at 100% 100%, #1d3b4f, transparent 60%), #111014`.
- Cheap trick (Pebble): draw the art onto a ~32px canvas and stretch it — pre-blurred, zero per-frame cost.

---

## 3. Typography

- **Font stack:** `"SF Pro Display", -apple-system, Inter, "Segoe UI Variable Display", "Segoe UI", sans-serif`
  (Pebble: `Inter, -apple-system, "SF Pro Text", "Segoe UI Variable Text", "Segoe UI", system-ui`).
  Load Inter non-blocking: `<link ... media="print" onload="this.media='all'">`, `font-optical-sizing:auto`.
- Always: `-webkit-font-smoothing: antialiased; letter-spacing: -.005em;`
- **Tight tracking on big type**, neutral on small. Scale (Reel → large screens):

| Role | Size | Weight | Letter-spacing |
|---|---|---|---|
| Hero title | 56–60px (`clamp(36px,4.4vw,58px)`) | 700–800 | -.03 to -.04em, line-height 1–1.05 |
| Page title | 44px (34px in sub-apps) | 700 | -.035em |
| Sheet / section title | 24–26px | 700 | -.025em |
| Row title | 20px | 600 | -.015em |
| Card title / emphasis | 15–17px | 600 | -.01 to -.02em |
| Body | 14–16px, line-height 1.5–1.6 | 400–500 | default |
| Caption / meta | 12.5–13px | 500–600 | default |
| Tag / badge | 10.5–11.5px | 700 | +.03 to +.04em |
| Eyebrow (uppercase) | 11–13px | 700 | +.06 to +.08em, `text-transform:uppercase` |
| Giant number (stats/rank) | 36–150px | 700–800 | -.04 to -.08em |

- Pebble (compact): base 13px; title 19px/700; artist 15px; list primary 13.5px/600, secondary 12px; section
  heading 22px/700. Lyrics: `clamp(17px, 3.6cqmin + 6px, 38px)`, weight ~760.
- Odd half-sizes (12.5, 13.5, 14.5, 15.5) are intentional — use them for fine-tuning.
- **Numbers that change** (times, counts, ratings, clocks): `font-variant-numeric: tabular-nums`.
- Text on images: `text-shadow: 0 2px 14px rgba(0,0,0,.7)` or logo images with `filter: drop-shadow(...)`.
- Prefer the title's **logo artwork** over plain text when available (left-bottom anchored, `object-fit:contain`).
- Truncate: single-line `white-space:nowrap; overflow:hidden; text-overflow:ellipsis`;
  multi-line `display:-webkit-box; -webkit-line-clamp:2–3; -webkit-box-orient:vertical; overflow:hidden`.
- Use `text-wrap: pretty` for paragraphs/lyrics.

---

## 4. Spacing, sizing, radius

- No strict 4/8 grid; values cluster around **2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 34, 40, 44, 56, 64**.
  Default rhythm: **gap 2px** inside segmented strips, **6–10px** between buttons/chips, **12–16px** inside rows,
  **20–30px** between cards/sections, **30–40px** between page sections.
- **Page gutter:** `--gutter: 64px` (large screens). Compact windows: `14–16px` padding, `clamp(20px,4vw,40px)` when wide.
- Page top padding clears the floating nav: `padding: 104px var(--gutter) 90px`.
- **Control heights:** 30 (seg buttons), 34 (small btn / icon btn), 36 (`--ctl-h`), 38–42 (inputs, pills),
  44–46 (primary buttons), 52–64 (player buttons), 92 (big center play).
- **Radius scale** (bigger element → bigger radius; nested radius = outer − padding):
  - 999px — pills, chips, segmented controls, tags-as-pills, toasts, nav
  - 50% — icon buttons, avatars, play bubbles
  - 5–6px — badges, tiny thumbnails
  - 9–12px — small buttons, inputs (Pebble), menu items, segm buttons
  - 14px — buttons, inputs (Reel)
  - 16px (`--radius`) — cards/artwork, list rows
  - 18–22px — tiles, panels, popovers, context menus
  - 24–28px — sheets, side panels, large cards
  - 32–34px — setup/onboarding cards, the "below" sheet top corners
- **Artwork aspect ratios:** posters `2/3`, landscape/episode `16/9`, album art `1/1`. Size with `clamp()`:
  landscape `clamp(236px,19vw,310px)`, poster `clamp(138px,11vw,170px)`.

---

## 5. The glass recipe (most important)

**Liquid glass control** (pills, nav, segmented controls, secondary buttons):
```css
background: linear-gradient(180deg, rgba(255,255,255,.14) 0%, rgba(255,255,255,.05) 55%, rgba(255,255,255,.03) 100%),
            rgba(38,38,44,.38);
border: 1px solid rgba(255,255,255,.13);
box-shadow: inset 0 1px 0 rgba(255,255,255,.24),      /* lit top edge */
            inset 0 -1px 0 rgba(255,255,255,.04),
            inset 0 0 0 .5px rgba(255,255,255,.05),
            0 12px 36px rgba(0,0,0,.32);              /* lift */
backdrop-filter: blur(40px) saturate(210%) brightness(1.04);
```
**Floating surface** (popovers, menus, sheets, panels): darker, more opaque —
`background: linear-gradient(180deg, rgba(64,64,70,.6), rgba(28,28,32,.74)); border: 1px solid rgba(255,255,255,.12);
box-shadow: inset 0 1px 0 rgba(255,255,255,.16), 0 30px 90px rgba(0,0,0,.55); backdrop-filter: blur(50px) saturate(200%);`

**Content panel / tile** (no blur needed): `linear-gradient(180deg, rgba(255,255,255,.06), rgba(255,255,255,.025))`
+ `inset 0 1px 0 rgba(255,255,255,.07)` + 1px glass border.

**Performance rule:** on low-power renderers (WebView2 overlays, mini players) use a small blur (~14px) or a
near-opaque gradient (`rgba(40,38,48,.97)`) instead of a big backdrop blur — the ambient art is already soft.
Always include `-webkit-backdrop-filter` alongside `backdrop-filter`.

Glass extras:
- A sheen: `::before` with `radial-gradient(120% 90% at 15% -20%, rgba(255,255,255,.22), transparent 55%)`.
- **Cursor-following highlight:** JS sets `--mx/--my` on pointermove; `::before` =
  `radial-gradient(180px circle at var(--mx) var(--my), rgba(255,255,255,.16), transparent 65%)`, fades in on hover.
- **Press ripple:** an 8px dot at the click point, `scale(28)` + fade over .6s; dark ripple on white buttons.

---

## 6. Components (conventions)

**Navigation**
- Floating, centered **pill tab bar** (glass) with a sliding white **indicator** that springs to the active
  tab (`transition: transform .45s var(--spring), width .45s var(--spring)`); active label turns black.
- Right-side **cluster pill**: clock (tabular), icon buttons (search, social, settings).
- **Back** button: glass pill, slides in from the left only when there's history.
- Nav background is transparent over the hero, becomes `rgba(0,0,0,.5)` + blur + hairline once scrolled.
- Frameless window: a 44px `-webkit-app-region: drag` strip, controls set to `no-drag`.
- Compact apps: a full-width **segmented control** (grid of N equal buttons) with a sliding glass thumb.
  Hide tab icons when it gets tight.
- Sidebars become a horizontal pill strip under ~1120px.

**Buttons**
- `.btn`: 46px tall, radius 14px, 600 weight, 15px, glass; hover `scale(1.04)` + brighter glass + shadow;
  active `scale(.97)`; disabled `opacity:.4; pointer-events:none`.
- Variants: `primary` (white, black text, inner white top highlight), `ghost` (transparent, grey text),
  `small` (34px, 13px, radius 10), `round` (circle), `danger` (red tint), `danger-solid`.
- **Icon button:** 34px circle, transparent; hover `rgba(255,255,255,.14)` + `scale(1.08)`; active state = white bg/black icon.
- **Play bubble:** 64px circle glass with strong top highlight `inset 0 1px 0 rgba(255,255,255,.55)`.
- Keyboard shortcuts shown as `kbd` chips inside buttons, pushed right with `margin-left:auto`.
- The **"⋯" more button** on every item (32px glass circle, appears on hover, top-left of artwork) opens the context menu.

**Segmented controls / chips** — one style everywhere: glass pill strip, `padding:3px`, `gap:2px`, buttons
30px tall, 13px/600, grey; hover light tint; `.on` = white fill, black text, `box-shadow: 0 2px 10px rgba(0,0,0,.28)`.
Scrolls horizontally with hidden scrollbar when it overflows.

**Cards (artwork)**
- Radius 16px, `box-shadow: 0 8px 24px rgba(0,0,0,.4)`, inner 1px ring `inset 0 0 0 1px rgba(255,255,255,.06)`.
- **Hover (tvOS focus):** `scale(1.07) translateY(-4px)`, deep shadow `0 30px 60px rgba(0,0,0,.7)`, a diagonal
  light **sheen** fades in, caption brightens from `--text-3` to `--text-2`. Spring timing, .45s.
- Caption below: title 14px/600 + sub 12.5–13px `--text-3`, both ellipsized and the same width as the art.
- Overlays on art: bottom shade gradient, title/logo bottom-left, 4px progress bar (white/accent) 12–16px from edges,
  status dot top-right (22px blurred circle).
- Images **fade in** over a shimmer skeleton (`opacity 0 → 1, .5s`) — never pop in. Lazy-load with IntersectionObserver.
- Seen/disabled items: `opacity:.38; filter: saturate(.3)`.
- **Shelves:** horizontal scroll rows that bleed to the window edge (negative gutter margins), `scroll-snap-type:x proximity`,
  hidden scrollbar, `gap:22px`. Plain mouse wheel scrolls the page vertically; Shift+wheel/trackpad scrolls sideways.
- **Grids:** `repeat(auto-fill, minmax(156px, 1fr))`, `gap: 30px 22px`.

**Hero**
- Full-bleed artwork, ~`clamp(440px,66vh,760px)`, slow Ken Burns zoom (24s alternate), two gradients
  (left-to-right dark for text, bottom-to-black to merge into page), content bottom-left, max-width ~540px.
- Eyebrow pill (glass, 13px/600), logo/title, meta line with outlined badges, 2–3-line overview, buttons.
- Pagination dots: 7px dots, active one stretches to 22px.
- Progressive disclosure via height media queries: hide eyebrow < 760px tall, overview < 680px.

**Detail page** — fixed blurred backdrop artwork; content below on a **dark glass sheet** with 34px top corners
(`rgba(8,8,10,.72)` + blur 48px), sliding up over the art.

**Lists / rows** — rows 6–12px padding, radius 10–16px, hover `rgba(255,255,255,.05–.08)`, active `.13`;
40px thumbnail (radius 6); primary 13.5–15px/600, secondary 12–13px dim; trailing actions hidden until hover.
Settings use **grouped inset lists** (iOS): group radius 14, `rgba(255,255,255,.06)` bg, rows separated by 1px
`rgba(255,255,255,.07)`, each row = title + one-line description + control on the right.

**Inputs** — radius 12–14px, `rgba(255,255,255,.06)` fill, 1px glass border; focus = brighter border
`rgba(255,255,255,.3–.35)` + soft ring `0 0 0 4px rgba(255,255,255,.06)`; no default outline. Labels 13px/600 `--text-2`
above; hints 12.5px `--text-3` below. Search field is big (22px text, radius 18).

**Toggles** — iOS switch: 44×26 track, 22px white knob with shadow, on = `#34c759` (or `--acc-on`), knob moves with spring.

**Sliders / scrubbers** — 4–5px track, `rgba(255,255,255,.2–.25)`, filled part white via gradient `var(--p)`;
track thickens on hover (5 → 7–9px) and the thumb grows from 0/small to 13–15px. Hover tooltip shows time.

**Popovers, menus, sheets**
- Popover: radius 22, padding 8, items 9px 12px radius 12, selected item gets a small white dot on the right.
- Context menu: radius 18 (Reel) / 11 (Pebble macOS style, blue `#0a84ff` hover), title row in `--text-3`, icons 16px at .8 opacity, 1px separators.
- Modal backdrop: `rgba(0,0,0,.35–.45)` + `blur(18px)`. Sheet: max 680px (wide 920), radius 28, padding 30.
- Side panels slide in from the right (`translateX(30px) → 0`, spring).
- Close on outside mousedown and Escape; animate out (`popOut .18s`) before removal.

**Feedback**
- **Toast:** glass pill bottom-center (Pebble: top-center), 14px/600, springs up from 20px below;
  error variant tinted red; optional white **Undo** pill button inside.
- **Status pills:** small dot (7–8px, glowing, pulsing when pending) + label, e.g. offline / update available.
- **Loading:** 40px ring spinner (3px border, white top), or shimmer skeletons shaped like the real content.
- **Empty states:** centered glass card, 56px circular icon well, 22px title, one muted sentence, optional button.
- **Tooltips:** 12.5px/600 dark glass, radius 10, appear in .18s with a tiny spring.

**Onboarding / setup** — single centered glass card (≤560px, radius 32), step indicator bars (active bar wider + accent),
numbered vertical steps with a connecting line, green check circle when done, primary CTA full width.

**Player** — black stage; artwork blurred behind while loading; chrome (top bar, center controls, bottom
timeline) fades out after idle and hides the cursor; gradients top (160px) and bottom (280px) for legibility;
center flash icon on play/pause/seek; subtitles move up when chrome is visible. Pause screen shows title info
on a left-dark gradient.

---

## 7. Motion

**Curves (define once as tokens):**
- `--spring: cubic-bezier(.2, .9, .25, 1.1)` — Reel overshoot; Pebble's bouncier `cubic-bezier(.34, 1.56, .64, 1)`
- `--ease: cubic-bezier(.25, .8, .25, 1)` — Reel standard; Pebble's iOS-like `cubic-bezier(.32, .72, 0, 1)`
- Decelerate for layout moves: `cubic-bezier(.2, .8, .2, 1)` / `cubic-bezier(.22, 1, .36, 1)`

**Use spring for** transforms (scale, translate, indicator moves, toggles, popovers). **Use ease for** opacity,
color, background, filters.

**Durations:** hover color .15–.25s · press/scale .25–.35s · cards & indicators .45s · page enter .5s ·
popovers/sheets .35–.4s · close .18–.25s · ambient fades 1–1.6s · Ken Burns/drift 24–40s.

**Standard keyframes:**
- `fade` — `opacity 0, translateY(8px) → none` (content entering)
- `pop` — `scale(.92) translateY(10px), opacity 0 → none` (popovers, sheets, menus; set `transform-origin` to the anchor)
- `enter` — **opacity only** for pages (a transform on a page re-anchors `position:fixed` children → flicker)
- `shimmer` — background-position sweep, 1.3–1.4s infinite
- `grow` / `growX` — bars scale from 0 with spring (charts)
- `ripple`, `kenburns`, `drift`, `bob` (scroll hint), pulse dots
- Stagger lists with `animation: fade .6s var(--ease) both` + small `animation-delay`s.

**Rules**
- Animate only `transform` and `opacity` where possible; give animated art its own layer (`will-change: transform`).
- Things disappear faster than they appear; some disappear in one step (no exit animation) to avoid ghosting.
- Button press is always `scale(.88–.97)`; hover lift is `1.03–1.1`.
- Layout changes (e.g. tall ↔ wide) cross-fade with a quick `scale(.97) → 1` instead of morphing.
- **Reduced motion:** respect `prefers-reduced-motion` *and* offer an in-app toggle; turn animations **off**
  (`animation:none !important; transition:none !important`) rather than shortening them — shortened loops flicker.

---

## 8. Layout patterns

- Root is `overflow:hidden`; one scrolling `main` view. Thin custom scrollbars (6–10px, `rgba(255,255,255,.1–.2)`, transparent track) or hidden on shelves.
- `body { user-select:none }`; re-enable for inputs/text areas. `img { -webkit-user-drag:none }`.
- Layered z-index plan: ambient (≤0) → view (1) → nav (60) → modals (200–700) → player (500) → menus (800) → toast (900) → launch (3000) → tooltip (2000+).
- Three layout modes for resizable windows (Pebble): **tall** (stacked), **wide** (art left, controls right),
  **stage** (big centered art, controls in a 3-column grid along the bottom). Switch mode in JS after the resize settles.
- Use **container queries** (`container-type: inline-size`) for components that live in variable-width panes.
- Keep the primary control **dead center** — use equal `minmax(0,1fr)` side columns; keep hidden siblings as
  `visibility:hidden` placeholders so centering doesn't shift.
- Apply `min-width:0` to flex/grid children that hold truncated text.
- Platform polish: draw custom macOS traffic lights in full screen; respect Windows drag regions.
- Launch screen: app icon + wordmark rising in with blur→sharp, a soft glow, and a light sweep across the wordmark; fades out with `scale(1.04)`.

---

## 9. Icons & imagery

- Inline SVG, 24×24 viewBox, `fill: currentColor`, rendered at 16–20px (13–15px in dense UI, 22–30px in players).
  Filled glyphs, SF-Symbols-like; stroke icons use 2.2px stroke with round caps.
- Optical corrections: nudge the play triangle ~.5px right.
- "On" state indicators: a 4px dot under the icon (shuffle/repeat) or icon turns white/accent.
- Artwork always gets rounded corners, a subtle inner ring, and a soft shadow; never square, never borderless on black.
- App icon: rounded square (~23% radius), gradient fill, inner top sheen.

---

## 10. General principles from top-tier GUIs (apply alongside the above)

From Apple (tvOS/iOS/macOS HIG), Linear, Arc, Raycast, Spotify, Things, Figma, Vercel/Stripe:
1. **Hierarchy through restraint** — 1 primary action per view; size/weight/opacity create hierarchy before color does.
2. **Consistent tokens** — every color, radius, shadow and duration comes from a small set of variables; don't invent one-offs.
3. **Alignment & rhythm** — align to a shared left edge (the gutter); keep vertical rhythm consistent between sections.
4. **Generous whitespace** — space separates groups better than lines; use dividers only inside dense lists.
5. **Optical over mathematical** — adjust for how things look (icon centering, tight tracking on large text, nested radii).
6. **Direct feedback < 100ms** — hover/press respond instantly; long work shows progress or skeletons, never a frozen UI.
7. **Forgiveness** — undo instead of confirm dialogs where possible; confirm only truly destructive, irreversible actions.
8. **Progressive disclosure** — hide advanced options behind "⋯", hover actions, expandable groups, or settings.
9. **Keyboard first-class** — command/search palette (Ctrl+K), visible shortcut hints, Escape closes, focus-visible rings.
10. **Accessibility** — 4.5:1 contrast for body text (don't push `--text-3` below ~.36 opacity on black for essential info),
    `aria-label` on every icon-only button, hit targets ≥ 32–44px, reduced-motion support, never rely on color alone.
11. **Speed is design** — lazy-load images, `content-visibility:auto` on long lists, animate GPU-friendly properties, avoid layout thrash.
12. **Personality in the details** — a launch animation, seasonal themes, delightful micro-interactions (heart pop, card sheen) — but never at the cost of clarity.

---

## 11. Checklist before finishing any UI

- [ ] Dark stage, monochrome chrome, color only from content (or a deliberate accent on highlights)
- [ ] Glass recipe on floating controls; floating surfaces darker and more opaque
- [ ] White fill + black text for the single selected/primary state
- [ ] Tokens for color, radius, easing; tabular numbers where values change
- [ ] Every interactive element has hover, press (scale), focus-visible, and a spring/ease transition
- [ ] Images fade in over skeletons; empty and error states designed
- [ ] Fits from small to fullscreen: clamp/min sizes, truncation, progressive hiding, no horizontal overflow
- [ ] Reduced-motion respected; icon buttons have aria-labels; contrast OK
- [ ] Copy is friendly sentence case; destructive actions offer Undo
