#!/usr/bin/env node
// saintz-frontend slop check: scans front-end files for generic "AI design" defaults and quality-floor misses.
// Usage: node slop-check.mjs <file-or-folder> [more paths...]   (no dependencies)
// Exit code 1 when any FAIL is found. FAIL = fix it. WARN = fix it or justify it in one line.

import fs from 'node:fs';
import path from 'node:path';

const EXT = new Set(['.html', '.htm', '.css', '.scss', '.less', '.js', '.mjs', '.jsx', '.ts', '.tsx', '.vue', '.svelte', '.astro', '.xaml']);
const SKIP_DIR = new Set(['node_modules', '.git', 'dist', 'build', 'out', '.next', '.nuxt', 'vendor', 'coverage', '.svelte-kit']);

const args = process.argv.slice(2);
if (!args.length) { console.log('Usage: node slop-check.mjs <file-or-folder> [...]'); process.exit(2); }

const files = [];
function walk(p) {
  let st; try { st = fs.statSync(p); } catch { console.error(`Not found: ${p}`); return; }
  if (st.isDirectory()) { for (const n of fs.readdirSync(p)) if (!SKIP_DIR.has(n)) walk(path.join(p, n)); }
  else if (EXT.has(path.extname(p).toLowerCase()) && !/\.min\.(js|css)$/.test(p) && st.size < 2_000_000) files.push(p);
}
args.forEach(walk);
if (!files.length) { console.log('No front-end files found.'); process.exit(0); }

