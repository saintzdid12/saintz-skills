# Layout & spacing reference

## Spacing scale (4px base, 8px rhythm)
| Token | px | Typical use |
|---|---|---|
| `--s-1` | 4 | icon–text gap, tight inline gaps |
| `--s-2` | 8 | inside a control group, label → input |
| `--s-3` | 12 | control padding (vertical), list row padding |
| `--s-4` | 16 | control padding (horizontal), related items |
| `--s-5` | 24 | between groups inside a section |
| `--s-6` | 32 | between blocks |
| `--s-7` | 48 | section spacing on mobile |
| `--s-8` | 64 | section spacing |
| `--s-9` | 96 | major section spacing |
| `--s-10` | 128 | hero / chapter breaks on wide screens |

Inside a group ≤ half of the space between groups. Fluid sections: `padding-block: clamp(48px, 8vw, 128px);`

## Type scales
| Ratio | Name | Steps from 16px (approx) | Good for |
|---|---|---|---|
| 1.2 | minor third | 13, 16, 19, 23, 28, 33 | dense apps, dashboards |
| 1.25 | major third | 13, 16, 20, 25, 31, 39, 49 | general UI, product sites |
| 1.333 | perfect fourth | 12, 16, 21, 28, 38, 50 | marketing, content |
| 1.5 | perfect fifth | 11→13 min, 16, 24, 36, 54, 81 | editorial, bold display |

Fluid display: `font-size: clamp(2.5rem, 1.6rem + 4vw, 5rem);` Body 16–18px on web, 14–16 in apps.
Never below 12px. Measure `max-width: 65ch`.

## Grids
- **Marketing / editorial:** 12 columns, 24px gutter (16 mobile), max 1120–1280px, side margin `clamp(16px, 5vw, 64px)`.
  Use the columns asymmetrically (7/5, 8/4, 3/9), not just halves and thirds.
- **Apps:** nav 220–280px + fluid content; text/forms max ~720–960px, tables/boards full width.
- **Galleries of real objects:** `repeat(auto-fill, minmax(min(100%, 240px), 1fr))`.
- **Breakpoints to check:** 375, 768, 1024, 1440, 1920. Prefer container queries for components.
- **Rows that don't fill:** a strip with fewer items than space → let items stretch, make it a scroller that
  bleeds off the edge, or change the layout. Never stop at two-thirds width with dead space.

## Containers: what to use instead of a card
| Content | Instead of cards… |
|---|---|
| Rankings, standings, leaderboards | a table: aligned columns, tabular numbers, a rule every row or zebra (not both), the user's row highlighted |
| Stats / KPIs | numbers set large in type on the page, labels under them, separated by space or one vertical rule |
| News, updates, posts | a typographic list (date / headline / one line), or an editorial layout with one lead story bigger than the rest |
| Scores / schedule | a compact table or a horizontal strip with dividers, not boxed tiles |
| Settings | grouped rows: label + description left, control right, hairline between rows |
| Features / benefits | prose with one strong visual each, alternating layout; not an icon-trio |
| Sections | space + heading; change background only to mark a genuinely different mode (e.g. a full-bleed band) |

Cards remain right for **objects**: a product, a game you can open, a person, a file, a draggable item.
When used, make one style and vary size by importance.

## Radius & elevation (pick ONE approach per project)
- **Radius:** at most 3 steps tied to size, e.g. small 4–6 (inputs, tags) · medium 10–12 (buttons, objects) ·
  large 20–28 (sheets, dialogs) — plus full for pills/avatars. Or all-square if the concept is sharp.
  Nested radius = outer − padding.
- **Elevation:** only things that float (menus, popovers, dialogs, sticky bars, dragged items) get shadows.
  Content on the page is flat. Shadows are soft, layered and tinted toward the ground color.

## First-screen patterns (pick for the content, not by habit)
```
Content-led (the unique asset is the hero)   Story-led (one lead + supporting)      Tool-led (the app is the hero)
+------------------------------------------+ +---------------------+--------------+ +----+-------------------------+
| headline set big, one line of context    | | LEAD STORY          | 2nd story    | |    | page title     [Primary]|
| +--------------------------------------+ | | with real image /   | 3rd story    | | N  +-------------------------+
| |  live chart / product / photo /      | | | chart, large type   | 4th story    | | a  | the working surface:    |
| |  interactive moment, full width      | | |                     +--------------+ | v  | table / board / editor  |
| +--------------------------------------+ | |                     | small table  | |    |                         |
+------------------------------------------+ +---------------------+--------------+ +----+-------------------------+

Type-as-image                                Split with real visual                 Index / catalog
+------------------------------------------+ +----------------+-----------------+ +------+--------------------------+
| A STATEMENT SET SO LARGE IT IS           | | headline       |                 | | facets| sort / count            |
| THE IMAGE, cropped by the edge           | | one line       |  real photo /   | |      | object  object  object   |
| small context line          [action]     | | [action]       |  product in use | |      | object  object  object   |
+------------------------------------------+ +----------------+-----------------+ +------+--------------------------+
```

## Alignment checklist
- One left edge per column; headings, body and buttons share it.
- Numbers right-aligned in tables; text left-aligned.
- Icons optically centered with text (cap-height center), play triangles nudged right.
- Baselines align across adjacent columns where possible.
- Same-hue layering (green on green) needs ≥ 8–10% lightness difference — or remove the box.
