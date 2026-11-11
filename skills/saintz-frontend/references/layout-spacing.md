# Layout & spacing reference

## Spacing scale (4px base, 8px rhythm)
| Token | px | Typical use |
|---|---|---|
| `--s-1` | 4 | icon–text gap, tight inline gaps |
| `--s-2` | 8 | gap inside a control group, label → input |
| `--s-3` | 12 | control padding (vertical), list row padding |
| `--s-4` | 16 | control padding (horizontal), gap between related items |
| `--s-5` | 24 | card padding, gap between form fields groups |
| `--s-6` | 32 | gap between groups/blocks |
| `--s-7` | 48 | small section spacing, mobile section spacing |
| `--s-8` | 64 | section spacing |
| `--s-9` | 96 | large section spacing |
| `--s-10` | 128 | hero / major section breaks on wide screens |

Rule of thumb: space **inside** a group ≤ half the space **between** groups.
Fluid section spacing: `padding-block: clamp(48px, 8vw, 128px);`

## Type scales
| Ratio | Name | Steps from 16px (approx) | Good for |
|---|---|---|---|
| 1.2 | minor third | 13, 16, 19, 23, 28, 33 | dense apps, dashboards |
| 1.25 | major third | 13, 16, 20, 25, 31, 39, 49 | general UI, product sites |
| 1.333 | perfect fourth | 12, 16, 21, 28, 38, 50 | marketing, content sites |
| 1.5 | perfect fifth | 11, 16, 24, 36, 54, 81 | editorial, bold display |

Fluid display size example: `font-size: clamp(2.5rem, 1.6rem + 4vw, 5rem);`
Body 16–18px on web (15–17 in desktop apps, 13–14 in dense tools). Measure: `max-width: 65ch`.

## Grids
- **Marketing / editorial:** 12 columns, gutter 24px (16 mobile), max width 1120–1280px, side margin `clamp(16px, 5vw, 64px)`.
- **Apps:** sidebar 220–280px + fluid content; content max ~960–1200px for forms/text, full width for tables/boards.
- **Card/gallery grids:** `grid-template-columns: repeat(auto-fill, minmax(min(100%, 240px), 1fr));`
- **Breakpoints to check:** 320, 375, 768, 1024, 1280, 1440, 1920+. Prefer container queries for components.

## Radius & elevation
- Radius scale example: 4 (tags, inputs-sm) · 8 (inputs, buttons) · 12–16 (cards, panels) · 24 (modals, sheets) · full (pills, avatars). Nested radius = outer − padding.
- Elevation: level 0 flat; level 1 `0 1px 2px rgb(0 0 0 / .06), 0 1px 1px rgb(0 0 0 / .04)`; level 2 `0 8px 24px rgb(0 0 0 / .12)`; level 3 (floating) `0 24px 64px rgb(0 0 0 / .2)`. Tint shadows toward the background hue.

## Wireframe patterns (pick for the content, not by habit)
```
Split hero (product shown in use)      Type-led hero                    Index / catalog
+----------------+---------------+     +---------------------------+     +------+--------------------+
| Headline       |               |     | HUGE STATEMENT SET AS     |     | Nav  | Filters            |
| one-line value |   real        |     | THE IMAGE ITSELF          |     | list +---+---+---+---+---+
| [Primary] sec. |   product     |     |                           |     |      |   |   |   |   |   |
+----------------+---------------+     | small supporting line [CTA]|    |      +---+---+---+---+---+
                                       +---------------------------+     +------+--------------------+

App shell                              Long-form / editorial            Settings
+----+------------------------------+  +-----------+---------------+    +------------+---------------+
|    | Page title       [Primary]   |  |           | Title         |    | Section    | Label   [ctl] |
| N  +------------------------------+  |  margin   | body text at  |    | list       | help text     |
| a  | toolbar / filters            |  |  notes    | ~65ch measure |    |            +---------------+
| v  | table / list / board         |  |           | figures break |    |            | Label   [ctl] |
+----+------------------------------+  +-----------+---------------+    +------------+---------------+
```

## Alignment checklist
- One left edge per column; headings, body and buttons share it.
- Numbers right-aligned in tables; text left-aligned; don't center table cells by default.
- Icons optically centered with text (align to cap height / x-height center).
- Baselines line up across adjacent columns where possible.