// Blank out comments but keep line numbers.
const blank = (s) => s.replace(/[^\n]/g, ' ');
function stripComments(src, ext) {
  let s = src.replace(/\/\*[\s\S]*?\*\//g, blank).replace(/<!--[\s\S]*?-->/g, blank);
  if (!['.html', '.htm', '.css', '.xaml'].includes(ext)) s = s.replace(/(^|[^:"'`\\])\/\/[^\n]*/g, (m, p) => p + blank(m.slice(p.length)));
  return s;
}

const docs = files.map(f => {
  const ext = path.extname(f).toLowerCase();
  const raw = fs.readFileSync(f, 'utf8');
  return { f, ext, raw, src: stripComments(raw, ext) };
});

function hits(re, { only } = {}) {
  const out = [];
  for (const d of docs) {
    if (only && !only.includes(d.ext)) continue;
    const g = new RegExp(re.source, re.flags.includes('g') ? re.flags : re.flags + 'g');
    let m;
    while ((m = g.exec(d.src))) {
      const line = d.src.slice(0, m.index).split('\n').length;
      out.push({ f: d.f, line, text: d.raw.split('\n')[line - 1].trim().slice(0, 110), m });
      if (m[0].length === 0) g.lastIndex++;
    }
  }
  return out;
}

const results = [];
function report(level, name, list, advice) {
  const seen = new Set();
  list = list.filter(h => { const k = h.f + ':' + h.line + ':' + (h.f ? '' : h.text); if (seen.has(k)) return false; seen.add(k); return true; });
  results.push({ level: list.length ? level : 'PASS', name, list, advice });
}
const CSSISH = ['.css', '.scss', '.less', '.html', '.htm', '.vue', '.svelte', '.astro', '.jsx', '.tsx', '.js', '.ts', '.mjs'];

// ---- Template chrome ----
report('FAIL', 'Middle-dot meta strings (A · B · C)', hits(/\s(·|&middot;|&#183;|\\u00b7)\s/), 'Use line breaks, columns, or plain words ("Season 3, week 11").');
report('FAIL', 'Arrows appended to links/buttons (→ ↗)', hits(/(→|↗|&rarr;|&#8594;)/), 'Write an exact label instead; drop the arrow.');
report('WARN', 'Spaced dash labels (WORD — fragment)', hits(/[A-Za-z0-9'’"]\s(—|–|&mdash;|&ndash;)\s[A-Za-z]/), 'Fine in running prose; not as label/meta construction.');
const upper = hits(/text-transform\s*:\s*uppercase|\buppercase\b(?=[^"'`]*["'`])|textTransform\s*:\s*['"]uppercase/, { only: CSSISH });
report(upper.length > 1 ? 'FAIL' : 'WARN', 'Uppercase labels', upper, 'Budget 0 (≤1 style if the concept demands it). Use sentence case.');
const tracking = hits(/letter-spacing\s*:\s*(0?\.0[4-9]|0?\.[1-9]|[1-9])\d*em|letter-spacing\s*:\s*[1-9]\d*(\.\d+)?px|tracking-(wide|wider|widest)\b/);
report('WARN', 'Positive letter-spacing (tracked-out labels)', tracking, 'Tracked-out small caps are template chrome; tighten display type instead.');
const eyebrow = hits(/class(Name)?\s*=\s*["'{`][^"'`]*\b(eyebrow|kicker|overline|pretitle|pre-title|label-top)\b/);
report(eyebrow.length > 1 ? 'FAIL' : 'WARN', 'Eyebrow/kicker labels above headings', eyebrow, 'Budget ≤1 per screen, only when it carries real info.');
report('WARN', 'Monospace for labels', hits(/font-family\s*:[^;{}]*\b(monospace|Mono|Consolas|Menlo|Courier)\b|\bfont-mono\b/), 'Only if the subject is code.');

// ---- Decoration ----
const grad = hits(/radial-gradient\(|conic-gradient\(|linear-gradient\([^)]*(#[0-9a-f]{3,8}|rgba?\([^)]*\))[^)]*(#[0-9a-f]{3,8}|rgba?\()/i, { only: CSSISH });
report(grad.length > 6 ? 'FAIL' : 'WARN', 'Gradients (check for blobs, glows, washes)', grad, 'Every gradient needs a job (legibility over images, glass sheen). Decorative washes/blobs/corner glows: remove.');
report('WARN', 'Big blur filters (blob/glow decoration?)', hits(/(?<!backdrop-)filter\s*:[^;]*blur\(\s*([3-9]\d|\d{3,})px/), 'OK only when blurring real content (artwork ambience).');
report('FAIL', 'Accent word in headline (span/em inside h1–h2)', hits(/<h[12][^>]*>[^<]{0,80}<(span|em|i|strong|mark)\b[^>]*>/i), 'Set the whole headline in one treatment.');
report('FAIL', 'Emoji used in UI', hits(/\p{Extended_Pictographic}/u, { only: ['.html', '.htm', '.jsx', '.tsx', '.vue', '.svelte', '.astro', '.js', '.ts', '.mjs'] }).filter(h => !/[★☆✓✔✕✖×©®™]/.test(h.m[0])), 'Use a real icon set or words.');

// ---- Card kit ----
const radii = new Map();
for (const h of hits(/border-radius\s*:\s*([^;}"']+)/)) {
  const v = h.m[1].trim();
  if (/^(0|0px|50%|inherit|9{2,}px|var\(|calc\()/.test(v)) continue;
  radii.set(v, (radii.get(v) || 0) + 1);
}
const radList = [...radii.entries()].sort((a, b) => b[1] - a[1]).map(([v, n]) => ({ f: '', line: 0, text: `${v}  ×${n}` }));
report(radii.size > 5 ? 'FAIL' : radii.size > 3 ? 'WARN' : 'PASS', `Distinct border-radius values (${radii.size}, budget ≤3 + pill/circle)`, radii.size > 3 ? radList : [], 'Collapse to a 3-step radius scale tied to hierarchy.');
const cards = hits(/class(Name)?\s*=\s*["'{`][^"'`]*\b[\w-]*(card|tile|panel)\b/i);
report(cards.length > 8 ? 'FAIL' : cards.length > 4 ? 'WARN' : 'PASS', `Card/tile/panel elements (${cards.length})`, cards.length > 4 ? cards.slice(0, 12) : [], 'Cards are for objects. Lists, stats, news and sections should sit on the page (tables, type, space).');
const shadows = new Map();
for (const h of hits(/box-shadow\s*:\s*([^;}]+)/)) { const v = h.m[1].trim(); if (v !== 'none') shadows.set(v, (shadows.get(v) || 0) + 1); }
const sameShadow = [...shadows.entries()].filter(([, n]) => n >= 4).map(([v, n]) => ({ f: '', line: 0, text: `${v.slice(0, 80)}  ×${n}` }));
report('WARN', 'Same shadow repeated on many elements', sameShadow, 'Identical shadow on every box = card kit. Use elevation only where things float.');
report('WARN', 'Hover-lift on boxes', hits(/:hover[^{]*\{[^}]*transform\s*:[^;]*translateY\(\s*-/), 'Only on items that open something.');

// ---- Accent overuse ----
const colorCount = new Map();
for (const h of hits(/#([0-9a-f]{6}|[0-9a-f]{3})\b/i, { only: CSSISH })) {
  let hx = h.m[1].toLowerCase(); if (hx.length === 3) hx = hx.split('').map(c => c + c).join('');
  const [r, g, b] = [0, 2, 4].map(i => parseInt(hx.slice(i, i + 2), 16));
  const mx = Math.max(r, g, b), mn = Math.min(r, g, b);
  if (mx - mn < 60 || mx < 90) continue; // skip grays and very dark tints
  colorCount.set('#' + hx, (colorCount.get('#' + hx) || 0) + 1);
}
const top = [...colorCount.entries()].sort((a, b) => b[1] - a[1]);
const overused = top.filter(([, n]) => n > 8).map(([c, n]) => ({ f: '', line: 0, text: `${c}  ×${n}` }));
report('WARN', 'Saturated accent used in many places', overused, 'Accent budget ≤3 uses per viewport. Prefer a var(--accent) token and let content carry color.');

// ---- Type & legibility ----
const tiny = hits(/font-size\s*:\s*(\d+(\.\d+)?)px/).filter(h => parseFloat(h.m[1]) < 12)
  .concat(hits(/font-size\s*:\s*0?\.(\d+)(r?em)/).filter(h => parseFloat('0.' + h.m[1]) < 0.75))
  .concat(hits(/text-\[(\d+(\.\d+)?)px\]/).filter(h => parseFloat(h.m[1]) < 12));
report('FAIL', 'Text smaller than 12px', tiny, 'Minimum 12px (13px for body/meta on web).');
report('FAIL', 'Placeholder / filler copy', hits(/lorem ipsum|\bFeature (One|Two|Three)\b|John Doe|Jane Doe|Acme Inc/i), 'Use real, specific content.');
report('WARN', 'Marketing fog words', hits(/\b(unlock|seamless(ly)?|elevate|supercharge|empower|revolutioni[sz]e|cutting-edge|next-level|game-chang|effortless(ly)?|leverage|Learn more)\b/i, { only: ['.html', '.htm', '.jsx', '.tsx', '.vue', '.svelte', '.astro'] }), 'Say what it does, plainly.');
report('WARN', 'Numbered markers (01 / 02 / 03)', hits(/>\s*0[1-9]\s*(\/|\.|<)/), 'Only for real sequences (steps, timelines).');

// ---- Motion ----
const infinite = hits(/animation(-iteration-count)?\s*:[^;]*\binfinite\b/);
report(infinite.length > 2 ? 'WARN' : 'PASS', `Looping ambient animations (${infinite.length})`, infinite.length > 2 ? infinite : [], 'One orchestrated ambient moment max (spinners/skeletons excepted).');
const fadeUp = hits(/@keyframes\s+[\w-]*(fade[-_]?up|fadeInUp|slide[-_]?up|reveal)/i).concat(hits(/data-aos|\bAOS\.init|IntersectionObserver[\s\S]{0,300}(fade|reveal|visible)/));
report('WARN', 'Scroll-reveal / fade-up entrances', fadeUp, 'No fade-up on every section; one reveal moment at most.');
const animates = docs.some(d => /@keyframes|transition\s*:/.test(d.src));
const reduced = docs.some(d => /prefers-reduced-motion/.test(d.src));
report('FAIL', 'Motion without prefers-reduced-motion', animates && !reduced ? [{ f: '', line: 0, text: 'animations/transitions found, no @media (prefers-reduced-motion) rule' }] : [], 'Turn non-essential motion off under reduced motion.');

// ---- Quality floor ----
const outlineNone = hits(/outline\s*:\s*(none|0)\b/);
const hasFocus = docs.some(d => /:focus-visible|focus-visible:|focus:ring|focus:outline/.test(d.src));
report('FAIL', 'Focus outline removed with no focus-visible style', outlineNone.length && !hasFocus ? outlineNone : [], 'Add a visible :focus-visible style.');
const imp = hits(/!important/, { only: CSSISH });
report(imp.length > 8 ? 'WARN' : 'PASS', `!important (${imp.length})`, imp.length > 8 ? imp.slice(0, 8) : [], 'Fix selector specificity instead.');
const htmlDocs = docs.filter(d => ['.html', '.htm'].includes(d.ext) && /<html/i.test(d.src));
report('FAIL', 'HTML page missing viewport meta', htmlDocs.filter(d => !/name=["']viewport/.test(d.src)).map(d => ({ f: d.f, line: 1, text: '<meta name="viewport"> missing' })), 'Add <meta name="viewport" content="width=device-width, initial-scale=1">.');
const iconBtns = hits(/<button\b(?![^>]*aria-label)[^>]*>\s*<svg/i);
report('WARN', 'Icon-only buttons without aria-label', iconBtns, 'Add aria-label.');
report('WARN', 'Images without alt', hits(/<img\b(?![^>]*\balt=)[^>]*>/i), 'Add alt text (alt="" if decorative).');

// ---- Output ----
const base = (() => { const a = path.resolve(args[0]); try { return fs.statSync(a).isDirectory() ? a : path.dirname(a); } catch { return process.cwd(); } })();
const rel = (f) => { if (!f) return ''; const r = path.relative(base, path.resolve(f)); return r.startsWith('..') ? path.resolve(f) : r || path.basename(f); };
let fails = 0, warns = 0;
console.log(`\nsaintz-frontend slop check — ${files.length} file(s)\n`);
for (const r of results) {
  if (r.level === 'PASS') continue;
  r.level === 'FAIL' ? fails++ : warns++;
  console.log(`${r.level}  ${r.name}  (${r.list.length})`);
  for (const h of r.list.slice(0, 6)) console.log(`      ${h.f ? rel(h.f) + ':' + h.line + '  ' : ''}${h.text}`);
  if (r.list.length > 6) console.log(`      … ${r.list.length - 6} more`);
  console.log(`      → ${r.advice}\n`);
}
const passed = results.filter(r => r.level === 'PASS').length;
console.log(`Result: ${fails} FAIL, ${warns} WARN, ${passed} passed.`);
console.log(fails ? 'Fix every FAIL, then fix or justify each WARN.' : warns ? 'No FAILs. Fix or justify each WARN.' : 'Clean. Now review screenshots at 375px and 1440px.');
process.exit(fails ? 1 : 0);
